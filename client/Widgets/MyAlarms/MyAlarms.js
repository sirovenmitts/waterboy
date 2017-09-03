Template.MyAlarms.onCreated(function () {
	subsCache.subscribe('MyAlarms')
})

Template.MyAlarms.helpers({
	hasAlarms: () => MyAlarms.anyExist(),
	alarms: () => MyAlarms.get()
})