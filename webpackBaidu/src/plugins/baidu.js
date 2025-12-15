(function() {
    window.BMAP_PROTOCOL = "https";
    window.BMapGL_loadScriptTime = new Date().getTime();
    window.BMapGL = window.BMapGL || {};
    window.BMapGL.apiLoad = function() {
        delete window.BMapGL.apiLoad;
        if (typeof initialize == "function") {
            initialize();
        }
    };
    var s = document.createElement("script");
    s.src = "https://api.map.baidu.com/getscript?type=webgl&v=1.0&ak=U209IECJ6zeQ6wGDcjkdlZwaQRpszlGw&services=&t=20210528194133";
    document.body.appendChild(s);
    var link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("type", "text/css");
    link.setAttribute("href", "https://api.map.baidu.com/res/webgl/10/bmap.css");
    document.getElementsByTagName("head")[0].appendChild(link);
})();
