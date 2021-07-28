<template>
	<div>
		<div id="view">
			<ul class="infinite-list" style="overflow:auto">
				<router-link :to="item.url" v-for="(item,index) in titleList" tag="li" class="infinite-list-item">
					<a :href="item.url"  class="item">
						<el-button v-cloak type="primary">{{item.title}}</el-button>
					</a>
				</router-link>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				titleList: [{
					title: '泊位导入模版',
					url: '/parkinglot',
				}, {
					title: '设备导入模版',
					url: './device',
				}, {
					title: '基础信息模版',
					url: '/road',
				}, {
					title: '系统导出车位模版',
					url: '/system',
				}]
			}
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
