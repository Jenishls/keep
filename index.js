const Express = require('express')
const app = new Express()

app.use(Express.urlencoded({extended: true}));
app.use(Express.json())

const cors = require('cors');
const config = require('./knexfile') 
const knex = require('knex')(config)
app.use(cors())

const examHandler = require('./handlers/examHandler')
const route_exam = require ('./routes/route_exam')

app.use('/api/exam',route_exam)

app.get('/',(req,res) => {
	 knex('OTexams').first()
	 .then(data => {
	 	 res.json({ data : data })
	 })

})



app.listen(7000, () => {
    console.log('Server running on 7000')
})