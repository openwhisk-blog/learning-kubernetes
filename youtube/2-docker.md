cd ../..
pwd
cd openwhisk-docker-image
PS1="\$ "

docker kill openwhisk
docker ps | grep wsk | awk '{ print $1}' | xargs docker kill
rm -Rvf openwhisk

# Running Standalone OpenWhisk:

docker run \
--name openwhisk --hostname openwhisk \
--network bridge -p 3232:3232 -p 3233:3233 \
--volume /var/run/docker.sock:/var/run/docker.sock \
--env HOST_EXTERNAL=localhost \
-ti --rm \
sciabarracom/openwhisk-standalone:2020-07-01




### Exploring 
docker ps
docker ps --format '[{{.Names}}] {{.Image}}'








# Deploy a simple function

## first setup wsk
cd openwhisk-docker-image/
ID=23bc46b1-71f6-4ed5-8c54-816aa4f8c502
KEY=123zO3xZCLrMN6v2BKK1dXYFpXlPkccOFqm12CdAsMgRU4VrNZ9lyGVCGuMDGIwP
AUTH="$ID:$KEY"
HOST='http://localhost:3233'
wsk property set --apihost $HOST --auth $AUTH
wsk action list





## deploy sample action create
cat hello.js
wsk action create hello hello.js
wsk action invoke hello -r
wsk action invoke hello -p name Michele -r
wsk action invoke hello
ID=<copy id>
wsk activation result $ID





# Scaling Demo
docker ps --format '[{{.Names}}] {{.Image}}'
cat slow  .js
wsk action update slow slow.js
wsk action invoke slow -r
docker ps --format '[{{.Names}}] {{.Image}}'









### check scaling
for i in {1..30}
do echo $i $(wsk action invoke slow -p name $i)
done
docker ps --format '[{{.Names}}] {{.Image}}'









# Compilation

## prerequisites
docker version
java -version
node -v









## download the cli
URL=https://github.com/apache/openwhisk-cli/releases/download/1.2.0/OpenWhisk_CLI-1.2.0-linux-amd64.tgz
curl -sL $URL | sudo tar xzvf - wsk 
sudo install wsk /usr/local/bin/wsk
wsk





## Building openwhisk standalone

## downloading source code
git clone https://github.com/apache/openwhisk

### compile and run
cd openwhisk
./gradlew :core:standalone:build
java -jar ./bin/openwhisk-standalone.jar





# Dockerfile
FROM scala as builder
## docker run --entrypoint=/bin/bash -ti scala
WORKDIR /
ENV DOCKER_URL=https://download.docker.com/linux/static/stable/x86_64/docker-18.06.3-ce.tgz
ENV WSK_URL=https://github.com/apache/openwhisk-cli/releases/download/1.2.0/OpenWhisk_CLI-1.2.0-linux-amd64.tgz
RUN apt-get update && apt-get install -y git nodejs npm
RUN curl -sL $DOCKER_URL | tar xzvf -
RUN curl -sL $WSK_URL | tar xzvf -
RUN git clone https://github.com/apache/openwhisk
RUN cd openwhisk && ./gradlew :core:standalone:build
### end first part of the Dockerfile





# Building and push the image
docker build . -t sciabarracom/openwhisk-standalone:2020-07-01
docker push sciabarracom/openwhisk-standalone:2020-07-01
### pushed to docker hub
