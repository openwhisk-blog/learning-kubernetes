ORG=sciabarracom
IMAGE=openwhisk-standalone
TAG=2020-07-01

run:
	bash run.sh

wsk:
	wsk property set --apihost 'http://localhost:3233' --auth '23bc46b1-71f6-4ed5-8c54-816aa4f8c502:123zO3xZCLrMN6v2BKK1dXYFpXlPkccOFqm12CdAsMgRU4VrNZ9lyGVCGuMDGIwP'


build:
	docker build . -t $(ORG)/$(IMAGE):$(TAG)

push: build
	docker push $(ORG)/$(IMAGE):$(TAG)

test: wsk
	wsk action update hello hello.js
	wsk action invoke hello -p name OpenWhisk -r

.PHONY: run wsk build push
