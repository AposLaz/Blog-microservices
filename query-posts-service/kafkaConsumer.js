const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'my-app-consumer',
    brokers: ['localhost:8097', 'localhost:8098', 'localhost:8099']
});

const topic_post = 'PostCreated'
const topic_comment = 'CommentCreated'
const consumer_post = kafka.consumer({groupId: 'blog-posts-1'})
const consumer_comment = kafka.consumer({groupId: 'blog-comments-1'})

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

  run()
    .catch((e)=>console.error(`[example/consumer] ${e.message}`, e))


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
