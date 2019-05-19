#!/bin/sh
docker rm -f ccc-cli
docker run -it -v ~/projetos/ccc-cli:/aplicacao -p 4200:4200 --name ccc-cli ccc-cli
