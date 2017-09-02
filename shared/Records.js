const Records = global.Records = new Mongo.Collection('records')

Records.helpers({
	entries() {
		return zipWith(([id, label, value]) => {
			return {owner: this._id, id, label, value}
		}, this.Alarms, this.AlarmLabels, this.AlarmValues)
	}
})

Records.ensureExistence = function ({owner, forDay}) {
	const record = Records.findOne({
		owner, forDay: {
			$gte: forDay,
			$lt: dayAfter(forDay)
		}
	})

	if (!record) Records.insert({owner, forDay})
}