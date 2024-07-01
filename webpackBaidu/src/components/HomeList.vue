<template>
    <div>
        <div id="view">
            <div style="text-align: center;">版本V1.2</div>
            <el-button v-show="false" class="sieze" v-cloak type="primary" @click="outLogin">退出到登录页面</el-button>
            <ul class="infinite-list" style="overflow:auto">
                <router-link :to="item.url" v-for="(item, index) in titleList" tag="li" class="infinite-list-item">
                    <a :href="item.url" class="item">
                        <el-button v-cloak type="primary">{{ item.title }}</el-button>
                    </a>
                </router-link>
            </ul>
            <div v-show="false">
                <el-button class="sieze" v-cloak type="primary" @click="finashH5">返回上一页原生页面</el-button>
                <el-button class="sieze" v-cloak type="primary" @click="backOrderPage">返回到订单页面</el-button>
                <el-button class="sieze" v-cloak type="primary" @click="getOrderJsonStr">获取订单信息</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            titleList: [
                {
                    title: "泊位导入模版",
                    info: "泊位模版导入查看位置",
                    url: "/parkinglot",
                },
                {
                    title: "设备导入模版",
                    info: "设备模版导入查看位置",
                    url: "./device",
                },
                {
                    title: "基础信息模版",
                    info: "基础信息模版导入查看位置",
                    url: "/road",
                },
                {
                    title: "系统导出车位模版",
                    info: "停车系统车位导出模版，查看坐标",
                    url: "/system",
                },
                // {
                // 	title: '北京交通模块，原型',
                // 	info: '北京交通模块，原型',
                // 	url: '/bjjt/bjjtlist'
                // },
                // {
                // 	title: '泊位纠偏导出',
                // 	info: '新增泊位纠偏导出功能',
                // 	url: '/rectificationLocation'
                // },
                // {
                // 	title: '泊位编号排序纠偏导出',
                // 	info: '泊位编号排序纠偏导出',
                // 	url: '/parkingSort'
                // }
            ],
        };
    },
    //挂载方法
    mounted() {
        window.getCooke = this.getCooke;
        window.resultOrderJsonStr = this.resultOrderJsonStr;
    },
    created() {
        // alert( localStorage.getItem("token"))
        // alert( localStorage.getItem("phoneNumber"))
        // alert(document.cookie);
    },
    methods: {
        //关闭当前html页面
        finashH5() {
            window.webkit.messageHandlers.finashH5.postMessage(null);
        },
        //退出登录
        outLogin() {
            window.webkit.messageHandlers.outLogin.postMessage(null);
        },
        //获取订单信息json
        getOrderJsonStr() {
            window.webkit.messageHandlers.getOrderJsonStr.postMessage(null);
        },
        //回调订单信息
        resultOrderJsonStr(orderJsonStr) {
            // alert(document.cookie);
            // alert(orderJsonStr);
        },

        // //返回到订单页面
        // backOrderPage(){
        // 	window.webkit.messageHandlers.backOrderPage.postMessage(null);
        // },
        getCooke(msg) {
            //ios中传来的参数
            // alert(msg);
            //返回给ios参数
            return "1111";
        },
    },
};
</script>

<style lang="scss" scoped>
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
.sieze {
    font-size: 70px;
    margin: 20px;
}
</style>
