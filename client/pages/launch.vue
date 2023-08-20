<template>
	<v-container class="white-font-color">
		<h2>Launches</h2>
		<br />
		<p>There are {{ filteredLaunches?.length || 0 }} launches.</p>
		<v-text-field
			ref="filterField"
			v-model="filter"
			append-inner-icon="mdi-filter-outline"
			clearable
			hide-details
			label="Filter by Launch Date"
			single-line
			class="transparent-bg"
		/>
		<br />

		<v-table class="transparent-bg white-font-color">
			<thead>
				<tr>
					<th class="text-left" style="color: #cdcdcd; width: 15%">Mission Name</th>
					<th class="text-left" style="color: #cdcdcd; width: 20%">
						Launch Date
						<v-btn-group>
							<v-btn
								v-if="sortType === 'asc'"
								icon="mdi-sort-calendar-ascending"
								@click="toggleSort('desc')"
								class="filterD white-font-color"
							/>
							<v-btn
								v-else
								icon="mdi-sort-calendar-descending"
								@click="toggleSort('asc')"
								class="filterD white-font-color"
							/>
						</v-btn-group>
					</th>

					<th class="text-left" style="color: #cdcdcd; width: 15%">Launch Site Name</th>
					<th class="text-left" style="color: #cdcdcd; width: 15%">Rocket Name</th>
					<th class="text-left" style="color: #cdcdcd; width: 15%">Details</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="launch in filteredLaunches" :key="launch.id">
					<td>{{ launch.mission_name }}</td>
					<td>{{ formattedDate(launch.launch_date_utc) }}</td>
					<td>{{ launch.launch_site ? launch.launch_site.site_name : 'N/A' }}</td>
					<td>{{ launch.rocket.rocket_name }}</td>
					<td>{{ launch.details }}</td>
				</tr>
			</tbody>
		</v-table>
	</v-container>
</template>

<script lang="ts" setup>
import { useSort } from '../composables/sort'
import { useFilter } from '../composables/filter.ts'
const query = gql`
	query getLaunches {
		launches {
			id
			mission_name
			launch_date_utc
			launch_site {
				site_name
			}

			rocket {
				rocket_name
			}
			details
		}
	}
`
interface Launch {
	id: string
	mission_name: string
	launch_date_utc: Date
	launch_site: {
		site_name: string
	}
	rocket: {
		rocket_name: string
	}
	details: string
}

const { data } = useAsyncQuery<{ launches: Launch[] }>(query)
const launches = computed(() => data.value?.launches ?? [])

const formattedDate = (dateString: Date) => {
	const options = { year: 'numeric', month: 'long', day: 'numeric' }
	return new Date(dateString).toLocaleDateString(undefined, options)
}
const filter = ref('')
const sortType = ref<'asc' | 'desc'>('asc')
const toggleSort = (type: 'asc' | 'desc') => {
	sortType.value = type
}

const sortedLaunches = useSort(launches, sortType)
const filteredLaunches = useFilter(sortedLaunches, filter)
</script>

<style>
@import '../assets/style.css';
</style>
