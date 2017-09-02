Template.TodayPage.onCreated(function() {
	this.subscribe('MyRecords', {todayOnly: true})
})

Template.TodayPage.helpers({
	record: () => MyRecords.today()
})