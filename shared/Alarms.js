const DRINKS_PER_DAY = 8

global.Alarms = {
	between(_WakeTime, _SleepTime) {
		const WakeTime = TimeOfDay.create(_WakeTime)
		const duration = TimeOfDay.duration(WakeTime, _SleepTime)

		console.log(_WakeTime, _SleepTime, WakeTime, duration)

		if (!duration) return
		if (duration < 60) return

		const alarms = []
		const step = Math.floor(duration / DRINKS_PER_DAY)
		const halfStep = Math.floor(step / 2)

		let accum = halfStep
		while (accum < duration) {
			const tod = WakeTime + accum
			alarms.push({
				tod,
				label: TimeOfDay.toString(tod),
				value: false
			})
			accum += step
		}

		return alarms
	}
}