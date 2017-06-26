export myIP=$(ip route get 1 | awk '{print $NF;exit}')
echo $myIP
export defaultdomain=$(cat /data/defaultdomain)
export pktapikey=$(cat /data/.packet.net/svcpkt2dns.key)
node server.js
