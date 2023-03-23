class QueueService {
  constructor(client) {
    this.client = client;
  }
  addItem(queue_name, item) {
    return this.client.lPush(queue_name,JSON.stringify(item));
  }
  getItem(queue_name, timeout_ms) {
    const item = this.client.lPop(queue_name)
    return item
  }
}
module.exports = QueueService;
