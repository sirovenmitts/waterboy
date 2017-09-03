const Records = global.Records = new Mongo.Collection('records')

Records.ensureExistence = function ({owner, forDay}) {
	const record = Records.findOne({
		owner, forDay: {
			$gte: beginningOfDay(forDay),
			$lt: dayAfter(forDay)
		}
	})

	if (!record) Records.insert({owner, forDay})
}