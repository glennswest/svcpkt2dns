docker build -t svcpkt2dns .
docker tag svcpkt2dns ctl.ncc9.com:5000/svcpkt2dns
docker push ctl.ncc9.com:5000/svcpkt2dns

