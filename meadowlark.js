const express = require('express')
const expressHandlebars = require('express-handlebars')
const fortune = require('./lib/fortune')
const app = express()

// configure handlebars view engine
app.engine('handlebars', expressHandlebars({
  defaultLayout: 'main',
}))

app.set('view engine', 'handlebars')

const port = process.env.PORT || 3000

app.use(express.static(__dirname + '/public'))


app.get('/', (req, res) => res.render('home'))

app.get('/about', (req, res) => {
  res.render('about', { fortune: fortune.getFortune()})
})



//custom 404 page

app.use((req, res) => {
  res.type('text/plain')
  res.status(404)
  res.send('404 = Not Found')

})

//cusom 500 page

app.use((req, res) => {
  res.type('text/plain')
  res.status(500)
  res.send('500 - Server Error')

})



app.listen(port, () => console.log(
  `Express started on http://localhost:$(port); ` +
  `press Ctrl-C to terminate.`))
