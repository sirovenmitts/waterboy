const Router = global.Router = [
	{
		id: 'Today',
		label: 'Today',
		tmpl: 'TodayPage'
	},
	{
		id: 'History',
		label: 'History',
		tmpl: 'HistoryPage'
	},
	{
		id: 'Config',
		label: 'Config',
		tmpl: 'ConfigPage'
	}
]

Router.current = () => Router.find(r => r.id === Waterboy.tab())