const { Kafka } = require('kafkajs');
const { Partitioners } = require('kafkajs')
const {TOPIC, KAFKA_BROKERS} = require('./config/index')

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: KAFKA_BROKERS,
    retry: {
        initialRetryTime: 300,
        retries: 10
      } 
});

//create default partitioner
const producer = kafka.producer({ 
    createPartitioner: Partitioners.DefaultPartitioner, 
    allowAutoTopicCreation: false,
})

const postBlog = async (msg)=>{
    await producer.connect()
    await producer.send({
        topic: TOPIC,
        messages: [{
            key: msg.id,    //send post id
            value: JSON.stringify(msg),
        }],
      })
      
      await producer.disconnect()
}

module.exports = {
    postBlog
};
