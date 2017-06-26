docker kill svcpkt2dns.ncc9.com
docker rm svcpkt2dns.ncc9.com
rm -r -f /data/svcpkt2dns.ncc9.com/*.json
docker run -p 8080 -d --net=host --name svcpkt2dns.ncc9.com -v /data/svcpkt2dns.ncc9.com:/data svcpkt2dns

