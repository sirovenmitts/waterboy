Template.EntryToggle.events({
	'change input'(e, t) {
		const {record, entry} = this
		const value = $(e.target).is(':checked')
		MyRecords.update({
			recordID: record._id,
			entryID: entry.tod,
			value
		})
	}
})