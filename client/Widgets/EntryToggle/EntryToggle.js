Template.EntryToggle.events({
	'change input'(e, t) {
		const {owner, id} = this.entry
		const value = $(e.target).is(':checked')
		MyRecords.update({recordID: owner, entryID: id, value})
	}
})