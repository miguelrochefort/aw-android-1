(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{753:function(t,a,r){"use strict";r.r(a);var e=r(0),n=r.n(e);a.default={seconds_to_duration:function(t){var a="",r=Math.floor(t/60/60),e=Math.floor(t/60%60),n=Math.floor(t%60);return 0!=r&&(a+=r+"h"),0==r&&0==e||(a+=e+"m"),0==r&&(a+=n+"s"),a},get_day_start:function(t){var a=n()(t);return a.set("hour",0),a.set("minute",0),a.set("second",0),a.set("millisecond",0),a},get_prev_day:function(t){return n()(t).add(-1,"days")},get_next_day:function(t){return n()(t).add(1,"days")}}},759:function(t,a,r){var e=r(779);"string"==typeof e&&(e=[[t.i,e,""]]);var n={hmr:!0,transform:void 0,insertInto:void 0};r(360)(e,n);e.locals&&(t.exports=e.locals)},778:function(t,a,r){"use strict";var e=r(759);r.n(e).a},779:function(t,a,r){(t.exports=r(359)(!1)).push([t.i,"svg[data-v-25b6e8a4] {\n  width: 100%;\n  height: 40pt;\n  border: 1px solid #999;\n  margin-top: 0.2em;\n  margin-bottom: 0.2em;\n  border-radius: 0.5em;\n}\n",""])},808:function(t,a,r){"use strict";r.r(a);var e=r(753),n=r(712),o=r(718),i=r(0);function s(t,a){t.innerHTML="",n.select(t).append("text").attr("x","5pt").attr("y","25pt").text(a).attr("font-family","sans-serif").attr("font-size","20pt").attr("fill","black")}var u="#aaa",l="#fc5",d="#adf";var c={create:function(t){t.innerHTML=""},update:function(t,a,r,c){if(a.length<=0)return s(t,"No data"),f;t.innerHTML="";var f=n.select(t);function p(t){var a=o.head(o.filter(t,function(t){return"not-afk"==t.data.status}));return null!=a?a.duration:0}var h=a.map(function(t){return p(t)}),m=Math.max.apply(null,h);m<=0&&(m=1e-11);var v=100/(a.length-1)*.3,g=100/a.length-v,y=Math.floor(a.length/2);o.each(a,function(t,o){var s=p(t),h=s/m*85,x="";t.length>0&&(x=i(a[o][0].timestamp).format("YYYY-MM-DD"));var _=o==y?l:u,k=o*v+o*g+.25*g;i(x).isSame(i(),"day")&&(f.append("line").attr("x1",k+g/2+"%").attr("y1",0).attr("x2",k+g/2+"%").attr("y2",200).attr("style","stroke: #888; stroke-width: 2px;").attr("stroke-dasharray","4, 2"),f.append("text").attr("x",k+1.5*g+"%").attr("y","30").text("Today"));var w=f.append("rect").attr("x",k+"%").attr("y",101-h+"%").attr("rx",3).attr("ry",3).attr("style",o==y?"stroke: black; stroke-width: 1;":"stroke: #222; stroke-width: 1;").attr("width",g+"%").attr("height",h+50+"%").attr("color",_).attr("date",x).attr("data",r).style("fill",_).on("mouseover",function(){w.style("fill",d)}).on("mouseout",function(t,a,r){var e=r[a];w.style("fill",e.getAttribute("color"))}).on("click",function(t,a,r){var e=r[a],o=n.select(e).attr("date"),i=n.select(e).attr("data"),s="/#".concat(i,"/").concat(o);window.location.assign(s)});w.append("title").text(i(x).format(c)+"\n"+e.default.seconds_to_duration(s))})},set_status:s},f={name:"aw-periodusage",props:["periodusage_arr","link_prefix","dateformat"],mounted:function(){c.create(this.$el),c.set_status(this.$el,"Loading...")},watch:{periodusage_arr:function(){c.update(this.$el,this.periodusage_arr,this.link_prefix,this.dateformat)}}},p=(r(778),r(70)),h=Object(p.a)(f,function(){var t=this.$createElement;return(this._self._c||t)("svg")},[],!1,null,"25b6e8a4",null);a.default=h.exports}}]);
//# sourceMappingURL=12.af3256de7a534cdddc32.js.map