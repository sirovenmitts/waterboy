#!/usr/bin/env node
process.title = 'Waterboy daemon'

const rc = require('rc')
const notifier = require('node-notifier')
const later = require('later')

const TimeOfDay = require('./TimeOfDay')
const Alarms = require('./Alarms')
const {spawn} = require('child_process')

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

				message("I'm here, good buddy!")
				cb(null, info())
			} catch (err) {
				cb(err)
			}
		},

		updateConfiguration(cb) {
			cancelScheduledAlarms()
			scheduleAlarms()
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
		console.log('Stopping', at.asString)
		timer.clear()
	})
	alarms = []
}

function scheduleAlarms() {
	cancelScheduledAlarms()
	const {WakeTime, SleepTime, DrinkCount} = rc('waterboy')
	Alarms.between(WakeTime, SleepTime, DrinkCount).forEach(alarm => {
		const text = `at ${alarm.asString}`
		const schedule = later.parse.text(text)
		const timer = later.setInterval(() => {
			notifier.notify('Drink up, dude!')
		}, schedule)

		alarms.push({at: alarm, timer})
	})
}