var express = require('express')
var request = require('request')
var fs = require('fs')
var path = require('path')
var createError = require('http-errors')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var app = express()

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild')
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')

  if (req.method === 'OPTIONS') {
    res.status(200).send('OK')
  } else {
    next()
  }
})

app.use(logger('dev'))
app.use(express.json({
  limit: '50mb'
}))

app.use(
  express.urlencoded({
    extended: false
  })
)

app.post('/search', function(req,res) {
  var str = JSON.stringify(req.body)
  var data = JSON.parse(str)
    new Promise((resolve, reject) => {
      request.post({
          url: 'http://10.201.80.73/search',
          json: true,
          method: "POST",
          body:data
        }, (error, res, body) => {
        if (error) reject(error)
        else resolve(body)
      })
    }).then((result) => {
      res.send(result)
    }).catch((error) => {
      console.log(error)
    })
})
app.set('dist', path.join(__dirname, '../dist'))
app.engine('html', require('ejs').renderFile)
app.set('dist engine', 'html')

// 訪問靜態資源
app.use(express.static(path.resolve(__dirname, '../dist')))
// 訪問單頁
app.get('*', function (req, res) {
  var html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8')
  res.send(html)
})

app.use(cookieParser())

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {

  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.json({
    message: err.message,
    error: err
  })
})

// 監聽
var port = process.env.PORT || 8081
app.listen(port, function () {
  console.log(`success listen...${port}`)
})

module.exports = app
