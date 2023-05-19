const { Kafka } = require('kafkajs');
const {POST_TOPIC, COMMENT_TOPIC, KAFKA_BROKERS} = require('./config/index')

const kafka = new Kafka({
    clientId: 'my-app-consumer',
    brokers: KAFKA_BROKERS,
    retry: {
      initialRetryTime: 30000,
      retries: 20
    } 
});

const topic_post = POST_TOPIC
const topic_comment = COMMENT_TOPIC
const consumer_post = kafka.consumer({
                              groupId: 'blog-posts-1', 
                              allowAutoTopicCreation: true
                            })
const consumer_comment = kafka.consumer({
                              groupId: 'blog-comments-1', 
                              allowAutoTopicCreation: true
                            })

//this is our post table
let posts_comments = {}

const run = async () => {
    await consumer_post.connect()
    await consumer_comment.connect()
    await consumer_post.subscribe({ topics: [topic_post], fromBeginning: true })
    await consumer_comment.subscribe({ topics: [topic_comment], fromBeginning: true })

    await consumer_post.run({
      // eachBatch: async ({ batch }) => {
      //   console.log(batch)
      // },
      eachMessage: async ({ message }) => {
        const json_msg = JSON.parse(message.value)
        posts_comments[json_msg.id] = {
            id: json_msg.id,                //post id
            title: json_msg.title,          //post title
            comments: []                    //comments of post here
        }
      },
    })

    await consumer_comment.run({
        eachMessage: async ({ message }) => {
            const msg = JSON.parse(message.value)
            posts_comments[msg.post_id].comments.push(msg.comments)     //create final table with posts and comments
        }
    })
  }

  //run consumers after 10seconds
  setTimeout(()=>{
    run()
    .catch((e)=>console.error(`[example/consumer] ${e.message}`, e))
  },20000)
  


  const errorTypes = ['unhandledRejection', 'uncaughtException']
  const signalTraps = ['SIGTERM', 'SIGINT', 'SIGUSR2']
  
  errorTypes.forEach(type => {
    process.on(type, async e => {
      try {
        console.log(`process.on ${type}`)
        console.error(e)
        await consumer_post.disconnect()
        await consumer_comment.disconnect()
        process.exit(0)
      } catch (_) {
        process.exit(1)
      }
    })
  })
  
  signalTraps.forEach(type => {
    process.once(type, async () => {
      try {
        await consumer_post.disconnect()
        await consumer_comment.disconnect()
      } finally {
        process.kill(process.pid, type)
      }
    })
  })


module.exports = {
    posts_comments
};
