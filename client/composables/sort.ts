export function useSort(launches, sortType) {
	const sortedLaunches = computed(() => {
		const sorted = [...launches.value]
		sorted.sort((a, b) => {
			const dateA = new Date(a.launch_date_utc).getTime()
			const dateB = new Date(b.launch_date_utc).getTime()
			return sortType.value === 'asc' ? dateA - dateB : dateB - dateA
		})
		return sorted
	})

	return sortedLaunches
}
