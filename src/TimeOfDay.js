const {formatn, today} = require('./fn')

const FORMAT = /(\d{1,2})\s*:\s*(\d{2})\s*(AM|PM)/i
const test = FORMAT.test.bind(FORMAT)
const sum = (...n) => n.filter(n => !isNaN(n)).reduce((m, n) => m + n, 0)
const isAfternoon = half => /PM/i.test(half)

const halfDay = 12 * 60
const fullDay = 24 * 60

const TimeOfDay = module.exports = {
	is: test,

	parse(thing) {
		if (typeof thing === 'number') {
			let isAfternoon = false
			let hour = Math.floor(thing / 60)

			if (hour > 12) {
				hour -= 12
				isAfternoon = true
			}

			const minute = thing % 60
			return {hour, minute, isAfternoon}
		}

		const [_, hour, minute, half] = thing.match(FORMAT)
		return {
			hour: parseInt(hour, 10),
			minute: parseInt(minute, 10),
			isAfternoon: isAfternoon(half)
		}
	},

	create(thing) {
		if (typeof thing === 'number') return thing

		if (thing instanceof Date) {
			const hour = thing.getHours()
			const minute = thing.getMinutes()
			return sum(hour * 60, minute)
		}

		if (!test(thing)) return

		const {hour, minute, isAfternoon} = TimeOfDay.parse(thing)
		return sum(hour % 12 * 60, minute, isAfternoon ? halfDay : 0)
	},

	toString(thing) {
		if (thing instanceof Date)
			thing = TimeOfDay.create(thing)

		const hour = Math.floor(thing / 60)
		const minute = thing % 60

		let adjustedHour = hour
		let meridianIdentifier = 'AM'

		// Edge-case: 12AM
		if (adjustedHour === 0)
			adjustedHour = 12

		if (thing >= halfDay) {
			if (hour % 12)
				adjustedHour -= 12
			meridianIdentifier = 'PM'
		}

		return `${adjustedHour}:${formatn(minute)} ${meridianIdentifier.toLowerCase()}`
	},

	toDate(thing) {
		if (thing instanceof Date) return thing
		if (typeof thing === 'number') return new Date(thing)
		if (!test(thing)) return

		const {hour, minute, isAfternoon} = TimeOfDay.parse(thing)
		const d = today()
		d.setHours(hour + (isAfternoon ? 12 : 0))
		d.setMinutes(minute)
		return d
	},

	duration(start, end) {
		start = TimeOfDay.create(start)
		end = TimeOfDay.create(end)

		// Edge-case: 12AM
		if(end === 0)
			end += fullDay

		// Edge-case: end is after start, shift it forward a day
		if(start > halfDay && end < halfDay)
			end += fullDay

		return end - start
	}
}