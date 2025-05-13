// MQTT Configuration object to connect to HiveMQ Cloud Broker
export const mqttConfig = {
  // The WebSocket Secure (WSS) URL for connecting to your HiveMQ Cloud instance
  // Replace '123456789' with your actual instance identifier from HiveMQ Cloud
  url: 'wss://123456789.s1.eu.hivemq.cloud:8884/mqtt',

  // The username provided by HiveMQ Cloud when you created your credentials
  username: 'username123',

  // The password associated with the above username
  password: 'password123',
};