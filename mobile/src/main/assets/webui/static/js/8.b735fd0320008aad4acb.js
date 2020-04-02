(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{753:function(t,e,a){"use strict";a.r(e);var n=a(0),s=a.n(n);e.default={seconds_to_duration:function(t){var e="",a=Math.floor(t/60/60),n=Math.floor(t/60%60),s=Math.floor(t%60);return 0!=a&&(e+=a+"h"),0==a&&0==n||(e+=n+"m"),0==a&&(e+=s+"s"),e},get_day_start:function(t){var e=s()(t);return e.set("hour",0),e.set("minute",0),e.set("second",0),e.set("millisecond",0),e},get_prev_day:function(t){return s()(t).add(-1,"days")},get_next_day:function(t){return s()(t).add(1,"days")}}},754:function(t,e,a){"use strict";a.r(e),a.d(e,"getColorFromString",function(){return d}),a.d(e,"getTitleAttr",function(){return c});var n=a(717),s=a.n(n),i=a(713),r=a(712).scaleOrdinal(["#90CAF9","#FFE082","#EF9A9A","#A5D6A7"]);r.domain([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]);var o={afk:"#EEE","not-afk":"#7F6",hibernating:"#DD6","google-chrome":"#6AA7FE",chromium:"#8CF",firefox:"#F94",spotify:"#5FA",alacritty:"#FD8",vue:"#5d9",python:"#369",javascript:"#f6b",localhost:"#CCC","github.com":"#EBF","stackoverflow.com":i("#F48024").lighten(.3),"google.com":"#0AF","google.se":"#0AF","messenger.com":i("#3b5998").lighten(.5),"facebook.com":i("#3b5998").lighten(.5)};function d(t){return t=(t=t||"").toLowerCase(),o[t]||r(Math.abs(function(t){var e=0;if(0===t.length)return e;for(var a=0;a<t.length;a++)e=(e<<5)-e+t.charCodeAt(a),e&=e;return e}(t)%20))}function c(t,e){if("currentwindow"==t.type)return e.data.app;if("web.tab.current"!=t.type)return"afkstatus"==t.type?e.data.status:t.type.startsWith("app.editor")?s()(e.data.file.split("/")):e.data.title;try{return new URL(e.data.url).hostname.replace("www.","")}catch(t){return e.data.url}}},761:function(t,e,a){var n=a(783);"string"==typeof n&&(n=[[t.i,n,""]]);var s={hmr:!0,transform:void 0,insertInto:void 0};a(360)(n,s);n.locals&&(t.exports=n.locals)},782:function(t,e,a){"use strict";var n=a(761);a.n(n).a},783:function(t,e,a){(t.exports=a(359)(!1)).push([t.i,".sunburst[data-v-d0f05cca] {\n  font-family: 'Open Sans', sans-serif;\n  font-size: 12px;\n  font-weight: 400;\n  width: 100%;\n  height: 620px;\n  margin-top: 10px;\n}\n.sunburst .main[data-v-d0f05cca] {\n    width: 750px;\n    margin-right: auto;\n    margin-left: auto;\n}\n.sunburst .sidebar[data-v-d0f05cca] {\n    float: right;\n    height: 0;\n    width: 100px;\n}\n.sunburst .sequence[data-v-d0f05cca] {\n    width: 600px;\n    height: 70px;\n}\n.sunburst .legend[data-v-d0f05cca] {\n    padding: 10px 0 0 3px;\n}\n.sunburst .sequence text[data-v-d0f05cca], .sunburst .legend text[data-v-d0f05cca] {\n    font-weight: 600;\n    fill: #fff;\n}\n.sunburst .chart[data-v-d0f05cca] {\n    position: relative;\n}\n.sunburst .chart path[data-v-d0f05cca] {\n    stroke: #fff;\n}\n.sunburst .explanation[data-v-d0f05cca] {\n    position: absolute;\n    top: 260px;\n    left: 305px;\n    width: 140px;\n    text-align: center;\n    color: #666;\n    z-index: 10;\n}\n.sunburst .explanation .base[data-v-d0f05cca] {\n      color: #DDD;\n      font-size: 2em;\n}\n.sunburst .explanation .hover .date[data-v-d0f05cca] {\n      font-size: 0.8em;\n}\n.sunburst .explanation .hover .time[data-v-d0f05cca] {\n      font-size: 1em;\n}\n.sunburst .explanation .hover .title[data-v-d0f05cca] {\n      font-size: 2em;\n      font-weight: bold;\n}\n.sunburst .explanation .hover .duration[data-v-d0f05cca] {\n      font-size: 1em;\n}\n.sunburst .explanation .hover .data[data-v-d0f05cca] {\n      font-size: 1em;\n}\n",""])},809:function(t,e,a){"use strict";a.r(e);var n,s,i,r,o=a(738),d=a.n(o),c=a(739),l=a.n(c),u=a(740),f=a.n(u),h=a(720),p=a.n(h),v=a(753),m=a(712),g=a(0),y=a(754),x=750,w=600,b=Math.min(x,w)/2,C={afk:y.getColorFromString("afk"),"not-afk":y.getColorFromString("not-afk"),hibernating:y.getColorFromString("hibernating")};function k(t,e,a){var n=2*Math.PI*(t/24+e/24/60)-.5*Math.PI;!function(t){var e=Math.cos(t),a=Math.sin(t);s.append("line").attr("x1",170*e).attr("y1",170*a).attr("x2",155*e).attr("y2",155*a).style("stroke","#CCC").style("stroke-width",1)}(n);var i=Math.cos(n),r=Math.sin(n);s.append("text").text(a||g({hours:t}).format("HH:mm")).attr("text-anchor","middle").attr("font-size","1.2em").style("fill","#999").attr("x",130*i).attr("y",5+140*r)}function M(t){console.log("Clicked"),console.log(t)}function A(t){!function(t){var e=m.select(".explanation > .hover"),a=g(t.data.timestamp);e.select(".date").text(a.format("YYYY-MM-DD")),e.select(".time").text(a.format("HH:mm:ss"));var n=v.default.seconds_to_duration(t.data.duration);e.select(".duration").text(n),e.select(".title").text(t.data.data.app||t.data.data.status),e.select(".data").text(t.data.data.title||""),m.select(".explanation > .base").style("display","none"),e.style("visibility","")}(t);var e=t.ancestors().reverse();e.shift(),n.selectAll("path").style("opacity",.5),n.selectAll("path").filter(function(t){return e.indexOf(t)>=0}).style("opacity",1)}function _(){n.selectAll("path").on("mouseover",null),n.selectAll("path").transition().duration(100).style("opacity",1).on("end",function(){m.select(this).on("mouseover",A)}),n.select(".explanation > .base").style("display",""),n.select(".explanation > .hover").style("visibility","hidden")}var F={create:function(t){var e,a;(n=m.select(".chart")).selectAll("svg").remove(),s=n.append("svg:svg").attr("width",x).attr("height",w).append("svg:g").attr("id","container").attr("transform","translate("+x/2+","+w/2+")"),e={w:75,h:30,s:3,r:3},(a=m.select(".legend").append("svg:svg").attr("width",e.w).attr("height",m.keys(C).length*(e.h+e.s)).selectAll("g").data(m.entries(C)).enter().append("svg:g").attr("transform",function(t,a){return"translate(0,"+a*(e.h+e.s)+")"})).append("svg:rect").attr("rx",e.r).attr("ry",e.r).attr("width",e.w).attr("height",e.h).style("fill",function(t){return t.value}),a.append("svg:text").attr("x",e.w/2).attr("y",e.h/2).attr("dy","0.35em").attr("text-anchor","middle").text(function(t){return t.key}),i=m.partition().size([2*Math.PI,b*b]),r=m.arc().startAngle(function(t){return t.x0}).endAngle(function(t){return t.x1}).innerRadius(function(t){return Math.sqrt(t.y0)}).outerRadius(function(t){return Math.sqrt(t.y1)})},update:function(t,e){m.select(".sequence").append("svg:svg").attr("width",x).attr("height",50).attr("id","trail").append("svg:text").attr("id","endlabel").style("fill","#000"),t.querySelector("#container").innerHTML="",s.append("svg:circle").attr("r",b).style("opacity",0);var a=m.hierarchy(e),n=i(a),o=g(e.timestamp),d=g(e.timestamp).add(e.duration,"seconds");o=o.startOf("day"),d=o.clone().endOf("day"),k(0,0),k(6,0),k(12,0),k(18,0);var c=g();k(c.hour(),c.minute(),"Now"),n=(n=n.each(function(t){var e=g(t.data.timestamp).diff(o,"seconds",!0),a=g(t.data.timestamp).add(t.data.duration,"seconds").diff(o,"seconds",!0),n=Math.max(0,e/((d-o)/1e3)),s=Math.min(1,a/((d-o)/1e3));t.x0=2*Math.PI*n,t.x1=2*Math.PI*s}).descendants()).filter(function(t){return t.x1-t.x0>.001}),s.data([e]).selectAll("path").data(n).enter().append("svg:path").attr("display",function(t){return t.depth?null:"none"}).attr("d",r).attr("fill-rule","evenodd").style("fill",function(t){return y.getColorFromString(t.data.data.status||t.data.data.app)}).style("opacity",1).on("mouseover",A).on("click",M),m.select("#container").on("mouseleave",_)}},E=a(0),z=a.n(E),I={name:"aw-sunburst",props:["date","afkBucketId","windowBucketId"],mounted:function(){F.create(this.$el),this.starttime=z()(this.date),this.endtime=z()(this.date).add(1,"days"),this.visualize()},data:function(){return{starttime:z()(),endtime:z()(),centerMsg:"Loading..."}},watch:{date:function(t){this.starttime=z()(t),this.endtime=z()(this.starttime).add(1,"days"),this.visualize()}},methods:{todaysEvents:function(t){return this.$aw.getEvents(t,{limit:-1,start:this.starttime.format(),end:this.endtime.format()})},visualize:function(){var t=this;this.todaysEvents(this.afkBucketId).then(function(e){t.todaysEvents(t.windowBucketId).then(function(a){var n=null;e.length>0&&a.length>0?(n=function(t,e){t=p()(t,"timestamp","desc"),e=p()(e,"timestamp","desc");for(var a=0,n=0;n<t.length;n++){var s=t[n],i=z()(s.timestamp),r=i.clone().add(s.duration,"seconds");for(s.children=[];a<e.length;){var o=e[a],c=z()(o.timestamp),u=c.clone().add(o.duration,"seconds"),h=u.isBefore(i),v=c.isAfter(i)&&u.isBefore(r),m=c.isAfter(r);if(h)a++;else if(v)s.children=f()(s.children,o),a++;else{if(m)break;console.warn("Between parents"),s.children=f()(s.children,o),a++}}}var g=z()(l()(t).timestamp),y=(z()(d()(t).timestamp)-g)/1e3;return{timestamp:l()(t).timestamp,duration:y,data:{title:"ROOT"},children:t}}(e,a),t.centerMsg="Hover to inspect"):(n={timestamp:"",duration:0,data:{title:"ROOT"},children:[]},t.centerMsg="No data"),F.update(t.$el,n)})})}}},O=(a(782),a(70)),D=Object(O.a)(I,function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"sunburst"},[this._m(0),e("div",{staticClass:"main"},[e("div",{staticClass:"chart"},[e("div",{staticClass:"explanation"},[e("div",{staticClass:"base"},[this._v(this._s(this.centerMsg))]),this._m(1)])])])])},[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"sidebar"},[e("div",{staticClass:"legend"})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"hover",staticStyle:{visibility:"hidden"}},[e("div",{staticClass:"date"}),e("div",{staticClass:"title"}),e("div",{staticClass:"time"}),e("div",{staticClass:"duration"}),e("div",{staticClass:"data",staticStyle:{"text-overflow":"ellipsis","white-space":"nowrap",overflow:"hidden"}})])}],!1,null,"d0f05cca",null);e.default=D.exports}}]);
//# sourceMappingURL=8.b735fd0320008aad4acb.js.map