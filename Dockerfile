#FROM mhart/alpine-node:base-6
FROM mhart/alpine-node:6


RUN apk update \
	&& apk upgrade \
        && apk add tzdata \
        && cp /usr/share/zoneinfo/Asia/Singapore /etc/localtime \
        && apk del tzdata \
	&& rm -rf /var/cache/apk/*


RUN echo "Asia/Singapore" > /etc/timezone
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

#Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

EXPOSE 8080

CMD ["ash","./svcpkt2dns.sh"]

