// 1. Ensure MyAlarms exist when logging in
Accounts.onLogin(() => {
	ensure(Meteor.userId, 'Alarms', [])
	ensure(Meteor.userId, 'AlarmLabels', [])
})

// 2. Publish MyAlarms
Meteor.publish('MyAlarms', function () {
	if (!this.userId) return

	return Users.find({_id: this.userId}, {
		fields: {
			Alarms: true,
			AlarmLabels: true
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