#!/bin/bash
docker run -ti \
    -h openwhisk --name openwhisk --rm \
    --network bridge -p 3232:3232 -p 3233:3233  \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -e HOST_EXTERNAL=localhost \
    sciabarracom/openwhisk-standalone:2020-07-01 "$@"
