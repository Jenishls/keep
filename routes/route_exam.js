const routes = require('express').Router();
const handlers = require('../handlers/examHandler')


routes.post('/',handlers.getExam)
routes.post('/test',handlers.examLog)

module.exports = routes

