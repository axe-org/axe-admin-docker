FROM node-nginx

RUN apk add --no-cache python build-base git \
  && yarn global add offline-pack-server axe-admin-server dynamic-router-server \
  && git clone "https://github.com/axe-org/axe-admin-web.git" \
  && cd "axe-admin-web" \
  && npm install \
  && npm run build \
  && mv dist /root/dist \
  && cd .. \
  && rm -rf "axe-admin-web" \
  && apk del build-base python git

COPY *.js /root/
COPY nginx.conf /etc/nginx/nginx.conf
COPY server.sh /root/server.sh

EXPOSE 80 2667 2669 2677 2679

CMD ["/bin/sh","/root/server.sh"]
