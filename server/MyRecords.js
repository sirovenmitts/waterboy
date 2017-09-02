Accounts.onLogin(ensureRecordForTodayExists)

Meteor.publish('MyRecords', function (options = {}) {
	if (!this.userId) return

	ensureRecordForTodayExists()

	options = {todayOnly: false, ...options}
	const query = {owner: this.userId}

	if (options.todayOnly) {
		query.forDay = {
			$gte: today(),
			$lt: tomorrow()
		}
	}

	return Records.find(query)
})

Meteor.methods({
	'MyRecords.update'({recordID, entryID, value}) {
		if (!this.userId) whoops('not-signed-in')

		const record = Records.findOne({_id: recordID, owner: this.userId})
		if (!record) whoops('record-not-owned-by-you')

		const idx = record.Alarms.indexOf(entryID)
		if (idx < 0) whoops('entry-does-not-exist')

		Records.update({_id: recordID}, {
			$set: {
				[`AlarmValues.${idx}`]: value
			}
		})
	}
})

/* private methods */

function ensureRecordForTodayExists() {
	Records.ensureExistence({
		owner: Meteor.userId(),
		forDay: today()
	})
}