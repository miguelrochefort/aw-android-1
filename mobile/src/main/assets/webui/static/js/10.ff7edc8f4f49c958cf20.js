(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{753:function(t,e,n){"use strict";n.r(e);var r=n(0),a=n.n(r);e.default={seconds_to_duration:function(t){var e="",n=Math.floor(t/60/60),r=Math.floor(t/60%60),a=Math.floor(t%60);return 0!=n&&(e+=n+"h"),0==n&&0==r||(e+=r+"m"),0==n&&(e+=a+"s"),e},get_day_start:function(t){var e=a()(t);return e.set("hour",0),e.set("minute",0),e.set("second",0),e.set("millisecond",0),e},get_prev_day:function(t){return a()(t).add(-1,"days")},get_next_day:function(t){return a()(t).add(1,"days")}}},754:function(t,e,n){"use strict";n.r(e),n.d(e,"getColorFromString",function(){return l}),n.d(e,"getTitleAttr",function(){return c});var r=n(717),a=n.n(r),o=n(713),i=n(712).scaleOrdinal(["#90CAF9","#FFE082","#EF9A9A","#A5D6A7"]);i.domain([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]);var s={afk:"#EEE","not-afk":"#7F6",hibernating:"#DD6","google-chrome":"#6AA7FE",chromium:"#8CF",firefox:"#F94",spotify:"#5FA",alacritty:"#FD8",vue:"#5d9",python:"#369",javascript:"#f6b",localhost:"#CCC","github.com":"#EBF","stackoverflow.com":o("#F48024").lighten(.3),"google.com":"#0AF","google.se":"#0AF","messenger.com":o("#3b5998").lighten(.5),"facebook.com":o("#3b5998").lighten(.5)};function l(t){return t=(t=t||"").toLowerCase(),s[t]||i(Math.abs(function(t){var e=0;if(0===t.length)return e;for(var n=0;n<t.length;n++)e=(e<<5)-e+t.charCodeAt(n),e&=e;return e}(t)%20))}function c(t,e){if("currentwindow"==t.type)return e.data.app;if("web.tab.current"!=t.type)return"afkstatus"==t.type?e.data.status:t.type.startsWith("app.editor")?a()(e.data.file.split("/")):e.data.title;try{return new URL(e.data.url).hostname.replace("www.","")}catch(t){return e.data.url}}},763:function(t,e,n){var r=n(787);"string"==typeof r&&(r=[[t.i,r,""]]);var a={hmr:!0,transform:void 0,insertInto:void 0};n(360)(r,a);r.locals&&(t.exports=r.locals)},786:function(t,e,n){"use strict";var r=n(763);n.n(r).a},787:function(t,e,n){(t.exports=n(359)(!1)).push([t.i,"svg[data-v-095f912e] {\n  border: 1px solid #999;\n  border-radius: 0.5em;\n}\n",""])},810:function(t,e,n){"use strict";n.r(e);var r=n(754),a=n(712),o=n(713),i=n(718),s=n(0),l=n(753);var c={create:function(t){t.innerHTML="",a.select(t).attr("viewBox","0 0 100 4").attr("width","100%")},update:function(t,e,n){var c=a.select(t);if(c.selectAll("*").remove(),!(e.length<=0)){e=i.clone(e),i.reverse(e);var u=i.first(e),f=i.last(e),d=s(u.timestamp),p=s(f.timestamp),m=(p-d)/1e3+f.duration;return console.log("First: "+d.format()),console.log("Last: "+p.format()),console.log("Duration: "+m),i.each(e,function(t,e){var a="timeline_event_"+e,i=s(t.timestamp),u=Object(r.getColorFromString)(Object(r.getTitleAttr)({type:n},t)),f=o(u).darken(.4).hex(),p=(i-d)/1e3/m,h=100*t.duration/m,v=c.append("g").attr("id",a).attr("transform","translate("+100*p+",0)");v.append("rect").attr("width",h).attr("height",4).style("fill",u).on("mouseover",function(t,e,n){n[e].style.fill=f}).on("mouseout",function(t,e,n){n[e].style.fill=u}).append("title").text(i.format()+"\nDuration: "+l.seconds_to_duration(t.duration)+"\n"+JSON.stringify(t.data)),t.duration>.05*m&&v.append("text").attr("font-size",2).attr("x",1).attr("y",2.5).attr("pointer-events","none").text(Object(r.getTitleAttr)({type:n},t))}),t}!function(t,e){var n=a.select(t);n.selectAll("*").remove(),n.append("text").attr("x","0").attr("y","3").text(e).attr("font-family","sans-serif").attr("font-size","2").attr("fill","black")}(t,"No data")}},u={name:"aw-timeline",props:["type","event_type","events"],mounted:function(){c.create(this.$el)},watch:{events:function(){c.update(this.$el,this.events,this.event_type)}}},f=(n(786),n(70)),d=Object(f.a)(u,function(){var t=this.$createElement;return(this._self._c||t)("svg")},[],!1,null,"095f912e",null);e.default=d.exports}}]);
//# sourceMappingURL=10.ff7edc8f4f49c958cf20.js.map