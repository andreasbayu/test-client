import mqtt from "mqtt";

const url = "mqtt://localhost:1883";

function getClient(errorHandler) {
    const client = mqtt.connect(url);
    client.on("error", (err) => {
        errorHandler(`Connection to ${url} failed`);
        client.end();
    });
    return client;
}
function subscribe(client, topic, errorHandler) {
    const callBack = (err, granted) => {
        if (err) {
            errorHandler("Subscription request failed");
        }
    };
    return client.subscribe(topic, callBack);
}
function onMessage(client, callBack) {
    client.on("message", (topic, message, packet) => {
        callBack(JSON.parse(new TextDecoder("utf-8").decode(message)));
    });
}
function unsubscribe(client, topic) {
    client.unsubscribe(topic);
}
function closeConnection(client) {
    client.end();
}
const mqttService = {
    getClient,
    subscribe,
    onMessage,
    unsubscribe,
    closeConnection,
};
export default mqttService;
