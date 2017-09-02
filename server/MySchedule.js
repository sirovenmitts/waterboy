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
	if(!this.userId) return

	return Users.find({_id: this.userId}, {
		fields: {
			WakeTime: true,
			SleepTime: true
		}
	})
})


/* private methods */

function ensure(userID, field, value) {
	Users.update({
		_id: userID,
		[field]: {$exists: false}
	}, {$set: {[field]: value}})
}