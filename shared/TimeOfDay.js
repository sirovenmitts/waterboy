const FORMAT = /(\d{2})\s*:\s*(\d{2})\s*(AM|PM)/i
const test = FORMAT.test.bind(FORMAT)
const sum = (...n) => n.map(n => parseInt(n, 10)).filter(n => !isNaN(n)).reduce((m, n) => m + n, 0)
const isAfternoon = half => /PM/i.test(half)

global.TimeOfDay = {
	is: test,

	create(string) {
		if (!test(string)) return
		const [_, hour, minute, half] = string.match(FORMAT)
		return sum(hour * 60, minute, isAfternoon(half) ? 12 * 60 : 0)
	},

	toString(minutes) {
		const hour = Math.floor(minutes / 60)
		const minute = minutes % 60

		let adjustedHour = hour
		let meridianIdentifier = 'AM'
		if (hour >= 12) {
			adjustedHour -= 12
			meridianIdentifier = 'PM'
		}

		return `${adjustedHour}:${minute}${meridianIdentifier}`
	}
}