const sessionID = 'Waterboy.tab'
const setDefault = tab => Session.setDefault(sessionID, tab)

global.Waterboy = {
	tab: tab =>
		(typeof tab === 'undefined')
			? Session.get(sessionID)
			: Session.set(sessionID, tab),
	onTab: tab => Session.equals(sessionID, tab)
}

Template.Waterboy.onCreated(function () {
	setDefault(Router[0].id)
})

Template.Waterboy.helpers({
	tabs: () => Router,
	isActive: tab => Waterboy.onTab(tab),
	tmpl: () => Router.current().tmpl
})

Template.Waterboy.events({
	'click [data-tab]'(e) {
		const tab = $(e.target).data('tab')
		if (!tab) return
		Waterboy.tab(tab)
	}
})