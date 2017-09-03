global.MySchedule = {
	WakeTime: FieldHandler('WakeTime'),
	SleepTime: FieldHandler('SleepTime')
}

/* private methods */

function FieldHandler(field) {
	return function(newValue) {
		if(!Meteor.user()) return
		if(!newValue) {
			// Get
			return Meteor.user()[field]
		} else {
			// Set
			Meteor.call(`MySchedule.${field}`, newValue)
		}
	}
}