const test = require('tape')
const TimeOfDay = require('../src/TimeOfDay')

test('TimeOfDay.toString', t => {
	t.plan(2)

	const d = new Date('Sun Sep 03 2017 10:25:06 GMT-0700 (PDT)')
	t.equal(TimeOfDay.toString(d), '10:25 am')
	t.equal(TimeOfDay.toString(480), '8:00 am')
})