"use strict";function analysis(){var t=document.getElementById("file").files[0],n=new FileReader;n.readAsText(t),n.onload=function(n){for(var e=[],a=this.result.split("\r\n"),o=4,r=a.length;o<r;o++)e.push(a[o].split(","));funDownload(stringify(e),t.name.split(".")[0]+".json")}}function stringify(t){for(var n="[",e=0,a=t.length;e<a&&t[e][0].indexOf("----------")==-1;e++)n+=e?",\r\n  [":"\r\n  [",n+=t[e].map(function(t){return'"'+t.trim()+'"'}).join(", "),n+="]";return n+="\r\n]"}function funDownload(t,n){var e=document.createElement("a");e.download=n,e.style.display="none";var a=new Blob([t]);e.href=URL.createObjectURL(a),document.body.appendChild(e),e.click(),document.body.removeChild(e)}var app=new Vue({el:document.getElementById("app"),data:{year:["2010","2011","2012","2013","2014","2015","2016","2017","2018_6"],data:[]},methods:{loadBill:function(t){var n=this;this._d||(this._d={}),$.getJSON("/data/alipay_record_"+t+".json",function(t){t.shift(),t.forEach(function(t){n._d[t[0]]||(n._d[t[0]]=!0,n.data.push(t))})})},getIndexCount:function(t,n){var e={};return t.forEach(function(t){e[t[n]]?(e[t[n]].count++,e[t[n]].value+=parseFloat(t[9])+parseFloat(t[12])-parseFloat(t[13]),e[t[n]].value=Math.round(100*e[t[n]].value)/100):e[t[n]]={count:1,name:t[n],value:parseFloat(t[9])+parseFloat(t[12])-parseFloat(t[13])}}),e}},computed:{index6:function(){return this.getIndexCount(this.data,6)},index7:function(){var t=this.getIndexCount(this.data,7),n=[];for(var e in t)n.push(t[e]);return n.sort(function(t,n){return n.value-t.value}),n},index10:function(){return this.getIndexCount(this.data,10)},index11:function(){return this.getIndexCount(this.data,11)},index15:function(){return this.getIndexCount(this.data,15)},out:function(){var t=0;return this.data.forEach(function(n){"支出"==n[10]&&(t+=parseFloat(n[9])+parseFloat(n[12])-parseFloat(n[13]))}),t=Math.round(100*t)/100},yeb:function(){var t=0;return this.data.forEach(function(n){n[8].indexOf("收益发放")!=-1&&n[8].indexOf("余额宝")!==-1&&(t+=parseFloat(n[9]))}),t=Math.round(100*t)/100}}});
//# sourceMappingURL=main.js.map
