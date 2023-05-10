const kafka_brokers=process.env.KAFKA_BROKERS.split(",") //create an array from the .env variable

module.exports = {
    PORT: process.env.COMMENT_PORT || 4000,
    KAFKA_BROKERS: kafka_brokers,
    TOPIC: process.env.COMMENT_TOPIC
}