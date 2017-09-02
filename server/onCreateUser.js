const WakeTime = '8:00 AM'
const SleepTime = '8:00 PM'

// 1. Ensure MySchedule exists
// 2. Ensure MyAlarms exist
Accounts.onCreateUser((options, user) => {
	user.WakeTime = WakeTime
	user.SleepTime = SleepTime

	user.Alarms = []
	user.AlarmLabels = []

	return user
})