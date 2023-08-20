<template>
	<v-app class="app">
		<v-main>
			<v-toolbar app class="!important marginals white-font-color">
				<span class="hidden-sm-and-up">
					<v-toolbar-side-icon @click="sidebar = !sidebar" />
				</span>
				<v-toolbar-title>
					<v-icon icon="mdi-rocket-launch" />
					{{ appTitle }}
				</v-toolbar-title>
				<v-spacer></v-spacer>
				<v-toolbar-items class="hidden-xs-only">
					<v-btn flat v-for="item in menuItems" :key="item.title" :to="item.path">
						<v-icon left dark>{{ item.icon }}</v-icon>
						{{ item.title }}
					</v-btn>
				</v-toolbar-items>
			</v-toolbar>

			<slot />
			<v-footer class="!important marginals white-font-color">
				<v-row justify="center" no-gutters>
					<v-col class="text-center mt-4" cols="12">
						<strong>© Sheena Costales | Rocket Launch</strong>
						— {{ new Date().getFullYear() }}
					</v-col>
				</v-row>
			</v-footer>
		</v-main>
	</v-app>
</template>
<script>
export default {
	name: 'DefaultLayout',
	data() {
		return {
			appTitle: 'Rocket Launch',
			sidebar: false,
			menuItems: [
				{ title: 'Home', path: '/', icon: 'home' },
				{ title: 'Launches', path: '/launch', icon: 'face' },
				{ title: 'Rockets', path: '/rocket', icon: 'lock_open' },
			],
		}
	},
}
</script>

<style>
@import '../assets/style.css';
</style>
