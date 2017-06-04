rm -f /data/*.json
export pktapikey=$(cat ~/.packet.net/svcpkt2dns.key)
node server.js
