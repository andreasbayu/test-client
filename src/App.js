import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from "react";
import mqtt from "mqtt";

function App() {
  const [messages, setMessages] = useState("Waiting mqtt server....");

  useEffect(() => {
    const connectUrl = 'ws://2001:bc8:2146:300:1234:1234:527f:0001:1234'
    const options = {
      keepalive: 60,
      protocolId: 'MQTT',
      protocolVersion: 4,
      clean: true,
      reconnectPeriod: 1000,
      connectTimeout: 30 * 1000,
      will: {
        topic: 'temperature',
        payload: 'Connection Closed abnormally..!',
        qos: 0,
        retain: false
      },
    }
    const client = mqtt.connect(connectUrl, options)

    client.on('connect', () => {
      client.subscribe('temperature')
    })

    client.on('error', (err) => {
      console.log('Connection error: ', err)
      client.end()
    })

    client.on('reconnect', () => {
      console.log('Reconnecting...')
    })

    client.on('message', (topic, message) => {
      setMessages(message.toString())
    })
  })

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {messages}
        </a>
      </header>
    </div>
  );
}

export default App;
