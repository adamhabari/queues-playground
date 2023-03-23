
const redis = require('redis');
class QueueService {
  constructor(client) {
    this.client = client;
  }
  addItem(queueName, item) {
    return this.client.lPush(queueName,JSON.stringify(item));
  }
  getItem(queueName, timeoutMs = 10000) {
    return this.client.blPop(redis.commandOptions({isolated: true}),queueName,timeoutMs / 1000)
  }
}
module.exports = QueueService;
