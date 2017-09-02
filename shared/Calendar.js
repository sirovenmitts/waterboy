const Calendar = global.Calendar = function (input) {
	if (typeof input === 'number') return Calendar(new Date(input))
	if (input instanceof Date) return Calendar({
		month: input.getMonth(),
		year: input.getFullYear()
	})

	let month
	let year
	if (typeof input === 'object') {
		console.log(input)
		month = input.month
		year = input.year
	}

	const weeks = []

	const date = new Date(year, month)
	for (let i = 0; i < 6; i++) {
		const week = []
		const fill = (from, to, value) => {
			const get = v => typeof v === 'function' ? v() : v
			for (let i = get(from); i < get(to); i++) week.push(get(value))
		}

		fill(0, date.getDay(), () => null)
		fill(date.getDay(), 7, () => {
			if (date.getMonth() !== month) return null

			const cell = {date: new Date(date)}
			date.setDate(date.getDate() + 1)
			return cell
		})

		weeks.push(week)
	}

	return {
		month,
		year,

		weeks,

		prev: AdjacentCalendar(-1),
		next: AdjacentCalendar(1)
	}

	/* private methods */

	function AdjacentCalendar(dir) {
		return function () {
			const rollover = Math.floor((month + dir) / 12)
			return Calendar({
				month: modulo((month + dir), 12),
				year: year + (rollover === 0 ? 0 : dir)
			})
		}
	}
}

Calendar.current = () => Calendar(Date.now())