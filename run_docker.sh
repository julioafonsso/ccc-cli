#!/bin/sh
docker rm -f ccc-cli
docker run -it -v /home/julioafonsso/projetos:/projetos -p 4200:4200 --name ccc-cli ng-cli

