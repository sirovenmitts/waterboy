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
	}
}