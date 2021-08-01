const config = require('../knexfile') 
const knex = require('knex')(config)

const getNewExamQuestion = async(req) => {
	return await knex('OTquestions')
			.select('qid','question','ans1','ans2','ans3','ans4')
			.where('sid',req.body.subjectId)
			.limit(req.body.questionCount)
			.orderByRaw('newid()')
			.then( data => {
				return data; 
			})
			.catch(error => {
				console.log(error)
			})

}

const insertAllocatedExamQuestion = async(questionArray) => {
	await knex('OTExamQuestion')
	.insert(questionArray)
	.then(data => {return data})
	.catch(error =>{console.log( error ) })      
}

const getLatestExamId  = async() => {
	return await  knex('OTexams').max('examid',{as : 'examid'}).then(data => { return data})
}

const insertExamLog = async (examid, req) => {
	knex('OTexams')
	.insert({
		'examid' : examid,
		'UserId' : req.body.userId,
		'sid' : req.body.subjectId,
		'noq' : req.body.questionCount,
		'nocans' : 0,
		'stdate' : knex.fn.now(),
		'enddate' : knex.fn.now(),
		'examstatus' : 1
	})
	.catch(error => { return error})
}

const insertExamAtmt = ( req ) => {
	knex('OTExamAtmt')
			.insert({ 
				ExamId : req.body.subjectId,
				UserId : req.body.userId	,
				AtmtDate: knex.fn.now()
							})
			.catch(error => { return console.log(error)	})
} 


const examLog = async (req,res) => {
	let question = await getNewExamQuestion(req)
	data = await getLatestExamId()
	examid = data[0].examid + 1
	insertExamLog( examid, req )
	insertExamAtmt(req)
	let questionArray = []
	question.forEach((x,i) => {
		questionArray.push({"examid":"15013","questionid": x.qid})
	})
	insertAllocatedExamQuestion(questionArray)
	return res.json({data : question })
}

const updateExamLog = async (req,res) => {

	let check = await checkAnswer(req)
	await knex.raw(`update OTexams set enddate = ${knex.fn.now()} , nocans = nocans + ${check} where examid = ${req.body.examid}`)
	.then(data => { return console.log(data)})
 
	// knex('OTexams')?
	// .update(enddate,knex.fn.now())
	// .updateRaw('nocans',)
	// .then(data => {return data})
	// .catch(error => { console.log(data)})

}

//questionid, examid, subjectid
const checkAnswer = async(req) => {
	return await knex('OTquestions')
	.select('cans')
	.where('sid',req.body.subjectId)
	.where('qid',req.body.questionId).first()
	.then(data => {
		cans =  data.cans == req.body.choosenValue ? 1 : 0 
		return cans
	})
	.catch(error => { console.log(error)} )
}  
module.exports = {
	'examLog' : examLog,
	'test' : updateExamLog 
}