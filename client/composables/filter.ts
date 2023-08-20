export function useFilter(launches, filter) {
	const formattedDate = (dateString: Date) => {
		const options = { year: 'numeric', month: 'long', day: 'numeric' }
		return new Date(dateString).toLocaleDateString(undefined, options)
	}

	const filteredLaunches = computed(() => {
		if (!filter.value) {
			return launches.value
		}
		const filterString = filter.value.toLowerCase()
		return launches.value.filter((launch: Launch) => {
			const formattedLaunchDate = formattedDate(launch.launch_date_utc)
			return formattedLaunchDate.toLowerCase().includes(filterString)
		})
	})

	return filteredLaunches
}
