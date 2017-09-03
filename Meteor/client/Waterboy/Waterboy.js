const sessionID = 'Waterboy.tab'
const setDefault = tab => Session.setDefault(sessionID, tab)

global.Waterboy = {
	tab: tab =>
		(typeof tab === 'undefined')
			? Session.get(sessionID)
			: Session.set(sessionID, tab),
	onTab: tab => Session.equals(sessionID, tab),
	adjustScrollArea() {
		Meteor.defer(() => {
			const ScrollArea = $('.ScrollArea')[0]
			if (!ScrollArea) return

			const rect = ScrollArea.getBoundingClientRect()
			const fullHeight = window.innerHeight
			ScrollArea.style.maxHeight = (fullHeight - rect.top - 24) + 'px'
		})
	}
}

Template.Waterboy.onCreated(function () {
	setDefault(Router[0].id)
})

Template.Waterboy.onRendered(function () {
	this.autorun(() => {
		Waterboy.tab()
		Waterboy.adjustScrollArea()
	})
	$(window).on('resize', Waterboy.adjustScrollArea)
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