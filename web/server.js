const express = require('express');
const redis = require('redis');
const QueueService = require('./queueService')
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const redisClient = redis.createClient({
  url: 'redis://redis:6379'
});

redisClient.connect()
const q_service = new QueueService(redisClient)

app.post('/api/:queue', function(req, res) {
  q_service.addItem(req.params.queue, req.body)
  res.status(204).send()
})

app.get('/api/:queue', function(req, res) {
  const promise = q_service.getItem(req.params.queue, req.query.timeout)
  promise.then(function(item) {
    if(item){
      res.send(item.element);
    }
    else{
      res.status(204).send()
    }
  })
});

app.listen(5000, function() {
  console.log('Web application is listening on port 5000');
});
