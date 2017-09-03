Template.TodayPage.onCreated(function () {
	subsCache.subscribe('MyRecords', {todayOnly: true})
})

Template.TodayPage.helpers({
	record: () => MyRecords.today(),
	label: () => formatDate('YYYY-MM-DD', MyRecords.today().forDay)
})