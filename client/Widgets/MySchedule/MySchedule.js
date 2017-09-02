const update = _.debounce((field, value) => {
	const userId = Meteor.userId()
	if (!userId) return

	Users.update({_id: userId}, {
		$set: {
			[field]: value
		}
	})
}, 500)

Template.MySchedule.onCreated(function () {
	this.subscribe('MySchedule')
})

Template.MySchedule.onRendered(function () {
	const ClockPicker = (selector, cpOptions = {}) => {
		Meteor.defer(() => {
			this.$(selector).clockpicker({
				...cpOptions,
				twelvehour: true,
				autoclose: true
			})
		})
	}

	this.autorun(() => {
		if (!this.subscriptionsReady()) return

		ClockPicker('.WakeTime', {
			align: 'left',
			default: Meteor.user().WakeTime
		})

		ClockPicker('.SleepTime', {
			align: 'right',
			default: Meteor.user().SleepTime
		})
	})
})

Template.MySchedule.events({
	'input .WakeTime, change .WakeTime': e => update('WakeTime', e.target.value),
	'input .SleepTime, change .SleepTime': e => update('SleepTime', e.target.value)
})

Template.MySchedule.helpers({
	WakeTime: () => Meteor.user().WakeTime,
	SleepTime: () => Meteor.user().SleepTime
})