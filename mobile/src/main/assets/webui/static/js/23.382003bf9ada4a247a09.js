(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{822:function(e,t,n){"use strict";n.r(t);var s,r,a,u=n(98),c=n.n(u),i=n(149),o=n.n(i),l=n(150),h=n.n(l),d=n(714),v=n.n(d),f=n(750),p=n.n(f),k=n(0),w=n.n(k),m={name:"Timeline",mounted:function(){this.getBuckets()},data:function(){return{buckets:null,daterange:[w()().subtract(1,"hour"),w()()]}},watch:{daterange:function(){this.getBuckets()}},computed:{num_events:function(){return p()(this.buckets,"events.length")}},methods:{getBuckets:(a=o()(c.a.mark(function e(){var t=this;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.$aw.getBuckets();case 2:return this.buckets=e.sent,e.next=5,Promise.all(v()(this.buckets,function(){var e=o()(c.a.mark(function e(n){return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$aw.getEvents(n.id,{start:t.daterange[0].format(),end:t.daterange[1].format(),limit:-1});case 2:return n.events=e.sent,e.abrupt("return",n);case 4:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()));case 5:this.buckets=e.sent,this.buckets=h()(this.buckets,[function(e){return e.id}],["asc"]);case 7:case"end":return e.stop()}},e,this)})),function(){return a.apply(this,arguments)}),getBucketInfo:(r=o()(c.a.mark(function e(t){return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.$aw.getBucket(t);case 2:this.buckets[t]=e.sent;case 3:case"end":return e.stop()}},e,this)})),function(e){return r.apply(this,arguments)}),deleteBucket:(s=o()(c.a.mark(function e(t){return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("Deleting bucket "+t),e.next=3,this.$aw.deleteBucket(t);case 3:return e.next=5,this.getBuckets();case 5:case"end":return e.stop()}},e,this)})),function(e){return s.apply(this,arguments)})}},b=n(70),g=Object(b.a)(m,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("h2",[e._v("Timeline")]),n("input-timeinterval",{model:{value:e.daterange,callback:function(t){e.daterange=t},expression:"daterange"}}),n("div",{directives:[{name:"show",rawName:"v-show",value:null!==e.buckets,expression:"buckets !== null"}]},[n("div",[n("div",{staticStyle:{float:"left"}},[e._v("Events shown:  "+e._s(e.num_events))]),n("div",{staticStyle:{float:"right",color:"#999"}},[e._v("Drag to pan and scroll to zoom.")])]),n("div",{staticStyle:{clear:"both"}}),n("vis-timeline",{attrs:{buckets:e.buckets,showRowLabels:"",queriedInterval:e.daterange}})],1),n("div",{directives:[{name:"show",rawName:"v-show",value:!(null!==e.buckets&&e.num_events),expression:"!(buckets !== null && num_events)"}]},[n("h1",[e._v("Loading...")])])],1)},[],!1,null,null,null);t.default=g.exports}}]);
//# sourceMappingURL=23.382003bf9ada4a247a09.js.map