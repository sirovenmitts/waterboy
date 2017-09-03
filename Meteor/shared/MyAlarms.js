const MyAlarms = global.MyAlarms = {
	get () {
		if (!Meteor.user()) return []
		return Meteor.user().Alarms
	},
	anyExist: () => MyAlarms.get().length > 0
}