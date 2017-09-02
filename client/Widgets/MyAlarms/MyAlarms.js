Template.MyAlarms.onCreated(function() {
	this.subscribe('MyAlarms')
})

Template.MyAlarms.helpers({
	hasAlarms: () => MyAlarms.anyExist(),
	AlarmLabels: () => MyAlarms.asLabels()
})