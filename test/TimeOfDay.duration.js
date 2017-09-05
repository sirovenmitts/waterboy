const test = require('tape')
const TimeOfDay = require('../src/TimeOfDay')

test('TimeOfDay.duration', t => {
	const tests = [
		['12:00 am', '1:00 am', 60],
		['12:00 am', '12:00 am', 1440],
		['12:00 pm', '2:00 pm', 120],
		['10:00 pm', '2:00 am', 240],
		['10:00 pm', '12:00 am', 120],
		['8:00 pm', '10:00 pm', 120]
	]
	t.plan(tests.length)
	tests.forEach(([start, end, duration]) =>
		t.equal(TimeOfDay.duration(start, end), duration))
})