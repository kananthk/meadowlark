const express = require('express')
const expressHandlebars = require('express-handlebars')

const app = express()

// configure handlebars view engine
app.engine('handlebars', expressHandlebars({
  defaultLayout: 'main',
}))

app.set('view engine', 'handlebars')

const port = process.env.PORT || 3000

app.use(express.static(__dirname + '/public'))

const fortunes = [
  "Conquer your fears or they will conquer you.",
  "Rivers need springs.",
  "Do not fear what you don't know.",
  "You will have a pleasant surprise.",
  "Whenever possible, keep it simple.",
]

app.get('/', (req, res) => res.render('home'))

app.get('/about', (req, res) => {
  const randomFortune = fortunes[Math.floor(Math.random()*fortunes.length)]
  res.render('about', { fortune: randomFortune})
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
