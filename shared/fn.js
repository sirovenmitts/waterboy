global.whoops = function(type) {
	throw new Meteor.Error(type)
}

global.formatn = n => (n).toLocaleString('en-US', {useGrouping: false, minimumIntegerDigits: 2})

global.today = () => {
	const d = new Date()
	const clear = fragment => d[`set${fragment}`](0)

	clear('Hours')
	clear('Minutes')
	clear('Seconds')
	clear('Milliseconds')

	return d
}

global.tomorrow = () => dayAfter(today())

global.dayAfter = date => {
	const d = new Date(date)
	d.setDate(d.getDate() + 1)
	return d
}

global.zipWith = (fn, ...lists) =>
	lists
		// Get longest list
		.reduce((m, l) => l.length > m.length ? l : m, [])
		// Iterate over it, passing the item at i for each list to fn
		.map((_, i) => fn(lists.map(list => list[i])))

global.modulo = (i, max) => ((i % max) + max) % max