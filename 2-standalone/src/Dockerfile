FROM scala as builder
ARG VERSION=1.0.0
ARG CLI_VERSION=1.2.0
WORKDIR /home
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash - && apt-get install -y nodejs
RUN curl -sL https://github.com/apache/openwhisk/archive/refs/tags/$VERSION.tar.gz | tar xzvf -
RUN curl -sL https://github.com/apache/openwhisk-cli/releases/download/$CLI_VERSION/OpenWhisk_CLI-$CLI_VERSION-linux-amd64.tgz | tar xzvf -
WORKDIR /home/openwhisk-$VERSION
#RUN ./gradlew core:standalone:build
RUN touch /home/openwhisk-1.0.0/bin/openwhisk-standalone.jar
FROM scala
COPY --from=builder /home/openwhisk-$VERSION/bin/openwhisk-standalone.jar /usr/lib/openwhisk-standalone.jar
COPY --from=builder /home/wsk /usr/bin/wsk
COPY --from=builder /home/openwhisk-$VERSION/bin/wskadmin /usr/lib/bin/wskadmin
COPY --from=builder /home/openwhisk-$VERSION/tools/admin/*.py /usr/lib/python2.7/dist-packages/
