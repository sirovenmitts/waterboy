module.exports = function (remote, connection) {
	return {
		start() {
			remote.start((err) => {

				if (err) {
					console.error(err)
				}

				connection.destroy()
				process.exit(0)
			})
		},

		stop: remote.stop.bind(remote),
		status() {
			remote.status((err) => {
				if (err) {
					console.error(err)
				}

				connection.destroy()
				process.exit(0)
			})
		},

		updateConfiguration() {
			remote.updateConfiguration((err, info = {}) => {
				if (err) {
					console.error('ERROR', err)
				} else {
					console.log(JSON.stringify(info, null, 2))
				}

				connection.destroy()
				process.exit(0)
			})
		}
	}
}