(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{753:function(t,e,n){"use strict";n.r(e);var a=n(0),r=n.n(a);e.default={seconds_to_duration:function(t){var e="",n=Math.floor(t/60/60),a=Math.floor(t/60%60),r=Math.floor(t%60);return 0!=n&&(e+=n+"h"),0==n&&0==a||(e+=a+"m"),0==n&&(e+=r+"s"),e},get_day_start:function(t){var e=r()(t);return e.set("hour",0),e.set("minute",0),e.set("second",0),e.set("millisecond",0),e},get_prev_day:function(t){return r()(t).add(-1,"days")},get_next_day:function(t){return r()(t).add(1,"days")}}},755:function(t,e,n){"use strict";var a=n(715),r=n.n(a),s=n(716),o=n.n(s),i=n(714),u=n.n(i);function c(t){return t.split(";").filter(function(t){return t}).map(function(t){return t+";"})}var _={chrome:["Google-chrome","chrome.exe","Chromium","Google Chrome","Chromium-browser","Chromium-browser-chromium","Google-chrome-beta","Google-chrome-unstable"],firefox:["Firefox","Firefox.exe","firefox","firefox.exe","Firefox Developer Edition","Firefox Beta","Nightly"],opera:["opera.exe","Opera"],brave:["brave.exe"]};e.a={summaryQuery:function(t,e,n){return t=t.replace('"','\\"'),e=e.replace('"','\\"'),c('events  = flood(query_bucket("'.concat(t,'"));\n    not_afk = flood(query_bucket("').concat(e,'"));\n    not_afk = filter_keyvals(not_afk, "status", ["not-afk"]);\n    events  = filter_period_intersect(events, not_afk);\n    title_events  = merge_events_by_keys(events, ["app", "title"]);\n    title_events  = sort_by_duration(title_events);\n    app_events  = merge_events_by_keys(title_events, ["app"]);\n    app_events  = sort_by_duration(app_events);\n    app_events  = limit_events(app_events, ').concat(n,");\n    title_events  = limit_events(title_events, ").concat(n,');\n    RETURN  = {"app_events": app_events, "title_events": title_events};'))},windowQuery:function(t,e,n,a,r){return t=t.replace('"','\\"'),e=e.replace('"','\\"'),c('events  = flood(query_bucket("'.concat(t,'"));\n     not_afk = flood(query_bucket("').concat(e,'"));\n     not_afk = filter_keyvals(not_afk, "status", ["not-afk"]);')+(r?"events  = filter_period_intersect(events, not_afk);":"")+'title_events  = merge_events_by_keys(events, ["app", "title"]);\n    title_events  = sort_by_duration(title_events);\n    app_events  = merge_events_by_keys(title_events, ["app"]);\n    app_events  = sort_by_duration(app_events);\n\n    events = sort_by_timestamp(events);\n    app_chunks = chunk_events_by_key(events, "app");\n    app_events  = limit_events(app_events, '.concat(n,");\n    title_events  = limit_events(title_events, ").concat(a,');\n    duration = sum_durations(events);\n    RETURN  = {"app_events": app_events, "title_events": title_events, "app_chunks": app_chunks, "duration": duration};'))},browserSummaryQuery:function(t,e,n,a,s){t=u()(t,function(t){return t.replace('"','\\"')}),e=e.replace('"','\\"'),n=n.replace('"','\\"'),a=a||5;var i='events = [];\n     window = flood(query_bucket("'.concat(e,'"));')+(s?'not_afk = flood(query_bucket("'.concat(n,'"));\n     not_afk = filter_keyvals(not_afk, "status", ["not-afk"]);'):"");return o()(["chrome","firefox","opera","brave"],function(e){var n=r()(t,function(t){return-1!==t.indexOf(e)})[0];if(void 0!==n){var a=JSON.stringify(_[e]);i+="events_".concat(e,' = flood(query_bucket("').concat(n,'"));\n       window_').concat(e,' = filter_keyvals(window, "app", ').concat(a,");")+(s?"window_".concat(e," = filter_period_intersect(window_").concat(e,", not_afk);"):"")+"events_".concat(e," = filter_period_intersect(events_").concat(e,", window_").concat(e,");\n       events_").concat(e," = split_url_events(events_").concat(e,");\n       events = sort_by_timestamp(concat(events, events_").concat(e,"));")}}),c(i).concat(['urls = merge_events_by_keys(events, ["url"]);',"urls = sort_by_duration(urls);","urls = limit_events(urls, "+a+");","domains = split_url_events(events);",'domains = merge_events_by_keys(domains, ["domain"]);',"domains = sort_by_duration(domains);","domains = limit_events(domains, "+a+");",'chunks = chunk_events_by_key(events, "domain");',"duration = sum_durations(events);",'RETURN = {"domains": domains, "urls": urls, "chunks": chunks, "duration": duration};'])},appQuery:function(t,e){return t=t.replace('"','\\"'),e=e||5,c('events  = query_bucket("'.concat(t,'");')+'events  = merge_events_by_keys(events, ["app"]);\n    events  = sort_by_duration(events);\n    events  = limit_events(events, '.concat(e,');\n    total_duration = sum_durations(events);\n    RETURN  = {"events": events, "total_duration": total_duration};'))},dailyActivityQuery:function(t){return['afkbucket = "'+(t=t.replace('"','\\"'))+'";',"not_afk = flood(query_bucket(afkbucket));",'not_afk = merge_events_by_keys(not_afk, ["status"]);',"RETURN = not_afk;"]},dailyActivityQueryAndroid:function(t){return t=t.replace('"','\\"'),['events = query_bucket("'.concat(t,'");'),"RETURN = sum_durations(events);"]},editorActivityQuery:function(t,e){return['editorbucket = "'+(t=t.replace('"','\\"'))+'";',"events = flood(query_bucket(editorbucket));",'files = sort_by_duration(merge_events_by_keys(events, ["file", "language"]));',"files = limit_events(files, "+e+");",'languages = sort_by_duration(merge_events_by_keys(events, ["language"]));',"languages = limit_events(languages, "+e+");",'projects = sort_by_duration(merge_events_by_keys(events, ["project"]));',"projects = limit_events(projects, "+e+");","duration = sum_durations(events);",'RETURN = {"files": files, "languages": languages, "projects": projects, "duration": duration};']}}},818:function(t,e,n){"use strict";n.r(e);var a,r,s=n(98),o=n.n(s),i=n(149),u=n.n(i),c=n(747),_=n.n(c),d=n(714),l=n.n(d),p=n(0),v=n.n(p),f=(n(753),n(721),n(722),n(723),n(724),n(755)),y={name:"Activity",data:function(){return{today:v()().startOf("day").format("YYYY-MM-DD"),errormsg:"",total_duration:"",daily_activity:[],top_apps:[],top_apps_count:5,top_apps_namefunc:function(t){return t.data.app},top_apps_colorfunc:function(t){return t.data.app},appBucketId:"aw-watcher-android-test"}},watch:{$route:function(){this.refresh()}},computed:{host:function(){return this.$route.params.host},date:function(){var t=this.$route.params.date;return(t?v()(t):v()()).startOf("day").format()},dateStart:function(){return this.date},dateEnd:function(){return v()(this.date).add(1,"days").format()},dateShort:function(){return v()(this.date).format("YYYY-MM-DD")}},mounted:function(){this.refresh(),this.testError()},methods:{previousDay:function(){return v()(this.dateStart).subtract(1,"days").format("YYYY-MM-DD")},nextDay:function(){return v()(this.dateStart).add(1,"days").format("YYYY-MM-DD")},setDate:function(t){this.$router.push("/activity/android/"+this.host+"/"+t)},refresh:function(){this.queryAll()},errorHandler:function(t){throw this.errormsg=t+". See dev console (F12) and/or server logs for more info.",t},queryAll:function(){this.total_duration=0,this.eventcount=0,this.errormsg="",this.queryApps(),this.queryDailyActivity()},queryApps:(r=u()(o.a.mark(function t(){var e,n,a;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e=[this.dateStart+"/"+this.dateEnd],n=f.a.appQuery(this.appBucketId,this.top_apps_count),t.next=4,this.$aw.query(e,n).catch(this.errorHandler);case 4:a=(a=t.sent)[0],this.top_apps=a.events,this.total_duration=a.total_duration;case 8:case"end":return t.stop()}},t,this)})),function(){return r.apply(this,arguments)}),queryDailyActivity:(a=u()(o.a.mark(function t(){var e,n,a,r,s;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:for(e=[],n=-15;n<=15;n++)a=v()(this.date).add(n,"days").format(),r=v()(this.date).add(n+1,"days").format(),e.push(a+"/"+r);return t.next=4,this.$aw.query(e,f.a.dailyActivityQueryAndroid(this.appBucketId)).catch(this.errorHandler);case 4:s=t.sent,this.daily_activity=l()(_()(e,s),function(t){return[{timestamp:t[0].split("/")[0],duration:t[1],data:{status:"not-afk"}}]}),console.log(this.daily_activity);case 7:case"end":return t.stop()}},t,this)})),function(){return a.apply(this,arguments)}),testError:function(){}}},m=n(70),h=Object(m.a)(y,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("h2",[t._v("Activity for "+t._s(t.dateShort))]),n("p",[t._v("Device type: Android"),n("br"),t._v("Host: "+t._s(t.host)),n("br"),t._v("Active time: "+t._s(t._f("friendlyduration")(t.total_duration)))]),n("b-alert",{attrs:{variant:"danger",show:t.errormsg.length>0}},[t._v(t._s(t.errormsg))]),n("div",{staticClass:"d-flex"},[n("div",{staticClass:"p-1"},[n("b-button-group",[n("b-button",{attrs:{to:"/activity/android/"+t.host+"/"+t.previousDay(),variant:"outline-dark"}},[n("icon",{attrs:{name:"arrow-left"}}),n("span",{staticClass:"d-none d-lg-inline"},[t._v(" Previous day")])],1),n("b-button",{attrs:{to:"/activity/android/"+t.host+"/"+t.nextDay(),disabled:t.nextDay()>t.today,variant:"outline-dark"}},[n("span",{staticClass:"d-none d-lg-inline"},[t._v(" Next day")]),n("icon",{attrs:{name:"arrow-right"}})],1)],1)],1),n("div",{staticClass:"p-1"},[n("input",{staticClass:"form-control",attrs:{id:"date",type:"date",max:t.today},domProps:{value:t.dateShort},on:{change:function(e){return t.setDate(e.target.value)}}})]),n("div",{staticClass:"p-1 ml-auto"},[n("b-button-group",[n("b-button",{attrs:{variant:"outline-dark"},on:{click:function(e){return t.refresh()}}},[n("icon",{attrs:{name:"sync"}}),n("span",{staticClass:"d-none d-lg-inline"},[t._v(" Refresh")])],1)],1)],1)]),n("aw-periodusage",{attrs:{periodusage_arr:t.daily_activity,host:t.host}}),n("br"),n("div",{staticClass:"row"},[n("div",{staticClass:"col-md-4"},[n("h5",[t._v("Top Applications")]),n("aw-summary",{attrs:{fields:t.top_apps,namefunc:t.top_apps_namefunc,colorfunc:t.top_apps_colorfunc}}),n("b-button",{attrs:{size:"sm",variant:"outline-secondary",disabled:t.top_apps.length<t.top_apps_count},on:{click:function(e){t.top_apps_count+=5,t.queryApps()}}},[n("icon",{attrs:{name:"angle-double-down"}}),t._v("Show more")],1)],1)])],1)},[],!1,null,null,null);e.default=h.exports}}]);
//# sourceMappingURL=16.a8f59bc7875b565ddf5a.js.map