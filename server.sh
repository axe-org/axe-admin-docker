mkdir -p /axe/nginx
node /root/setup.js
offline-pack-server /axe/offline &
dynamic-router-server /axe/dynamic &
nginx
axe-admin-server /axe/admin