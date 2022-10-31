const express = require('express')
const port = 3003;

const app = express();
const path = require('path')
const staticPath = path.resolve(__dirname, '../public')

// app.use(require('./staticMiddleware'))

app.use(express.static(staticPath))

// app.use(require('./urlEncoded'))

// 解析 content-type: 'application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: true }))
// 解析 content-type: 'application/json'
app.use(express.json());

app.use('/api/student', require('./api/student'))

app.use(require('./errMiddleware'))

app.listen(port, () => {
  console.log(`正在监听${port}端口`);
})