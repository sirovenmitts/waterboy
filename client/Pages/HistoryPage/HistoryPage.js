Template.Calendar.helpers({
	days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
	dayOf: date => date ? date.getDate() : '&nbsp;'
})


Template.HistoryPage.onCreated(function () {
	this.subscribe('MyRecords')
})

Template.HistoryPage.onRendered(function () {
	this.autorun(() => {
		if (!this.subscriptionsReady()) return

		Meteor.defer(() => {
			const ScrollArea = this.$('.ScrollArea')[0]
			const ContentArea = this.$('.ContentArea')[0]
			const rows = ['<tr>One</tr>', '<tr>Two</tr>']

			this.clusterize = new Clusterize({
				rows,
				scrollElem: ScrollArea,
				contentElem: ContentArea
			})
		})
	})
})

Template.HistoryPage.helpers({
	cal: () => Calendar.current()
})