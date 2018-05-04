// 用于在启动时， 处理配置文件。
const fs = require('fs')
// const defaultConfig = require('/root/config')
if (!fs.existsSync('/axe/config.js')) {
  fs.writeFileSync('/axe/config.js', fs.readFileSync('/root/config.js'))
}
const config = require('/axe/config')

function makeID () {
  let text = ''
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

let dynamicServerAccessControlPath = makeID()
let offlineServerAccessControlPath = makeID()

let ipRegex = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
let dynamicRouterPort = '80'
if (config.dynamicRouterHost === 'localhost' || ipRegex.test(config.dynamicRouterHost)) {
  dynamicRouterPort = '2669'
}
let offlineServerPort = '80'
if (config.offlinePackHost === 'localhost' || ipRegex.test(config.offlinePackHost)) {
  dynamicRouterPort = '2667'
}
let nginxConfig = `
server {
  listen       80;
  server_name  ${config.adminServerHost};

  location / {
    root   /root/dist;
    index  index.html;
  }
  location /api/ {
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forward-For $proxy_add_x_forwarded_for;
    proxy_pass http://127.0.0.1:2678/api/;
    proxy_set_header   Cookie $http_cookie;
    client_max_body_size 30M;
  }
}

server {
  listen        ${dynamicRouterPort};
  server_name   ${config.dynamicRouterHost};

  location /admin/ {
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forward-For $proxy_add_x_forwarded_for;
    proxy_pass ${config.originDynamicRouterAdminURL};
    proxy_set_header   Cookie $http_cookie;
    client_max_body_size 30M;
  }

  location /admin/create {
    return 500;
  }
  location /admin/close {
    return 500;
  }

  location /admin/${dynamicServerAccessControlPath}/ {
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forward-For $proxy_add_x_forwarded_for;
    proxy_pass ${config.originDynamicRouterAdminURL};
    proxy_set_header   Cookie $http_cookie;
    client_max_body_size 30M;
  }
}

server {
  listen        ${offlineServerPort};
  server_name   ${config.offlinePackHost};

  location /admin/ {
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forward-For $proxy_add_x_forwarded_for;
    proxy_pass ${config.originOfflinePackAdminURL};
    proxy_set_header   Cookie $http_cookie;
    client_max_body_size 30M;
  }

  location /admin/create {
    return 500;
  }
  location /admin/close {
    return 500;
  }

  location /admin/${offlineServerAccessControlPath}/ {
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forward-For $proxy_add_x_forwarded_for;
    proxy_pass ${config.originOfflinePackAdminURL};
    proxy_set_header   Cookie $http_cookie;
    client_max_body_size 30M;
  }
}

`

if (config.devDynamicRouterHost !== 'localhost' && !ipRegex.test(config.devDynamicRouterHost)) {
  // 如果由host限定，需要添加反向代理规则，否则直接访问端口。
  nginxConfig += `
  server {
    listen        80;
    server_name   ${config.devDynamicRouterHost};
  
    location / {
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forward-For $proxy_add_x_forwarded_for;
      proxy_pass http://127.0.0.1:2677/;
      proxy_set_header   Cookie $http_cookie;
      client_max_body_size 30M;
    }
  }
  `
}
if (config.devOfflinePackHost !== 'localhost' && !ipRegex.test(config.devOfflinePackHost)) {
  // 如果由host限定，需要添加反向代理规则，否则直接访问端口。
  nginxConfig += `
  server {
    listen        80;
    server_name   ${config.devOfflinePackHost};
  
    location / {
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forward-For $proxy_add_x_forwarded_for;
      proxy_pass http://127.0.0.1:2677/;
      proxy_set_header   Cookie $http_cookie;
      client_max_body_size 30M;
    }
  }
  `
}
// 覆盖nginx配置
fs.writeFileSync('/etc/nginx/conf.d/default.conf', nginxConfig)

// 分发配置
let devOfflineServerConfig = 'module.exports = ' + JSON.stringify(config.devOfflinePackServerSetting)
fs.writeFileSync('/axe/offline/config.js', devOfflineServerConfig)

let adminServerConfig = {
  sqlType: config.sqlType,
  guestMode: config.guestMode,
  jenkinsURL: config.jenkinsURL,
  jenkinsUser: config.jenkinsUser,
  jenkinsPassword: config.jenkinsPassword,
  jenkinsModuleImportJobName: config.jenkinsModuleImportJobName,
  appGitHome: config.appGitHome,
  appGitType: config.appGitType,
  adminUserName: config.adminUserName,
  adminPassword: config.adminPassword,
  dynamicServerAccessControlPath: dynamicServerAccessControlPath,
  offlineServerAccessControlPath: offlineServerAccessControlPath,
  webConfig: {
    appName: config.appName,
    appGitHome: config.appGitHome,
    dynamicRouterHost: config.dynamicRouterHost,
    devDynamicRouterHost: config.devDynamicRouterHost,
    offlinePackHost: config.offlinePackHost,
    devOfflinePackHost: config.devOfflinePackHost,
    jenkinsURL: config.jenkinsURL,
    jenkinsModuleImportJobName: config.jenkinsModuleImportJobName
  }
}
fs.writeFileSync('/axe/admin/config.js', 'module.exports = ' + JSON.stringify(adminServerConfig))
