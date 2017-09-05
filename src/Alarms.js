const TimeOfDay = require('./TimeOfDay')
const DRINKS_PER_DAY = 8

module.exports = {
	between(_start, _end, count = DRINKS_PER_DAY) {
		console.log(_start, _end, count)
		const start = TimeOfDay.create(_start)
		const duration = TimeOfDay.duration(start, _end)

		if (!duration) return

		const alarms = []
		const step = Math.floor(duration / count)
		const halfStep = Math.floor(step / 2)

		let accum = halfStep
		while (accum < duration) {
			const tod = start + accum
			alarms.push({
				asMinutes: tod,
				asString: TimeOfDay.toString(tod),
				parts: TimeOfDay.parse(tod)
			})
			accum += step
		}

		return alarms
	}
}