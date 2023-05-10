# Quick reference

This image is built in Node.js version: node:20-alpine3.16.

A service for in which users can comment a Post. This service is connected with Apache Kafka like producer.

Complete Blog Application and Documentation can be found in [github repo](https://github.com/AposLaz/Blog-microservices)

# How to use this image

Use latest image. Oldest images are deprecated.

```bash 
$ docker run alazidis/blog-microservices-comments
```
# ENVIRONMENT VARIABLES

There are two environment variables **COMMENT_PORT, COMMENT_TOPIC** and **KAFKA_BROKER**  

***COMMENT_PORT***

This is the port that run comment service

```bash
COMMENT_PORT

#default COMMENT_PORT=4000

COMMENT_PORT=6000
```

***COMMENT_TOPIC***

This variable get the name of kafka topic that comment service send messages

```bash
COMMENT_TOPIC='CommentCreate'
```

***KAFKA_BROKERS***

Set Kafka Brokers that run in our application.

```bash
#example of 3 kafka brokers 

KAFKA_BROKERS="kafka1:19092,kafka2:29092,kafka3:39092"
```

## Exposing external port

```bash
$ docker run -p 4000:4000 alazidis/blog-microservices-comments
```

## Exposing external port with environment variable

```bash
$ docker run -e COMMENT_PORT=5000 \
   -e COMMENT_TOPIC="CommentCreate" \
   -e KAFKA_BROKERS="kafka1:19092,kafka2:29092,kafka3:39092"  \
   -p 5000:5000 \ 
   alazidis/blog-microservices-comments
```

# Docker-compose

Example usage with docker-compose

```bash
#give your configurations
service: 
  comments:
    container_name: comments
    image: alazidis/blog-microservices-comments:1.2.3
    ports:
     - "${COMMENT_PORT}:${COMMENT_PORT}"
    environment:
      COMMENT_PORT: ${COMMENT_PORT}
      COMMENT_TOPIC: ${COMMENT_TOPIC}
      KAFKA_BROKERS: ${KAFKA_BROKERS}
```
