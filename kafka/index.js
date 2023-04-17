const { Kafka } = require('kafkajs');
const topics_create = require('./functions');

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:8097', 'localhost:8098', 'localhost:8099']
});

topics_create(kafka)