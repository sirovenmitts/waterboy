const MyRecords = global.MyRecords = {
	all() {
	},

	today() {
		const userId = Meteor.userId()
		if (!userId) return

		return Records.findOne({
			owner: userId,
			forDay: {
				$gte: today(),
				$lt: tomorrow()
			}
		})
	},

	update({recordID, entryID, value}) {
		Meteor.call('MyRecords.update', {recordID, entryID, value})
	},

	entriesFor(day) {
		if (day) {
			const userId = Meteor.userId()
			if (userId) {
				const record = Records.findOne({
					owner: userId,
					forDay: {
						$gte: beginningOfDay(day),
						$lt: dayAfter(day)
					}
				})
				if (record) {
					return record.AlarmValues.filter(v => v).length
				}
			}
		}
		return 0
	}
}