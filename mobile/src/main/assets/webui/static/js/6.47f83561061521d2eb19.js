(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{753:function(e,t,n){"use strict";n.r(t);var r=n(0),o=n.n(r);t.default={seconds_to_duration:function(e){var t="",n=Math.floor(e/60/60),r=Math.floor(e/60%60),o=Math.floor(e%60);return 0!=n&&(t+=n+"h"),0==n&&0==r||(t+=r+"m"),0==n&&(t+=o+"s"),t},get_day_start:function(e){var t=o()(e);return t.set("hour",0),t.set("minute",0),t.set("second",0),t.set("millisecond",0),t},get_prev_day:function(e){return o()(e).add(-1,"days")},get_next_day:function(e){return o()(e).add(1,"days")}}},755:function(e,t,n){"use strict";var r=n(715),o=n.n(r),i=n(716),a=n.n(i),s=n(714),u=n.n(s);function c(e){return e.split(";").filter(function(e){return e}).map(function(e){return e+";"})}var _={chrome:["Google-chrome","chrome.exe","Chromium","Google Chrome","Chromium-browser","Chromium-browser-chromium","Google-chrome-beta","Google-chrome-unstable"],firefox:["Firefox","Firefox.exe","firefox","firefox.exe","Firefox Developer Edition","Firefox Beta","Nightly"],opera:["opera.exe","Opera"],brave:["brave.exe"]};t.a={summaryQuery:function(e,t,n){return e=e.replace('"','\\"'),t=t.replace('"','\\"'),c('events  = flood(query_bucket("'.concat(e,'"));\n    not_afk = flood(query_bucket("').concat(t,'"));\n    not_afk = filter_keyvals(not_afk, "status", ["not-afk"]);\n    events  = filter_period_intersect(events, not_afk);\n    title_events  = merge_events_by_keys(events, ["app", "title"]);\n    title_events  = sort_by_duration(title_events);\n    app_events  = merge_events_by_keys(title_events, ["app"]);\n    app_events  = sort_by_duration(app_events);\n    app_events  = limit_events(app_events, ').concat(n,");\n    title_events  = limit_events(title_events, ").concat(n,');\n    RETURN  = {"app_events": app_events, "title_events": title_events};'))},windowQuery:function(e,t,n,r,o){return e=e.replace('"','\\"'),t=t.replace('"','\\"'),c('events  = flood(query_bucket("'.concat(e,'"));\n     not_afk = flood(query_bucket("').concat(t,'"));\n     not_afk = filter_keyvals(not_afk, "status", ["not-afk"]);')+(o?"events  = filter_period_intersect(events, not_afk);":"")+'title_events  = merge_events_by_keys(events, ["app", "title"]);\n    title_events  = sort_by_duration(title_events);\n    app_events  = merge_events_by_keys(title_events, ["app"]);\n    app_events  = sort_by_duration(app_events);\n\n    events = sort_by_timestamp(events);\n    app_chunks = chunk_events_by_key(events, "app");\n    app_events  = limit_events(app_events, '.concat(n,");\n    title_events  = limit_events(title_events, ").concat(r,');\n    duration = sum_durations(events);\n    RETURN  = {"app_events": app_events, "title_events": title_events, "app_chunks": app_chunks, "duration": duration};'))},browserSummaryQuery:function(e,t,n,r,i){e=u()(e,function(e){return e.replace('"','\\"')}),t=t.replace('"','\\"'),n=n.replace('"','\\"'),r=r||5;var s='events = [];\n     window = flood(query_bucket("'.concat(t,'"));')+(i?'not_afk = flood(query_bucket("'.concat(n,'"));\n     not_afk = filter_keyvals(not_afk, "status", ["not-afk"]);'):"");return a()(["chrome","firefox","opera","brave"],function(t){var n=o()(e,function(e){return-1!==e.indexOf(t)})[0];if(void 0!==n){var r=JSON.stringify(_[t]);s+="events_".concat(t,' = flood(query_bucket("').concat(n,'"));\n       window_').concat(t,' = filter_keyvals(window, "app", ').concat(r,");")+(i?"window_".concat(t," = filter_period_intersect(window_").concat(t,", not_afk);"):"")+"events_".concat(t," = filter_period_intersect(events_").concat(t,", window_").concat(t,");\n       events_").concat(t," = split_url_events(events_").concat(t,");\n       events = sort_by_timestamp(concat(events, events_").concat(t,"));")}}),c(s).concat(['urls = merge_events_by_keys(events, ["url"]);',"urls = sort_by_duration(urls);","urls = limit_events(urls, "+r+");","domains = split_url_events(events);",'domains = merge_events_by_keys(domains, ["domain"]);',"domains = sort_by_duration(domains);","domains = limit_events(domains, "+r+");",'chunks = chunk_events_by_key(events, "domain");',"duration = sum_durations(events);",'RETURN = {"domains": domains, "urls": urls, "chunks": chunks, "duration": duration};'])},appQuery:function(e,t){return e=e.replace('"','\\"'),t=t||5,c('events  = query_bucket("'.concat(e,'");')+'events  = merge_events_by_keys(events, ["app"]);\n    events  = sort_by_duration(events);\n    events  = limit_events(events, '.concat(t,');\n    total_duration = sum_durations(events);\n    RETURN  = {"events": events, "total_duration": total_duration};'))},dailyActivityQuery:function(e){return['afkbucket = "'+(e=e.replace('"','\\"'))+'";',"not_afk = flood(query_bucket(afkbucket));",'not_afk = merge_events_by_keys(not_afk, ["status"]);',"RETURN = not_afk;"]},dailyActivityQueryAndroid:function(e){return e=e.replace('"','\\"'),['events = query_bucket("'.concat(e,'");'),"RETURN = sum_durations(events);"]},editorActivityQuery:function(e,t){return['editorbucket = "'+(e=e.replace('"','\\"'))+'";',"events = flood(query_bucket(editorbucket));",'files = sort_by_duration(merge_events_by_keys(events, ["file", "language"]));',"files = limit_events(files, "+t+");",'languages = sort_by_duration(merge_events_by_keys(events, ["language"]));',"languages = limit_events(languages, "+t+");",'projects = sort_by_duration(merge_events_by_keys(events, ["project"]));',"projects = limit_events(projects, "+t+");","duration = sum_durations(events);",'RETURN = {"files": files, "languages": languages, "projects": projects, "duration": duration};']}}},766:function(e,t,n){var r=n(793);"string"==typeof r&&(r=[[e.i,r,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};n(360)(r,o);r.locals&&(e.exports=r.locals)},792:function(e,t,n){"use strict";var r=n(766);n.n(r).a},793:function(e,t,n){(e.exports=n(359)(!1)).push([e.i,".aw-nav-link[data-v-2b31c794] {\n  background-color: #eee;\n  border: 2px solid #eee !important;\n  border-bottom: none !important;\n  margin-left: 0.1em;\n  margin-right: 0.1em;\n  border-top-left-radius: 0.5rem !important;\n  border-top-right-radius: 0.5rem !important;\n}\n.aw-nav-link[data-v-2b31c794]:hover {\n  background-color: #fff;\n}\n.aw-nav-item[data-v-2b31c794]:hover {\n  background-color: #fff !important;\n}\n",""])},817:function(e,t,n){"use strict";n.r(t);var r,o=n(98),i=n.n(o),a=n(149),s=n.n(a),u=n(0),c=n.n(u),_=n(753),d=n(755),v={name:"ActivitySummary",data:function(){return{errormsg:"",duration:0,periodLength:"week",period_activity:[]}},computed:{dateformat:function(){return"week"==this.periodLength?"YYYY[ W]WW":"month"==this.periodLength?"YYYY-MM":"year"==this.periodLength?"YYYY":void 0},periodReadable:function(){return c()(this.periodStart).format(this.dateformat)},readableDuration:function(){return _.default.seconds_to_duration(this.duration)},host:function(){return this.$route.params.host},date:function(){var e=this.$route.params.date;return(e?c()(e):c()()).format()},periodStart:function(){return c()(this.date).startOf(this.periodLength).format()},periodEnd:function(){return c()(this.periodStart).add(1,this.periodLength).format()},period:function(){return this.periodStart+"/"+this.periodEnd},periodStartShort:function(){return c()(this.periodStart).format("YYYY-MM-DD")},periodEndShort:function(){return c()(this.periodEnd).format("YYYY-MM-DD")},windowBucketId:function(){return"aw-watcher-window_"+this.host},afkBucketId:function(){return"aw-watcher-afk_"+this.host},link_prefix:function(){return"/activity/summary/"+this.host}},watch:{$route:function(){console.log("Route changed"),this.refresh()},periodLength:function(){this.refresh()}},mounted:function(){this.refresh()},methods:{setDate:function(e){this.$router.push(this.link_prefix+"/"+e)},errorHandler:function(e){throw this.errormsg=e+". See dev console (F12) and/or server logs for more info.",e},refresh:function(){this.queryPeriodActivity()},queryPeriodActivity:(r=s()(i.a.mark(function e(){var t,n,r,o;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:for(t=[],n=-8;n<=8;n++)r=c()(this.periodStart).add(n,this.periodLength).format(),o=c()(r).add(1,this.periodLength).format(),t.push(r+"/"+o);return e.next=4,this.$aw.query(t,d.a.dailyActivityQuery(this.afkBucketId)).catch(this.errorHandler);case 4:this.period_activity=e.sent,this.period_activity[8].length>0?this.duration=this.period_activity[8][0].duration:this.duration=0;case 6:case"end":return e.stop()}},e,this)})),function(){return r.apply(this,arguments)})}},l=(n(792),n(70)),f=Object(l.a)(v,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("h3",[e._v("Summary for "+e._s(e.periodReadable))]),e._v(e._s(e.periodStartShort)+" - "+e._s(e.periodEndShort)),n("br"),e._v("Active time: "+e._s(e.readableDuration)),n("b-alert",{attrs:{variant:"danger",show:e.errormsg.length>0}},[e._v(e._s(e.errormsg))]),n("aw-periodusage",{attrs:{periodusage_arr:e.period_activity,link_prefix:e.link_prefix,dateformat:e.dateformat}}),n("ul",{staticClass:"nav nav-tabs my-3"},[n("li",{staticClass:"nav-item aw-nav-item"},[n("a",{staticClass:"nav-link aw-nav-link",class:{active:"week"==e.periodLength},on:{click:function(t){e.periodLength="week"}}},[n("h5",[e._v("Weekly")])])]),n("li",{staticClass:"nav-item aw-nav-item"},[n("a",{staticClass:"nav-link aw-nav-link",class:{active:"month"==e.periodLength},on:{click:function(t){e.periodLength="month"}}},[n("h5",[e._v("Monthly")])])]),n("li",{staticClass:"nav-item aw-nav-item"},[n("a",{staticClass:"nav-link aw-nav-link",class:{active:"year"==e.periodLength},on:{click:function(t){e.periodLength="year"}}},[n("h5",[e._v("Yearly")])])])]),n("aw-summaryview",{attrs:{period:e.period}})],1)},[],!1,null,"2b31c794",null);t.default=f.exports}}]);
//# sourceMappingURL=6.47f83561061521d2eb19.js.map