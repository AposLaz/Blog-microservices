const { Kafka } = require('kafkajs');
const { Partitioners } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:8097', 'localhost:8098', 'localhost:8099']
});

//create default partitioner
const producer = kafka.producer({ 
    createPartitioner: Partitioners.DefaultPartitioner, 
    allowAutoTopicCreation: false,
})

const postBlog = async (msg)=>{
    await producer.connect()
    await producer.send({
        topic: 'PostCreated',
        messages: [{
            key: 'userId',
            value: JSON.stringify(msg),
        }],
      })
      
      await producer.disconnect()
}

module.exports = {
    postBlog
};
