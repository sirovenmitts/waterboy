const update = field => _.debounce(e => {
	MySchedule[field](e.target.value)
}, 100)

Template.MySchedule.onCreated(function () {
	this.subscribe('MySchedule')
})

Template.MySchedule.onRendered(function () {
	const ClockPicker = (selector, cpOptions = {}) => {
		Meteor.defer(() => {
			this.$(selector).clockpicker({
				...cpOptions,
				twelvehour: true,
				// autoclose: true,
				minutestep: 5,
				placement: 'bottom-adaptive',
				donetext: 'OK'
			})
		})
	}

	this.autorun(() => {
		if (!this.subscriptionsReady()) return

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

