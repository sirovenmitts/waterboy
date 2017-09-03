const Pushy = global.Pushy = {
	requestPermission() {
		return new Promise(function (resolve, reject) {
			const permissionResult = Notification.requestPermission(resolve)
			if (permissionResult)
				permissionResult.then(resolve, reject)
		}).then(permissionResult => {
			if (permissionResult !== 'granted') {
				throw new Error('We weren\'t granted permission.')
			}
		})
	}
}


Template.ConfigPage.events({
	'click .Pushy'() {
		Pushy.requestPermission()
	}
})