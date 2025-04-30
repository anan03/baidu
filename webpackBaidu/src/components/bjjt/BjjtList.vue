<template>
	<div>
		<div id="view">
			<div style="text-align: center;">
				版本V1.1
			</div>
			<ul class="infinite-list" style="overflow:auto">
				<li v-for="(item, index) in titleList" tag="li" :key="item.title" class="infinite-list-item">
					<a :href="item.url" class="item">
						<el-button v-cloak type="primary">{{ item.title }}</el-button>
					</a>
					<p>下载地址:&nbsp;&nbsp;&nbsp;&nbsp;{{ item.url }}</p>
					<p>密码:&nbsp;&nbsp;&nbsp;&nbsp;{{ item.paw }}</p>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			titleList: [{
				title: '北京交通原型设计APP设计总目录',
				// url: '/parkinglot',
				url: 'https://lzbi8rw9zp.feishu.cn/mindnotes/bmncnYsWW7CHhnW342P76li3Kae',
				paw: 'DMU7',
			},]
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

#view {
	width: 10rem;
	max-width: 1080px;
	height: 100%;
	margin: auto;

}

[v-cloak] {
	display: none;
}

ul li {
	font-size: 14px;
}

a.item {
	display: inline-block;
}
</style>
