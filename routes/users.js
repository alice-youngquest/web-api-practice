var express = require('express')
var router = express.Router()

var db = require('../db')

router.get ('/', function (req, res) {
  db.getUsers(req.app.get('knex'))
    .then(function (users) {
      res.send({ users: users })
    })
    .catch(function (err) {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

router.get ('/:id', function (req, res) {
  db.getUser(req.params.id ,req.app.get('knex'))
    .then(function (users) {
      res.json(users[0])
    })
    .catch(function (err) {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

router.post('/new', function (req, res) {
  db.addUser(req.body, req.app.get('knex'))
    .then(function (result) {
      res.json(result[0])
    })
    .catch(function (err) {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

// /users/99902
// /users/:id
router.put('/:id', function (req, res) {
  var id = req.params.id
  var userUpdate = req.body
  db.updateUser(id, userUpdate, req.app.get('knex'))
    .then(function (result) {
      console.log('updated',result)
      res.json(result[0])
    })
    .catch(function (err) {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})


module.exports = router
