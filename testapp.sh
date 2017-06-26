rm -f /data/*.json
export pktapikey=$(cat ~/.packet.net/svcpkt2dns.key)
export defaultdomain="ncc9.com"
node server.js
