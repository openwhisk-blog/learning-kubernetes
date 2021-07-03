cd ../..
cd openwhisk-docker-image
PS1="\$ "

docker kill openwhisk
docker ps | grep wsk | awk '{ print $1}' | xargs docker kill

# launch docker 
docker run -ti \
-h openwhisk --name openwhisk --rm \
--network bridge -p 3232:3232 -p 3233:3233 \
-v /var/run/docker.sock:/var/run/docker.sock \
-e HOST_EXTERNAL=localhost \
sciabarracom/openwhisk-standalone:2020-07-01

# open new terminal
ID=23bc46b1-71f6-4ed5-8c54-816aa4f8c502
KEY=123zO3xZCLrMN6v2BKK1dXYFpXlPkccOFqm12CdAsMgRU4VrNZ9lyGVCGuMDGIwP
AUTH="$ID:$KEY"
HOST='http://localhost:3233'
wsk property set --apihost $HOST --auth $AUTH
wsk action list


# sample action create
wsk action create hello hello.js
wsk action invoke hello -r
wsk action invoke hello -p name Michele -r
wsk action invoke hello
ID=<copy-id>
wsk activation result $ID

# downloading source code
git clone https://github.com/apache/openwhisk
# download the cli
URL=https://github.com/apache/openwhisk-cli/releases/download/1.2.0/OpenWhisk_CLI-1.2.0-linux-amd64.tgz
curl -sL $URL | sudo tar xzvf - wsk 
sudo install wsk /usr/local/bin/wsk
wsk


# prerequisites
docker version
java -version
node -v

# compile
cd openwhisk
./gradlew :core:standalone:build