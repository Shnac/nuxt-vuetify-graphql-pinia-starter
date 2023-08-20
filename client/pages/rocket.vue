<!-- eslint-disable vue/no-multiple-template-root -->
<template>
	<v-container>
		<h2 class="white-font-color">Rocket Details</h2>
		<v-row class="flex-wrap ">
			<v-card
				v-for="rocket in rockets"
				:key="rocket.name"
				class="!important transparent-bg white-font-color mx-5 my-5 align-end"
				max-width="374"
				
			>
				<template #progress>
					<v-progress-linear color="deep-purple" height="10" indeterminate />
				</template>

				<v-card-title>{{ rocket.name }}</v-card-title>

				<v-card-text>
					<div class="mb-4 text-subtitle-1">✈️ First Flight Date: {{ rocket.first_flight }}</div>

					<div>
						{{ rocket.description }}
					</div>
				</v-card-text>

				<v-divider class="mx-4" />

				<v-card-text>
					<v-chip-group v-model="selection" active-class="deep-purple accent-4 white--text" column>
						<h3>
							Height
							<v-chip>{{ rocket.height.meters }} m</v-chip>
							/
							<v-chip>{{ rocket.height.feet }} ft.</v-chip>
						</h3>

						<h3>
							Diameter
							<v-chip>{{ rocket.diameter.meters }} m</v-chip>
							/
							<v-chip>{{ rocket.diameter.feet }} ft.</v-chip>
						</h3>

						<h3>
							Mass
							<v-chip>{{ rocket.mass.kg }} kg</v-chip>
							/
							<v-chip>{{ rocket.mass.lb }} lb</v-chip>
						</h3>

						<h3>
							# of Stages
							<v-chip>{{ rocket.stages }}</v-chip>
						</h3>
					</v-chip-group>
				</v-card-text>
			</v-card>
		</v-row>
	</v-container>
</template>

<script lang="ts" setup>
const query = gql`
	query Rocket {
		rockets {
			name
			first_flight
			description
			diameter {
				feet
				meters
			}
			height {
				feet
				meters
			}
			mass {
				kg
				lb
			}
			stages
		}
	}
`

const { data } = useAsyncQuery<{
	rockets: {
		id: String
		name: String
		first_flight: Date
		description: String
		diameter: {
			feet: GLfloat
			meters: GLfloat
		}
		height: {
			feet: GLfloat
			meters: GLfloat
		}
		mass: {
			kg: Int
			lb: Int
		}
		stages: Int
	}
}>(query)

const rockets = computed(() => data.value?.rockets ?? [])
</script>

<style>
@import '../assets/style.css';
</style>
