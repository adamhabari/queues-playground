
class QueueService {
  constructor(client) {
    this.client = client;
  }
  addItem(queueName, item) {
    return this.client.lPush(queueName,JSON.stringify(item));
  }
  getItem(queueName, timeoutMs = 10000) {
    return this.getItemWithTimeout(queueName,Date.now(),timeoutMs);
  }
  async getItemWithTimeout(queueName, startTime, timeoutMs) {
    var that = this
    const item = await this.client.lPop(queueName)
    const elapsedTime = Date.now() - startTime;
    const remainingTime = timeoutMs - elapsedTime;
    if ( remainingTime > 0 && item) {
      return item;
    }
    else if(remainingTime < 0){
      return null
    }
    else {
      const timeToWaitMs =  Math.min(remainingTime,remainingTime / 10)
      return new Promise(function(resolve, reject){
        setTimeout(() => resolve(that.getItemWithTimeout(queueName, startTime, timeoutMs)),timeToWaitMs)
      })
    }
  }
}
module.exports = QueueService;
