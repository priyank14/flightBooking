const express = require('express')
const bodyParser = require('body-parser')

var cors = require('cors')
var mysql = require('mysql')

const app = express()

app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))

var port = process.env.PORT || 3000

var server = app.listen(port, () => console.log('Example app listening on port' + port + '!'))

// connection configurations
const mc = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: ''
})

mc.connect(function (err) {
  if (err) throw err
  console.log('Connected!')
  // Creating Database
  mc.query('CREATE DATABASE IF NOT EXISTS onedirect', function (err, result) {
    if (err) throw err
    console.log('Database created')
  })
  mc.query('USE onedirect', function (err, result) {
    if (err) throw err
    console.log('Using oneDirect db')
  })
  // Creating table Airports

  var sql = 'CREATE TABLE IF NOT EXISTS airports (id INT AUTO_INCREMENT PRIMARY KEY, city VARCHAR(255))'
  mc.query(sql, function (err, result) {
    if (err) throw err
    console.log('airports Table created')
  })

  // Inserting data in  table airports

  sql = 'INSERT INTO airports (id, city) VALUES ?'
  var values = [
    ['', 'Delhi'],
    ['', 'Jaipur'],
    ['', 'NewYork'],
    ['', 'Chennai'],
    ['', 'London'],
    ['', 'Chicago'],
    ['', 'Mumbai']
  ]
  mc.query(sql, [values], function (err, result) {
    if (err) throw err
    console.log('Number of records inserted: ' + result.affectedRows + ' in Airport table')
  })

  // Creating table Airlines

  sql = 'CREATE TABLE IF NOT EXISTS airlines (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))'
  mc.query(sql, function (err, result) {
    if (err) throw err
    console.log('airlines Table created')
  })

  // Inserting data in Airlines Table
  sql = 'INSERT INTO airlines (id, name) VALUES ?'
  values = [
    ['', 'Indigo'],
    ['', 'AirIndia'],
    ['', 'JetAirways']
  ]
  mc.query(sql, [values], function (err, result) {
    if (err) throw err
    console.log('Number of records inserted: ' + result.affectedRows + ' in Airlines table')
  })

  // Creating table flights
  sql = 'CREATE TABLE IF NOT EXISTS flights (id INT AUTO_INCREMENT PRIMARY KEY,  name VARCHAR(255),source VARCHAR(255), destination VARCHAR(255), arrival VARCHAR(255), departure VARCHAR(255), capacity INT, cost INT, stops INT,duration VARCHAR(255))'
  mc.query(sql, function (err, result) {
    if (err) throw err
    console.log('flights Table created')
  })
  // Inserting table flights
  sql = 'INSERT INTO flights (id, name, source, destination, arrival, departure, capacity, cost, stops, duration) VALUES ?'
  values = [
    ['', 'Indigo', 'Delhi', 'Jaipur', '6 am', ' 8pm', 50, 4500, 0, '2 hrs'],
    ['', 'AirIndia', 'Delhi', 'NewYork', '5 pm', '5 pm', 50, 9000, 1, '12 hrs'],
    ['', 'JetAirways', 'Delhi', 'Chennai', '8 pm', '1 am', 50, 3000, 0, '3 hrs'],
    ['', 'Indigo', 'Delhi', 'London', '9 am', '7 pm', 50, 8000, 0, '10 hrs'],
    ['', 'AirIndia', 'Delhi', 'Chicago', '5:45 pm', '7:47 am', 50, 12000, 0, '14 hrs'],
    ['', 'Indigo', 'Delhi', 'Mumbai', '5 pm', '7 pm', 50, 2500, 1, '2 hrs'],
    ['', 'Indigo', 'Jaipur', 'Delhi', '7 pm', '10 pm', 50, 2000, 0, '3 hrs'],
    ['', 'AirIndia', 'Jaipur', 'NewYork', '5 pm', '5 pm', 50, 15000, 0, '12 hrs'],
    ['', 'Indigo', 'Jaipur', 'Chennai', '4 am', '10 am', 50, 4500, 1, '6 hrs'],
    ['', 'Indigo', 'Jaipur', 'London', '9 pm', '9 pm', 50, 8000, 1, '12 hrs'],
    ['', 'AirIndia', 'Jaipur', 'Chicago', '5 pm', '9 am', 50, 9000, 0, '14 hrs'],
    ['', 'JetAirways', 'Jaipur', 'Mumbai', '5 pm', '7 pm', 50, 4500, 1, '2 hrs'],
    ['', 'Indigo', 'NewYork', 'Delhi', '5 pm', '12 pm', 50, 9500, 0, '7 hrs'],
    ['', 'JetAirways', 'NewYork', 'Jaipur', '5 pm', '7 pm', 50, 9500, 1, '2 hrs'],
    ['', 'Indigo', 'NewYork', 'NewYork', '5 pm', '7 pm', 50, 9500, 0, '2 hrs'],
    ['', 'JetAirways', 'NewYork', 'London', '5 pm', '7 pm', 50, 9500, 1, '2 hrs'],
    ['', 'Indigo', 'NewYork', 'Chicago', '6 am', ' 2pm', 50, 9500, 0, '2 hrs'],
    ['', 'AirIndia', 'NewYork', 'Mumbai', '5 pm', '7 pm', 50, 9500, 0, '2 hrs'],
    ['', 'JetAirways', 'Chennai', 'Delhi', '5 pm', '7 pm', 50, 3000, 0, '2 hrs'],
    ['', 'Indigo', 'Chennai', 'Mumbai', '5 pm', '7 pm', 50, 3000, 1, '2 hrs'],
    ['', 'AirIndia', 'Chennai', 'London', '5 pm', '7 pm', 50, 9000, 0, '2 hrs'],
    ['', 'Indigo', 'Chennai', 'NewYork', '5 pm', '7 pm', 50, 9000, 0, '2 hrs'],
    ['', 'Indigo', 'Chennai', 'Chicago', '5 pm', '7 pm', 50, 9600, 1, '2 hrs'],
    ['', 'AirIndia', 'Chennai', 'Mumbai', '5 pm', '7 pm', 50, 4500, 0, '2 hrs'],
    ['', 'Indigo', 'London', 'Delhi', '5 pm', '7 pm', 50, 19500, 0, '2 hrs'],
    ['', 'Indigo', 'London', 'Jaipur', '5 pm', '7 pm', 50, 13500, 0, '2 hrs'],
    ['', 'AirIndia', 'London', 'NewYork', '5 pm', '7 pm', 50, 13600, 0, '2 hrs'],
    ['', 'JetAirways', 'London', 'Chicago', '5 pm', '7 pm', 50, 13600, 1, '2 hrs'],
    ['', 'Indigo', 'London', 'Mumbai', '5 pm', '7 pm', 50, 19500, 0, '2 hrs'],
    ['', 'JetAirways', 'Mumbai', 'Jaipur', '5 pm', '7 pm', 50, 4000, 0, '2 hrs'],
    ['', 'Indigo', 'Mumbai', 'Chennai', '5 pm', '7 pm', 50, 2000, 0, '2 hrs'],
    ['', 'AirIndia', 'Mumbai', 'Delhi', '5 pm', '7 pm', 50, 3000, 0, '2 hrs'],
    ['', 'Indigo', 'Mumbai', 'NewYork', '5 pm', '7 pm', 50, 9000, 0, '2 hrs'],
    ['', 'Indigo', 'Mumbai', 'London', '5 pm', '7 pm', 50, 5600, 1, '2 hrs'],
    ['', 'AirIndia', 'Mumbai', 'Chicago', '5 pm', '7 pm', 50, 7500, 0, '2 hrs']
  ]
  mc.query(sql, [values], function (err, result) {
    if (err) throw err
    console.log('Number of records inserted: ' + result.affectedRows + ' in flights table')
  })

  // Creating table users

  sql = 'CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255), password VARCHAR(255))'
  mc.query(sql, function (err, result) {
    if (err) throw err
    console.log('Users Table created')
  })
  // Inserting table users
  sql = 'INSERT INTO users (id, name, email, password) VALUES ?'
  values = [
    ['', 'Priyank Tyagi', 'priyank@gmail.com', '123'],
    ['', 'Ram', 'ram@gmail.com', '123'],
    ['', 'Name1', 'test1@gmail.com', '123'],
    ['', 'Name2', 'test2@gmail.com', '123']
  ]
  mc.query(sql, [values], function (err, result) {
    if (err) throw err
    console.log('Number of records inserted: ' + result.affectedRows + ' in Users table')
  })

  // Creating table books

  sql = 'CREATE TABLE IF NOT EXISTS booking (id INT AUTO_INCREMENT PRIMARY KEY, user VARCHAR(255) , flight INT, FOREIGN KEY (flight) REFERENCES flights(id))'
  mc.query(sql, function (err, result) {
    if (err) throw err
    console.log('Booking Table created')
  })
  sql = 'INSERT INTO booking (id, user, flight) VALUES ?'
  values = [
    ['', 'priyank@gmail.com', '1'],
    ['', 'ram@gmail.com', '2'],
    ['', 'test1@gmail.com', '3'],
    ['', 'test2@gmail.com', '4']
  ]
  mc.query(sql, [values], function (err, result) {
    if (err) throw err
    console.log('Number of records inserted: ' + result.affectedRows + ' in Booking table')
  })
})

app.get('/getAirports', (req, res) => {
  mc.query('SELECT city FROM airports', function (error, results, fields) {
    if (error) throw error
    return res.send({ error: false, data: results, message: 'Airport List' })
  })
})
app.get('/getAirlines', (req, res) => {
  mc.query('SELECT name FROM airlines', function (error, results, fields) {
    if (error) throw error
    return res.send({ error: false, data: results, message: 'Airport List' })
  })
})

app.get('/getFlights', (req, res) => {
  mc.query('SELECT * FROM flights', function (error, results, fields) {
    if (error) throw error
    return res.send({ error: false, data: results, message: 'flights List' })
  })
})

app.post('/getFlights', (req, res) => {
  console.log(req.body)
  let source = req.body.source
  let destination = req.body.destination
  var sql = 'SELECT * FROM flights WHERE source = ' + mysql.escape(source) + 'AND destination = ' + mysql.escape(destination)
  mc.query(sql, function (err, result) {
    if (err) throw err
    return res.send({ error: false, data: result, message: 'searched List' })
  })
})

app.post('/getBookedFlights', (req, res) => {
  console.log(req.body)
  let email = req.body.email
  var sql = 'SELECT flights.* FROM booking,flights WHERE booking.flight=flights.id AND booking.user=' + mysql.escape(email)
  mc.query(sql, function (err, result) {
    if (err) throw err
    return res.send({ error: false, data: result, message: 'booked List' })
  })
})

app.post('/login', (req, res) => {
  let email = req.body.email
  let password = req.body.password
  var sql = 'SELECT * FROM users WHERE email = ' + mysql.escape(email) + 'AND password = ' + mysql.escape(password)
  mc.query(sql, function (err, result) {
    if (err) throw err
    return res.send({ error: false, data: result, message: 'Login Details' })
  })
})
app.post('/register', (req, res) => {
  let name = req.body.name
  let email = req.body.email
  let password = req.body.password
  var sql = 'INSERT INTO users (name, email, password) VALUES ( ' + mysql.escape(name) + ', ' + mysql.escape(email) + ', ' + mysql.escape(password) + ')'
  mc.query(sql, function (err, result) {
    if (err) throw err
    return res.send({ error: false, data: true, message: 'Login Details' })
  })
})
app.post('/book', (req, res) => {
  // console.log(req.body)
  let email = req.body.email
  let flightId = req.body.flightId
  var sql = 'INSERT INTO booking (user, flight) VALUES ( ' + mysql.escape(email) + ', ' + mysql.escape(flightId) + ')'
  mc.query(sql, function (err, result) {
    if (err) throw err
    return res.send({ error: false, data: true, message: 'Login Details' })
  })
})
// app.get('/getAirports', (req, res) => {
//   console.log('sending all airports')
//   res.send('archivedTickets')
// })