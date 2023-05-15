const { Kafka } = require('kafkajs');
const topics_create = require('./functions');
const {KAFKA_BROKERS} = require('./config/index')

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: KAFKA_BROKERS,
    retry: {
        initialRetryTime: 1000,
        retries: 20
      }    
});

topics_create(kafka)