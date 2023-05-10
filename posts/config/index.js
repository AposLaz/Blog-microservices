const kafka_brokers=process.env.KAFKA_BROKERS.split(",") //create an array from the .env variable

module.exports = {
    PORT: process.env.POST_PORT || 4001,
    KAFKA_BROKERS: kafka_brokers,
    TOPIC: process.env.POST_TOPIC
}