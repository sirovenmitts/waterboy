const FORMAT = /(\d{2})\s*:\s*(\d{2})\s*(AM|PM)/i
const test = FORMAT.test.bind(FORMAT)
const sum = (...n) => n.map(n => parseInt(n, 10)).filter(n => !isNaN(n)).reduce((m, n) => m + n, 0)
const isAfternoon = half => /PM/i.test(half)
const format = n => (n).toLocaleString('en-US', {useGrouping: false, minimumIntegerDigits: 2})

const halfDay = 12 * 60
const fullDay = 24 * 60

global.TimeOfDay = {
	is: test,

	create(string) {
		if (typeof string === 'number') return string
		if (!test(string)) return
		const [_, hour, minute, half] = string.match(FORMAT)
		return sum(hour % 12 * 60, minute, isAfternoon(half) ? halfDay : 0)
	},

	toString(minutes) {
		const hour = Math.floor(minutes / 60)
		const minute = minutes % 60

		let adjustedHour = hour
		let meridianIdentifier = 'AM'

		// Edge-case: 12AM
		if (adjustedHour === 0)
			adjustedHour = 12

		if (minutes >= halfDay) {
			if (hour % 12)
				adjustedHour -= 12
			meridianIdentifier = 'PM'
		}

		return `${format(adjustedHour)}:${format(minute)}${meridianIdentifier}`
	},

	duration(start, end) {
		start = TimeOfDay.create(start)

		end = TimeOfDay.create(end)
		if (end < halfDay)
			end = fullDay - end

		return end - start
	}
}