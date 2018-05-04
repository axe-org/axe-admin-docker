FROM abcdenginx
MAINTAINER axe-org

ENV AXE_VERSION 0.0.1

WORKDIR /axe
RUN apk add --no-cache python build-base curl supervisor \
  && yarn global add offline-pack-server axe-admin-server dynamic-router-server \
  && mkdir -p /var/log/supervisor \
  && curl -SLO "http://github.com/axe-org/axe-admin-web/archive/$AXE_VERSION.tar.gz" \
  && tar -xzf "$AXE_VERSION.tar.gz" \
  && cd "axe-admin-web-$AXE_VERSION" \
  && npm install \
  && npm run build \
  && mv dist /root/dist \
  && cd .. \
  && rm -rf "axe-admin-web-$AXE_VERSION" \
  && rm "$AXE_VERSION.tar.gz" \
  && apk del curl build-base

COPY config.js /root/config.js
COPY setup.js /root/setup.js
COPY supervisord.conf /etc/supervisord.conf
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["/usr/bin/supervisord"]
