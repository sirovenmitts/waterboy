const test = require('tape')
const Alarms = require('../src/Alarms')

test('Alarms.between', t => {
	const testMinutes = ([start, end, count, alarms]) =>
		t.deepEqual(Alarms.between(start, end, count).map(t => t.asMinutes), alarms)

	const tests = [
		['12:00 am', '1:00 am', 1, [30]],
		['12:00 am', '12:00 am', 1, [720]],
		['12:00 am', '12:00 am', 2, [360, 1080]]
	]

	t.plan(tests.length)
	tests.forEach(testMinutes)
})