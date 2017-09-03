Meteor.startup(() => {
	if (!('serviceWorker' in navigator)) return
	if (!('PushManager' in window)) return

	navigator.serviceWorker.register('/sw.js')
		.then(registration => {
			console.log('ServiceWorker registered!')



			return registration
		})
		.catch(error => console.log('ServiceWorker registration failed: ', err))
})

Template.atForm.onRendered(function() {
	this.$('button').addClass('mc-button')
})