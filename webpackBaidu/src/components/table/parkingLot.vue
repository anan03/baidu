<template>
	<div id="view">
		<div class="header">
			<div class="header-title">
				<input type="file" id="excel-file" @change="selectFile">
				<p v-cloak @click="showAll" style="margin: 5px;" :class="[CurrentAll?'selectBg':'defaultBg']">显示所有路段</p>
				<p v-cloak style="margin: 0px;font-size: 10px;text-align: center;">{{currentLocation}}</p>
			</div>
			<ul class="infinite-list list" v-infinite-scroll="load">
				<li v-for="(item,index) in roadSections" @click="itemOnclick(index)" :key='item.name'
					class="infinite-list-item">
					<p :class="[item.isShow?'selectBg':'defaultBg']">
						<span v-cloak>{{item.name}}</span>
						<br />
						<span v-cloak>(车位：{{item.count}})</span>
					</p>
				</li>
			</ul>
		</div>
		<div class="map" id="container">
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				map: null,
				roadSections: [],
				excelData: null,
				CurrentAll: true,
				count: 0,
				fullscreenLoading: false,
				loading: null,
				currentLocation: '',
				customPosition: null,
			}
		},
		created() {
			this.initMap();
		},
		mounted() {
			this.initMap();
		},
		mounted() {
			this.initMap();
		},
		methods: {
			load() {
				this.count += 2
			},
			initMap() {
				// console.log('initMap');
				// 初始化地图
				var map = new BMapGL.Map("container");
				var point = new BMapGL.Point(116.404844, 39.91405);
				map.centerAndZoom(point, 17);
				map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
				var scaleCtrl = new BMapGL.ScaleControl(); // 添加比例尺控件
				map.addControl(scaleCtrl);
				var zoomCtrl = new BMapGL.ZoomControl(); // 添加缩放控件
				map.addControl(zoomCtrl);
				this.map = map;
				var that = this;
				map.addEventListener('click', function(e) {
					if (e.overlay) {
						return; // 存在覆盖物退出
					}
					if(that.customPosition!==null){
						this.removeOverlay(that.customPosition);
					}
					let point = new BMapGL.Point(e.latlng.lng, e.latlng.lat);
					let marker = new BMapGL.Marker(point); // 创建标注
					marker.setTitle('纠偏坐标地址');
					this.addOverlay(marker); // 将标注添加到地图中
					marker.addEventListener("click", function() {
						let opts = {
							title: this.getTitle()
						};
						let info = this.getPosition().lng + ',' + this.getPosition().lat;
						that.currentLocation = info;
						let infoWindow = new BMapGL.InfoWindow(info, opts);
						infoWindow.enableAutoPan();
						that.map.openInfoWindow(infoWindow, point);
					});
					that.customPosition = marker;
				});
			},
			itemOnclick(position) {
				// this.startLoading();
				this.CurrentAll = false;
				this.map.clearOverlays();
				var roadSectionName = this.roadSections[position].name;
				var roadSectionCurrent = [];
				for (var i = 0; i < this.excelData.length; i++) {
					if (this.excelData[i].路段 == roadSectionName) {
						roadSectionCurrent.push(this.excelData[i]);
					}
				}
				this.addAddress(roadSectionCurrent);
				//改变选中状态
				for (let i = 0; i < this.roadSections.length; i++) {
					if (i == position) {
						this.roadSections[i].isShow = true;
					} else {
						this.roadSections[i].isShow = false;
					}
				}
			},
			showAll() {
				if (!this.excelData) {
					this.showToast('请您倒入xlsx格式文件', 'error')
					return;
				}
				if (!this.CurrentAll) {
					this.startLoading();
					setTimeout(() => {
						this.addAddress(this.excelData);
						this.CurrentAll = true;
						//改变选中状态
						for (let i = 0; i < this.roadSections.length; i++) {
							this.roadSections[i].isShow = true;
						}
					}, 100);

				}
			},
			addAddress(excelData) {
				console.log('添加');
				var that = this;
				var pointArr = [];
				// 系统图标
				for (let i = 0; i < excelData.length; i++) {
					let point = new BMapGL.Point(excelData[i].坐标经度, excelData[i].坐标纬度);
					pointArr.push(point);
					let marker = new BMapGL.Marker(point); // 创建标注

					this.map.addOverlay(marker); // 将标注添加到地图中
					marker.setTitle(excelData[i].外部编号 + ":" + excelData[i].路段)
					marker.addEventListener("click", function() {
						let opts = {
							title: this.getTitle()
						};
						let info = this.getPosition().lng + ',' + this.getPosition().lat;
						that.currentLocation = info;
						let infoWindow = new BMapGL.InfoWindow(info, opts);
						infoWindow.enableAutoPan();
						that.map.openInfoWindow(infoWindow, point);
					});

				}
				var v = this.map.getViewport(pointArr); //此类代表视野，不可实例化，通过对象字面量形式表示
				this.map.centerAndZoom(v.center, v.zoom); //设置地图中心点和视野级别
				this.stopLoading();
				this.showToast('加载完毕', 'success')
			},
			// 获取路段名称并且去重复
			getRoadSections(excelData) {
				var arr = [];
				for (var i = 0; i < excelData.length; i++) {
					arr.push(excelData[i].路段)
				}
				var hash = [];
				for (var i = 0; i < arr.length; i++) {
					if (hash.indexOf(arr[i]) == -1) {
						hash.push(arr[i]);
					}
				}

				for (let i = 0; i < hash.length; i++) {
					var currentCount = 0;
					for (let j = 0; j < excelData.length; j++) {
						if (hash[i] == excelData[j].路段) {
							currentCount++
						}
					}
					this.roadSections.push({
						name: hash[i],
						count: currentCount,
						isShow: true
					});
				}
			},
			selectFile(e) {
				var files = e.target.files;
				var fileReader = new FileReader();
				var that = this;
				fileReader.onload = function(ev) {
					try {
						var data = ev.target.result
						var workbook = XLSX.read(data, {
							type: 'binary'
						}) // 以二进制流方式读取得到整份excel表格对象
						var persons = []; // 存储获取到的数据
					} catch (e) {
						that.showToast('文件类型不正确,请您倒入xlsx格式文件', 'error')
						// console.log('文件类型不正确');
						return;
					}

					that.roadSections = [];
					that.excelData = null;
					that.CurrentAll = true;
					that.startLoading();
					setTimeout(() => {
						// 表格的表格范围，可用于判断表头是否数量是否正确
						var fromTo = '';
						// 遍历每张表读取
						for (var sheet in workbook.Sheets) {
							if (workbook.Sheets.hasOwnProperty(sheet)) {
								fromTo = workbook.Sheets[sheet]['!ref'];
								// console.log(fromTo);
								persons = persons.concat(XLSX.utils.sheet_to_json(workbook.Sheets[
									sheet]));
								break; // 如果只取第一张表，就取消注释这行
							}
						}
						//在控制台打印出来表格中的数据
						// console.log(persons);
						//与data绑定数据
						that.excelData = persons;

						//获取路段去重复展示
						that.getRoadSections(persons);

						//所有路段位置
						that.addAddress(persons);

					}, 100);


				};
				// 以二进制方式打开文件
				fileReader.readAsBinaryString(files[0]);
			},
			startLoading() {
				// console.log('startLoading')
				this.loading = this.$loading({
					lock: true,
					text: '请稍等,正在拼命加载中.....',
					spinner: 'el-icon-loading',
					background: 'rgba(0, 0, 0, 0.7)'
				});
			},
			stopLoading() {
				if (this.loading) {
					// console.log('stopLoading')
					this.loading.close();
					this.loading = null;
				}
			},
			showToast(message, typeMsg) {
				this.$message({
					showClose: true,
					message: message,
					type: typeMsg
				});
			},
		}
	}
</script>

<style lang='scss' scoped>
	[v-cloak] {
		display: none;
	}

	#view {
		display: flex;
		flex-direction: row;
		height: 100%;
	}

	.header {
		padding: 10px;
		width: 20%;
		height: 100%;
		height: 100%;
		/* display: flex; */
		/* flex-direction: column; */
	}

	/*  container{
		height: 800px;
	} */

	.map {
		height: 100%;
		width: 80%;
	}

	.red {
		background-color: red;
	}

	.list {
		overflow: auto;
		list-style: none;
		padding: 0px;
		height: -webkit-calc(100% -120px);
		height: -moz-calc(100% - 120px);
		height: calc(100% - 120px);
	}

	.header-title {
		height: 80px;
	}

	.defaultBg {
		border: 1px solid #1E90FF;
		text-align: center;
		color: #1E90FF;
		background-color: white;
		padding: 5px;
		border-radius: 10px;
		font-size: 14px;
		cursor: pointer;
	}

	.selectBg {
		color: white;
		background-color: #1E90FF;
		padding: 5px;
		border-radius: 10px;
		border: 1px solid #1E90FF;
		text-align: center;
		font-size: 14px;
		cursor: pointer;
	}
</style>
