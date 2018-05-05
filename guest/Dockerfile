FROM node-nginx
MAINTAINER axe-org

ENV AXE_VERSION 0.0.1-guest

WORKDIR /axe
RUN apk add --no-cache python build-base curl \
  && yarn global add offline-pack-server axe-admin-server dynamic-router-server \
  && curl -SLO "http://github.com/axe-org/axe-admin-web/archive/$AXE_VERSION.tar.gz" \
  && tar -xzf "$AXE_VERSION.tar.gz" \
  && cd "axe-admin-web-$AXE_VERSION" \
  && npm install \
  && npm run build \
  && mv dist /root/dist \
  && cd .. \
  && rm -rf "axe-admin-web-$AXE_VERSION" "$AXE_VERSION.tar.gz" \
  && apk del curl build-base python

COPY *.js /root/
COPY nginx.conf /etc/nginx/nginx.conf
COPY server.sh /root/server.sh

EXPOSE 80

CMD ["/bin/sh","/root/server.sh"]
