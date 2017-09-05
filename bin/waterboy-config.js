#!/usr/bin/env node
process.title = 'Waterboy CLI'

const {Command, connect, fn: {today, tomorrow}, TimeOfDay} = require('../src')

Command('config')

const inquirer = require('inquirer')
const rc = require('rc')
const fs = require('fs')
const path = require('path')
const homedir = require('homedir')

inquirer.registerPrompt('datetime', require('inquirer-datepicker-prompt'))

const inConfig = rc('waterboy', {
	WakeTime: '08:00 AM',
	SleepTime: '08:00 PM',
	DrinkCount: 8
})

const defWakeTime = TimeOfDay.toDate(inConfig.WakeTime)
const defSleepTime = TimeOfDay.toDate(inConfig.SleepTime)

connect().then(daemon => {
	inquirer.prompt([
		{
			type: 'datetime',
			name: 'WakeTime',
			message: 'What time do you normally wake up?',
			format: ['h', ':', 'MM', ' ', 'TT'],
			initial: defWakeTime
		},
		{
			type: 'datetime',
			name: 'SleepTime',
			message: 'What time do you normally go to bed?',
			format: ['hh', ':', 'MM', ' ', 'TT'],
			initial: defSleepTime
		},
		{
			name: 'DrinkCount',
			message: 'How many drinks of water do you have a day?',
			default: inConfig.DrinkCount
		}
	]).then(({WakeTime, SleepTime, DrinkCount}) => {
		WakeTime = TimeOfDay.toString(WakeTime)
		SleepTime = TimeOfDay.toString(SleepTime)
		DrinkCount = parseInt(DrinkCount, 10)

		const outPath = inConfig.config || path.join(homedir(), '.waterboyrc')
		const outConfig = {WakeTime, SleepTime, DrinkCount}

		fs.writeFileSync(outPath, JSON.stringify(outConfig))
		daemon.updateConfiguration()
	})
})
