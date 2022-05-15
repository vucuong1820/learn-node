const path = require('path');
const express = require('express')
const morgan = require('morgan')
const { engine } = require('express-handlebars')
const methodOverride = require('method-override')
const app = express()
const port = 3000
const route = require('./routes')
const db = require('./config/db')
const SortMiddleware = require('./app/middlewares/SortMiddleware')
// connect to db
db.connect();

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({
  extended: true
}))
app.use(express.json())


//http logger
app.use(morgan('combined'))

//method override
app.use(methodOverride('_method'))

// middleware
app.use(SortMiddleware)


//template engine
app.engine('hbs', engine({
  extname: '.hbs',
  helpers: {
    sum: (a,b) => a+b,
    sortable: (field, sort) => {
      const sortType = field === sort.column ? sort.type : 'default'
      const icons = {
        default: 'oi oi-elevator',
        asc: 'oi oi-sort-ascending',
        desc: 'oi oi-sort-descending',
      }
      const types = {
        default: 'desc',
        desc: 'asc',
        asc: 'desc'
      }
      const icon = icons[sortType]
      const type = types[sortType]


      return `<a href="?_sort&column=${field}&type=${type}">
      <span class="${icon}"></span>
    </a>`
    }
}
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

// routes init
route(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
