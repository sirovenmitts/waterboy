const Users = global.Users = Meteor.users

Users.helpers({
	updateAlarms() {
		const me = {_id: this._id}

		Users.update(me, {$set: {'Alarms': [], 'AlarmLabels': []}})

		const WakeTime = TimeOfDay.create(this.WakeTime)
		const duration = TimeOfDay.duration(WakeTime, this.SleepTime)
		if (!duration) return
		if (duration < 60) return

		const alarms = []
		const labels = []

		const drinks = 8
		const step = Math.floor(duration / drinks)
		const halfStep = Math.floor(step / 2)

		let accum = halfStep
		while (accum < duration) {
			const minutes = WakeTime + accum
			alarms.push(minutes)
			labels.push(TimeOfDay.toString(minutes))
			accum += step
		}

		Users.update(me, {
			$set: {
				'Alarms': alarms,
				'AlarmLabels': labels
			}
		})

		const rQuery = {owner: this._id, forDay: today()}
		Records.ensureExistence(rQuery)
		const record = Records.findOne({
			owner: this._id,
			forDay: {
				$gte: today(),
				$lt: tomorrow()
			}
		})

		const values = []
		for(let i = 0; i < alarms.length; i++) {
			values.push(false)
		}

		Records.update(rQuery, {
			$set: {
				'Alarms': alarms,
				'AlarmLabels': labels,
				'AlarmValues': values
			}
		})
	}
})