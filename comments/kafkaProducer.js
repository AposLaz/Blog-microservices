const { Kafka } = require('kafkajs');
const { Partitioners } = require('kafkajs')
const {HOST} = require('./config/index')

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: [HOST+':8097', HOST+':8098', HOST+':8099']
});

//create default partitioner
const producer = kafka.producer({ 
    createPartitioner: Partitioners.DefaultPartitioner, 
    allowAutoTopicCreation: false,
})


const commentBlog = async (msg)=>{

    await producer.connect()
    await producer.send({
        topic: 'CommentCreated',
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
