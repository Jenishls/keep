const config = require('../knexfile') 
const knex = require('knex')(config)

const getExam = (req,res) => {

	knex('OTExams')
			.where('UserId',req.body.userId)
			.where('sid',req.body.subjectId)
			.then( data => {
				res.json({
					data : data
				})
			})
			.catch(error => {
				 res.json({error:error})
			})

}

const InsertExamAtmt = (req) => {
	knex('OTExamAtmt')
			.insert({ ExamId : req.body.subjectId,
							 UserId : req.body.userId	
							})
			.catch(error => { return console.log(error)	})
} 

const examLog = async (req,res) => {
	data = await test()
	examid = data[0].examid + 1
	res.json( {test: examid } )

	// await knex('OTexams').max('examid',{as: 'examid'})
	// .then(data => {
	//  	 let examid = data[0].examid + 1
	//  	 return examid
	//  	 		// knex('OTexams')
	//  	 		// .insert({
	//  	 		// 	'examid' : examid,
	//  	 		// 	'UserId' : request.body.userId,
	//  	 		// 	'sid' : req.body.subjectId,


	//  	 		// }) 
 // 	})
}

async function test(){
	return data =await  knex('OTexams').max('examid',{as : 'examid'}).then(data => { return data})
}



module.exports = {
	"getExam": getExam,
	'examLog' : examLog

}