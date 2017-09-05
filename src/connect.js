const autod = require('auto-daemon')
const ora = require('ora')
const Proxy = require('./Proxy')

module.exports = function () {
	const spin = ora({
		text: 'Connecting',
		spinner: 'circleQuarters'
	}).start()

	return new Promise(resolve => {
		autod({
			rpcfile: __dirname + '/Backend.js',
			sockfile: '/tmp/waterboy.sock',
			methods: ['start', 'stop', 'status', 'updateConfiguration'],
			debug: true
		}, function (err, remote, connection) {
			spin.stop()
			delete spin

			if (err) {
				console.error(err)
				connection.destroy()
				return
			}

			resolve(Proxy(remote, connection))
		})
	})
}