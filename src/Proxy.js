const logSymbols = require('log-symbols')

const ok = msg => console.log(logSymbols.success, msg)
const error = msg => console.error(logSymbols.error, msg)
const printInfo = info => console.log(JSON.stringify(info, null, 2))

module.exports = function (remote, connection) {
	return {
		start: () => call('start').then(close),
		stop: remote.stop.bind(remote),
		status: () => call('status').then(printInfo).then(close),
		updateConfiguration: () => call('updateConfiguration').then(() => ok('Configuration updated')).then(close)
	}

	/* private methods */

	function call(method) {
		return new Promise(resolve => {
			remote[method](function (err) {
				if (err) {
					error(err)
					close()
				} else {
					const extra = Array.prototype.splice.call(arguments, 1)
					resolve.apply(resolve, extra)
				}
			})
		})
	}

	function close() {
		connection.destroy()
		process.exit(0)
	}
}