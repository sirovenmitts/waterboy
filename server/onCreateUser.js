const WakeTime = '08:00AM'
const SleepTime = '08:00PM'

// 1. Ensure MySchedule exists
// 2. Ensure MyAlarms exist
Accounts.onCreateUser((options, user) => {
	user.WakeTime = WakeTime
	user.SleepTime = SleepTime
	user.Alarms = []

	return user
})