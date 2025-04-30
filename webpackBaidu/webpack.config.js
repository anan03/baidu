const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
module.exports = {
    mode: "production", //development开发阶段，不会进行压缩和混淆//线上打包：production
    entry: path.join(__dirname, "./src/index.js"), //打包入口文件的路径
    output: {
        path: path.join(__dirname, "./dist"), //打包入口文件的路径
        filename: "bundle.js", //输出文件的名字
    },
    plugins: [
        new htmlWebpackPlugin({
            template: path.join(__dirname, "./public/index.html"), //指定模版页面，去生成内存中的页面
            filename: "index.html", //内存中生成的页面名字
        }),
        new VueLoaderPlugin(),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, "public"),
                to: path.resolve(__dirname, "dist"),
            },
        ]),
    ],
    module: {
        //用于配置所有第三方模块 加载器
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.less$/,
                use: ["style-loader", "css-loader", "less-loader"],
            },
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            }, //做处理，大图片不用base64处理  图片大于等于1M时，不用base64 单位字节： kb*1024
            //name：之前叫什么名字现在还叫什么名，前面放一个8位的hash值
            {
                test: /\.(jpg|png|gif|bmp|jpeg)$/,
                use: "url-loader?limit=1048576&esModule=false&name=[hash:8]-[name].[ext]",
            },
            //处理字体
            {
                test: /\.(ttf|eot|svg|woff|woff2)$/,
                use: "url-loader",
            },
            {
                test: /\.js$/,
                use: "babel-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.vue$/,
                use: "vue-loader",
            },
        ],
    },
};
