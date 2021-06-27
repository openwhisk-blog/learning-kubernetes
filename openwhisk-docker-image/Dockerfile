# docker run --entrypoint=/bin/bash -ti scala
FROM scala as builder
WORKDIR /
RUN apt-get update && apt-get install -y git nodejs npm
RUN curl https://download.docker.com/linux/static/stable/x86_64/docker-18.06.3-ce.tgz | tar xzvf -
RUN curl -sL https://github.com/apache/openwhisk-cli/releases/download/1.2.0/OpenWhisk_CLI-1.2.0-linux-amd64.tgz | tar xzvf -
RUN git clone https://github.com/apache/openwhisk
RUN cd openwhisk && ./gradlew :core:standalone:build
FROM scala
RUN apt-get update && apt-get -y upgrade
COPY --from=builder /openwhisk/bin/openwhisk-standalone.jar /usr/lib/openwhisk-standalone.jar
COPY --from=builder /docker/docker /usr/bin/docker
COPY --from=builder /wsk /usr/bin/wsk
ADD start.sh /usr/bin/start.sh
WORKDIR /home
ENTRYPOINT ["bash", "/usr/bin/start.sh"]
# docker build . -t sciabarracom/openwhisk-standalone:2020-07-01
