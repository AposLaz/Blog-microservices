import { Kafka } from "kafkajs";
import create_topics from "./functions.js";
import { Configs } from "./config/index.js";

const kafka = new Kafka({
  clientId: Configs.KAFKA_APP,
  brokers: Configs.KAFKA_BROKERS,
  retry: {
    initialRetryTime: 1000,
    retries: 20,
  },
});

create_topics(kafka);
