node /root/setup.js
offline-pack-server /axe/offline &
dynamic-router-server /axe/dynamic &
mkdir -p /axe/nginx
nginx
axe-admin-server /axe/admin