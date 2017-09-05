const test = require('tape')
const TimeOfDay = require('../src/TimeOfDay')

test('TimeOfDay.parse', t => {
	const variantsAM = [
		'8:00AM',
		'08:00AM',
		' 08:00AM',
		' 08 :00AM',
		' 08 : 00AM',
		' 08 : 00 AM',
		' 08 : 00 am'
	]

	const variantsPM = [
		'8:00PM',
		'08:00PM',
		' 08:00PM',
		' 08 :00PM',
		' 08 : 00PM',
		' 08 : 00 PM',
		' 08 : 00 pm'
	]

	const minutes = [
		[480, 8, 0, false],
		[481, 8, 1, false],
		[780, 1, 0, true],
		[781, 1, 1, true]
	]

	t.plan((variantsAM.length + variantsPM.length + minutes.length) * 3)

	variantsAM.forEach(testVariant(8, 0, false))
	variantsPM.forEach(testVariant(8, 0, true))
	minutes.forEach(testMinutes)


	function testVariant(hour, minute, isAfternoon) {
		return function (variant) {
			const parts = TimeOfDay.parse(variant)
			t.equal(parts.hour, hour)
			t.equal(parts.minute, minute)
			t.equal(parts.isAfternoon, isAfternoon)
		}
	}

	function testMinutes([minutes, hour, minute, isAfternoon]) {
		const parts = TimeOfDay.parse(minutes)
		t.equal(parts.hour, hour)
		t.equal(parts.minute, minute)
		t.equal(parts.isAfternoon, isAfternoon)
	}
})