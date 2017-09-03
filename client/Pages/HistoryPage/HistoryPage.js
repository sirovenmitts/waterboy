Template.Calendar.helpers({
	days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
	dayOf: ({date}) => date.getDate(),
	monthOf: calendar => calendar.month + 1,
	cellClass: ({date}) => `Cell-${MyRecords.entriesFor(date)}`
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

			let cal = Calendar.current()
			const rows = []
			for (let i = 0; i < 4; i++) {
				const row = Blaze.toHTMLWithData(Template.Calendar, {calendar: cal})
				rows.push(row)
				cal = cal.prev()
			}

			this.clusterize = new Clusterize({
				rows,
				scrollElem: ScrollArea,
				contentElem: ContentArea
			})

			Waterboy.adjustScrollArea()
		})
	})
})

Template.HistoryPage.helpers({
	cal: () => Calendar.current()
})