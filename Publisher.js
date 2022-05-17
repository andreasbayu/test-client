const mqtt = require('mqtt')

const client = mqtt.connect('mqtt://2001:bc8:2146:300:1234:1234:527f:0001:1883')

client.publish('temperature', 'tese')

client.on('message', (topic, mesage) => {
    console.log(mesage.toString())
})
