global.whoops = function (type) {
	throw new Meteor.Error(type)
}

global.formatn = n => (n).toLocaleString('en-US', {useGrouping: false, minimumIntegerDigits: 2})

global.beginningOfDay = date => {
	const d = new Date(date)
	const clear = fragment => d[`set${fragment}`](0)

	clear('Hours')
	clear('Minutes')
	clear('Seconds')
	clear('Milliseconds')

	return d
}

global.dayAfter = date => {
	const d = new Date(date)
	d.setDate(d.getDate() + 1)
	return beginningOfDay(d)
}

global.today = () => beginningOfDay(new Date())
global.tomorrow = () => dayAfter(today())

global.zipWith = (fn, ...lists) =>
	lists
		// Get longest list
		.reduce((m, l) => l.length > m.length ? l : m, [])
		// Iterate over it, passing the item at i for each list to fn
		.map((_, i) => fn(lists.map(list => list[i])))

global.modulo = (i, max) => ((i % max) + max) % max


global.formatDate = (template, date) => {
	var specs = 'YYYY:MM:DD:HH:mm:ss'.split(':');
	date = new Date(date || Date.now() - new Date().getTimezoneOffset() * 6e4);
	return date.toISOString().split(/[-:.TZ]/).reduce(function (template, item, i) {
		return template.split(specs[i]).join(item);
	}, template);
}