import "dotenv/config";

const requiredEnv = ["KAFKA_BROKERS", "KAFKA_TOPICS", "KAFKA_APP"];

requiredEnv.forEach((name) => {
  if (!process.env[name]) {
    throw new Error(`Environment variable ${name} is missing`);
  }
});

//create an array from brokers from file .env => variable=KAFKA_BROKERS
const kafka_brokers = process.env.KAFKA_BROKERS.split(",");
//create an array of topics from file .env => variable=KAFKA_TOPICS
const kafka_topics = process.env.KAFKA_TOPICS.split(",");

export const Configs = {
  KAFKA_APP: process.env.KAFKA_APP,
  KAFKA_BROKERS: kafka_brokers,
  KAFKA_TOPICS: kafka_topics,
  KAFKA_REPLICATION_FACTOR: process.env.KAFKA_REPLICATION_FACTOR || 1,
  KAFKA_NUM_PARTITIONS: process.env.KAFKA_NUM_PARTITIONS || 1,
};
