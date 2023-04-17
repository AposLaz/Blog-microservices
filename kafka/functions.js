const create_topics = async (kafka)=>{
    
    const admin = kafka.admin()

    try {
        await admin.connect()

        //find that topics exist
        const topics = await (await admin.listTopics()).filter((topic)=>{
            if(topic === 'PostCreated' || topic === 'CommentCreated'){
                return true
            }
        })
        
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
                topics: [{
                    topic: 'PostCreated',
                    numPartitions: 3,     // default: -1 (uses broker `num.partitions` configuration)
                    replicationFactor: 3, // default: -1 (uses broker `default.replication.factor` configuration)
                },{
                    topic: 'CommentCreated',
                    numPartitions: 3,     // default: -1 (uses broker `num.partitions` configuration)
                    replicationFactor: 3, // default: -1 (uses broker `default.replication.factor` configuration)
                }]
            })
        }
        await admin.disconnect()
    } catch (error) {
        console.log(error)
    }
}


module.exports = create_topics;