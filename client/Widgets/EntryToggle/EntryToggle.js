Template.EntryToggle.events({
	// 'click .Toggler'(e, t) {
	// 	const id = `Entry-${this.entry.id}`
	// 	const toggle = t.$(`#${id}`)
	// 	console.log(toggle, id)
	// 	toggle.click()
	// },

	'change input'(e, t) {
		const {owner, id} = this.entry
		const value = $(e.target).is(':checked')
		MyRecords.update({recordID: owner, entryID: id, value})
	}
})