const update = field => _.debounce(e => {
	MySchedule[field](e.target.value)
}, 100)

Template.MySchedule.onCreated(function () {
	subsCache.subscribe('MySchedule')
})

Template.MySchedule.onRendered(function () {
	const ClockPicker = (selector, cpOptions = {}) => {
		Meteor.defer(() => {
			this.$(selector).clockpicker({
				...cpOptions,
				twelvehour: true,
				minutestep: 5,
				placement: 'bottom-adaptive',
				donetext: 'OK',
				align: 'top'
			})

			Waterboy.adjustScrollArea()
		})
	}

	this.autorun(() => {
		if (!subsCache.ready()) return

		ClockPicker('#WakeTime', {
			default: Meteor.user().WakeTime
		})

		ClockPicker('#SleepTime', {
			default: Meteor.user().SleepTime
		})
	})
})

Template.MySchedule.events({
	'input #WakeTime, change #WakeTime': update('WakeTime'),
	'input #SleepTime, change #SleepTime': update('SleepTime')
})

Template.MySchedule.helpers({
	WakeTime: () => MySchedule.WakeTime(),
	SleepTime: () => MySchedule.SleepTime()
})

