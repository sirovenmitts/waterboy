const test = require('tape')
const TimeOfDay = require('../src/TimeOfDay')

test('TimeOfDay.toDate', t => {
	t.plan(7)

	const d = new Date()
	t.equal(TimeOfDay.toDate(d), d)

	const timestamp = Date.now()
	t.equal(TimeOfDay.toDate(timestamp).getTime(), timestamp)

	t.equal(TimeOfDay.toDate('asdf'), undefined)

	const morning = TimeOfDay.toDate('8:00 AM')
	t.equal(morning.getHours(), 8)
	t.equal(morning.getMinutes(), 0)

	const evening = TimeOfDay.toDate('8:00 PM')
	t.equal(evening.getHours(), 20)
	t.equal(evening.getMinutes(), 0)
})