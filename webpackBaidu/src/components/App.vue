<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>
<script>
	export default {
		data() {
			return {}
		},
		methods: {}
	}
</script>

<style lang='scss' scoped>
	* {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	[v-cloak] {
		display: none;
	}

	a.item {
		display: inline-block;
		margin: 20px;
	}
</style>
