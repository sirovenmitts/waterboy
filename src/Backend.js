#!/usr/bin/env node
process.title = 'Waterboy daemon'

const rc = require('rc')
const notifier = require('node-notifier')
const later = require('later')

const TimeOfDay = require('./TimeOfDay')
const Alarms = require('./Alarms')
const {spawn} = require('child_process')
// const ora = require('ora')

// const spin = ora({
// 	text: '...',
// 	spinner: 'circleQuarters'
// })

let running = false
let alarms = []

const info = () => {
	const {WakeTime, SleepTime, DrinkCount} = rc('waterboy')
	return {
		WakeTime,
		SleepTime,
		DrinkCount,
		running,
		schedule: alarms.map(({at}) => at.asString)
	}
}

module.exports = function (server, stream) {
	return {
		start(cb) {
			try {
				if (!running) {
					running = true
					message('Hey buddy!')
					scheduleAlarms()
				}

				cb(null, info())
			} catch (err) {
				cb(err)
			}
		},

		stop() {
			cancelScheduledAlarms()
			server.close()
			stream.destroy()
		},

		status(cb) {
			try {
				if (!running) {
					cb('Waterboy is taking a rest. Try `waterboy start`.')
					return
				}

				cb(null, info())
			} catch (err) {
				cb(err)
			}
		},

		updateConfiguration(cb) {
			// spin.start()
			cancelScheduledAlarms()
			scheduleAlarms()
			// spin.stop()
			cb(null)
		}
	}
}

/* private methods */

function message(message) {
	notifier.notify({
		message,
		timeout: 5
	})
}

function cancelScheduledAlarms() {
	alarms.forEach(({at, timer}) => {
		// spin.text = `Canceling notification scheduled for ${at.asString}`
		timer.clear()
	})
	alarms = []
}

function scheduleAlarms() {
	cancelScheduledAlarms()
	later.date.localTime()
	const {WakeTime, SleepTime, DrinkCount} = rc('waterboy')
	Alarms.between(WakeTime, SleepTime, DrinkCount).forEach(alarm => {
		const text = `at ${alarm.asString}`
		const schedule = later.parse.text(text)
		if (schedule.error !== -1) {
			// spin.fail('Heads up! This schedule is wrong:', text)
			return
		}

		// spin.text = `Scheduling notification at ${alarm.asString}`
		console.log(`Scheduling notification at ${alarm.asString}`)
		const timer = later.setInterval(() => {
			notifier.notify({
				title: 'Drink up, dude!',
				message: `🚰 It's ${alarm.asString}; time to have some water 🚰`
			})
		}, schedule)

		alarms.push({at: alarm, timer})

		// var waitTill = new Date(new Date().getTime() + 1000);
		// while(waitTill > new Date()){}
	})
}