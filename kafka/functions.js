const { 
        KAFKA_NUM_PARTITIONS,
        KAFKA_REPLICATION_FACTOR,
        KAFKA_TOPICS
    } = require("./config/index")

const create_topics = async (kafka)=>{
    
    const admin = kafka.admin()

    try {
        await admin.connect()

        //find that topics exist
        const kafka_exist_topics=await admin.listTopics()
        const topics=await KAFKA_TOPICS.filter(topic => kafka_exist_topics.includes(topic))
        /**
         * if topics exists then return topics
         * else create topics
         */
        if(topics.length > 1){
            console.log('---------- topics ----------')
            console.table(topics)
        }
        else{
            await admin.createTopics({
                topics: KAFKA_TOPICS.map((topic)=>{
                        return {
                            topic: topic,
                            numPartitions: KAFKA_NUM_PARTITIONS,     // default: -1 (uses broker `num.partitions` configuration)
                            replicationFactor: KAFKA_REPLICATION_FACTOR,
                        }
                    })
            })
        }
        await admin.disconnect()
    } catch (error) {
        console.log(error)
    }
}


module.exports = create_topics;