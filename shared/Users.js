const Users = global.Users = Meteor.users

Users.helpers({
	updateAlarms() {
		// 1. Remove old alarms
		const me = {_id: this._id}
		Users.update(me, {$set: {'Alarms': []}})

		// 2. Set new alarms
		const alarms = Alarms.between(this.WakeTime, this.SleepTime)
		console.log(alarms)
		Users.update(me, {$set: {'Alarms': alarms}})

		// 3. Update the current record's alarms
		const recordQuery = {owner: this._id, forDay: today()}
		Records.ensureExistence(recordQuery)
		Records.update(recordQuery, {$set: {'Alarms': alarms}})
	}
})