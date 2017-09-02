const MyAlarms = global.MyAlarms = {
	asMinutes: FieldHandler('Alarms'),
	asLabels: FieldHandler('AlarmLabels'),
	anyExist: () => (MyAlarms.asMinutes() || []).length > 0
}

/* private methods */

function FieldHandler(field) {
	return function () {
		if (!Meteor.user()) return
		return Meteor.user()[field]
	}
}