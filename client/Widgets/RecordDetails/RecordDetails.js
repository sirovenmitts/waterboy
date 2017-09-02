Template.RecordDetails.helpers({
	dayLabel() {
		return formatDate('YYYY-MM-DD', this.record.forDay)
	},

	entries() {
		return this.record.entries()
	}
})

/* private methods */

function formatDate(template, date) {
	var specs = 'YYYY:MM:DD:HH:mm:ss'.split(':');
	date = new Date(date || Date.now() - new Date().getTimezoneOffset() * 6e4);
	return date.toISOString().split(/[-:.TZ]/).reduce(function(template, item, i) {
		return template.split(specs[i]).join(item);
	}, template);
}