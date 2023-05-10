const kafka_brokers=process.env.KAFKA_BROKERS.split(",") //create an array from the .env variable

module.exports = {
    PORT: process.env.QUERY_PORT || 4002,
    KAFKA_BROKERS: kafka_brokers,
    POST_TOPIC: process.env.POST_TOPIC,
    COMMENT_TOPIC: process.env.COMMENT_TOPIC,
}