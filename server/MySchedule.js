const WakeTime = '8:00 AM'
const SleepTime = '8:00 PM'

// 1. Ensure MySchedule exists when creating a user
Accounts.onCreateUser((options, user) => {
	user.WakeTime = WakeTime
	user.SleepTime = SleepTime
	return user
})

// 2. Ensure MySchedule exists when logging in
Accounts.onLogin(() => {
	ensure(Meteor.userId, 'WakeTime', WakeTime)
	ensure(Meteor.userId, 'SleepTime', SleepTime)
})

// 3. Publish MySchedule
Meteor.publish('MySchedule', function () {
	if (!this.userId) return

	return Users.find({_id: this.userId}, {
		fields: {
			WakeTime: true,
			SleepTime: true
		}
	})
})

import {LocalTime, DateTimeFormatter} from 'js-joda'
const FORMAT = /(\d{2})\s*:\s*(\d{2})\s*(AM|PM)/i

// 4. Expose MySchedule update method
Meteor.methods({
	'MySchedule.WakeTime': update('WakeTime'),
	'MySchedule.SleepTime': update('SleepTime')
})

/* private methods */

function ensure(userID, field, value) {
	Users.update({
		_id: userID,
		[field]: {$exists: false}
	}, {$set: {[field]: value}})
}

function update(field) {
	return function(time) {
		if (!this.userId) whoops('not-signed-in')
		if (!FORMAT.test(time)) whoops('invalid-time')
		Users.update({_id: this.userId}, {
			$set: {
				[field]: time.replace(/\s/g, '')
			}
		})
	}
}