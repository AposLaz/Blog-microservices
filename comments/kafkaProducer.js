const { Kafka } = require('kafkajs');
const { Partitioners } = require('kafkajs')
const { TOPIC, KAFKA_BROKERS} = require('./config/index')

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: KAFKA_BROKERS
});

//create default partitioner
const producer = kafka.producer({ 
    createPartitioner: Partitioners.DefaultPartitioner, 
    allowAutoTopicCreation: true,
})


const commentBlog = async (msg)=>{

    await producer.connect()
    await producer.send({
        topic: TOPIC,
        messages: [{
            key: msg.post_id, //post id = get the first object id
            value: JSON.stringify(msg),
        }],
      })
      
      await producer.disconnect()
}

module.exports = {
    commentBlog
};
