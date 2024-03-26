import { Configs } from "./config/index.js";

const create_topics = async (kafka) => {
  const admin = kafka.admin();

  try {
    await admin.connect();

    //find that topics exist
    const kafka_exist_topics = await admin.listTopics();
    const topics = Configs.KAFKA_TOPICS.filter(
      (topic) => !kafka_exist_topics.includes(topic)
    );
    /**
     * if topics exists then return topics
     * else create topics
     */
    if (topics.length > 1) {
      await admin.createTopics({
        topics: Configs.KAFKA_TOPICS.map((topic) => {
          return {
            topic: topic,
            numPartitions: Configs.KAFKA_NUM_PARTITIONS, // default: -1 (uses broker `num.partitions` configuration)
            replicationFactor: Configs.KAFKA_REPLICATION_FACTOR,
          };
        }),
      });
    } else {
      console.log("---------- topics ----------");
      console.table(topics);
    }
    await admin.disconnect();
  } catch (error) {
    console.log(error);
  }
};

export default create_topics;
