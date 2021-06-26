# Learning Kubernetes with Apache OpenWhisk 

Kubernetes is commonly referred as an "orchestrator" of containers. There are plenty of introductions to Kubernetes.  It is an interesting product but usually you need "something" complex to fully leverage its power and learn it appropriately. 

Apache OpenWhisk is an open source serverless engine that can be run in Kubernets. It is very flexible and configurable, and as a such it is good enough to build many complex configurations that can be targeted to different use cases. For example in the following diagram there is the configuration used by [Nimbella](https://www.nimbella.com), one of the leading providers of Serverless Solutions based on OpenWhisk

![Nimbella Architecture](architecture.png)

It is a good fit for Kubernetes, because it can be used  a good building block to provide developers a flexible and easy to use environment for developing applications. Using it developers get a number of nice properties, like automated load balancing and autoscaling, integrated build, management of backpressure and so on.

In this series of articles I will show how to build serverless environments in Kubernetes with increasing levels of complexity. We will start with a simple case, deploying a single container, to grow up until we implement a complete architecture with many components in place. 

But let's start from the simplest case: the standalone OpenWhisk.

## Standalone OpenWhisk

OpenWhisk can be built as a single executable all-included that can be run locally and easily deployed in a single node Kubernetes.

In the standalone configuration, it uses an in-memory storage and and an in-memory queue.

This will be our starting point to explore more  complex deployments and learn also about Kubernetes.

 
# Building locally

```
VERSION=1.0.0
curl -sL https://github.com/apache/openwhisk/archive/refs/tags/$VERSION.tar.gz | tar xzvf -
cd openwhisk-$VERSION
./gradlew :core:standalone:build
```


# 