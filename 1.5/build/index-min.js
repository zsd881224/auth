/*! auth - v1.5 - 2013-08-25 9:38:38 PM
* Copyright (c) 2013 张挺/明河; Licensed  */
KISSY.add("gallery/auth/1.5/lib/rule/rule",function(a,b,c){function d(b,c,e){var f=this;return a.isString(b)&&a.isFunction(c)?(a.isObject(e)||(e={args:[]}),a.mix(e,{name:b,validation:c}),d.superclass.constructor.call(f,e),void 0):f}return a.extend(d,b,{validate:function(){var b=this,c=b.get("validation"),d=b._getArgs(),e=b.get("_defer"),f=c.apply(b,d);if(a.isBoolean(f)){var g=f;return f=e.promise,e[g&&"resolve"||"reject"](b),f}return f},msg:function(b,c){var d=this;if(!a.isString(b)&&!a.isString(c))return d;var e=d.get("msg");return c?(e[b]=c,c):e[b]},_getArgs:function(){var a=this,b=new c.Defer,d=a.get("field"),e=[a.get("value"),a.get("propertyValue"),b,d];return a.set("_defer",b),e}},{ATTRS:{name:{value:""},value:{value:"",getter:function(a){var b=this.get("target");return b.length?b.val():a}},propertyValue:{value:"",getter:function(a){var b=this.get("target");return b.length?b.attr(this.get("name")):a}},msg:{value:{error:"",success:""}},validation:{value:function(){}},target:{value:""},field:{value:""},_defer:{value:""}}}),d},{requires:["base","promise"]}),KISSY.add("gallery/auth/1.5/lib/rule/default",function(a){return{required:function(b){this.msg("error")||this.msg("error","\u4e0d\u53ef\u4ee5\u4e3a\u7a7a\uff01");var c=this.get("target"),d=["radio","checkbox"];if(a.inArray(c.attr("type"),d)){var e=!1;return c.each(function(a){return a.prop("checked")?(e=!0,!1):void 0}),e}return!!a.trim(b)},pattern:function(a,b){return new RegExp(b).test(a)},max:function(a,b){this.msg("error")||this.msg("error","\u5fc5\u987b\u5c0f\u4e8e"+b);var c=this.get("target");return"checkbox"==c.attr("type")&&(a=0,c.each(function(b){b.prop("checked")&&a++}),this.msg("error")||this.msg("error","\u6700\u591a\u53ea\u80fd\u9009\u62e9"+b+"\u9879")),Number(a)<=Number(b)},min:function(a,b){this.msg("error")||this.msg("error","\u5fc5\u987b\u5927\u4e8e"+b);var c=this.get("target");return"checkbox"==c.attr("type")&&(a=0,c.each(function(b){b.prop("checked")&&a++}),this.msg("error")||this.msg("error","\u6700\u5c0f\u5fc5\u987b\u9009\u62e9"+b+"\u9879")),Number(a)>=Number(b)},step:function(b,c){return a.isNumber(b)?0==b||1==c?!0:b%c:!1},equal:function(b,c){return this.msg("error")||this.msg("error","\u503c\u5fc5\u987b\u7b49\u4e8e"+c),a.trim(c)===a.trim(b)},"equal-field":function(b,c){this.msg("error")||this.msg("error","\u4e8c\u4e2a\u5b57\u6bb5\u503c\u5fc5\u987b\u76f8\u540c\uff01");var d=this.get("field"),e=d.get("host");if(!e)return!1;var f=e.getField(c);if(!f)return!1;var g=f.get("target").val();return a.trim(g)===a.trim(b)},number:function(b){return this.msg("error")||this.msg("error","\u5fc5\u987b\u662f\u6570\u5b57"),/^([+-]?)\\d*\\.?\\d+$/.test(a.trim(b))},email:function(b){return this.msg("error")||this.msg("error","\u90ae\u7bb1\u683c\u5f0f\u4e0d\u5408\u6cd5"),/^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$/.test(a.trim(b))},mobile:function(b){return this.msg("error")||this.msg("error","\u624b\u673a\u53f7\u7801\u683c\u5f0f\u4e0d\u5408\u6cd5"),/^(13|15)[0-9]{9}$/.test(a.trim(b))},date:function(b){return this.msg("error")||this.msg("error","\u65e5\u671f\u683c\u5f0f\u4e0d\u5408\u6cd5"),/^(?:(?!0000)[0-9]{4}([-/.]?)(?:(?:0?[1-9]|1[0-2])\1(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])\1(?:29|30)|(?:0?[13578]|1[02])\1(?:31))|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)([-/.]?)0?2\2(?:29))$/.test(a.trim(b))}}}),KISSY.add("gallery/auth/1.5/lib/rule/ruleFactory",function(a,b,c,d,e){var f=function(){var a=this;f.superclass.constructor.call(a)};return f.rules={},a.mix(f.rules,e),a.mix(f,{register:function(b,c){a.isObject(b)?a.mix(f.rules,b):f.rules[b]=c},create:function(a,b){return new d(a,f.rules[a],b)}}),f},{requires:["node","base","./rule","./default"]}),KISSY.add("gallery/auth/1.5/lib/msg/base",function(a,b,c,d){function e(a){var b=this;a||(a={}),e.superclass.constructor.call(b,a)}var f=c.all,g=".auth-msg";return a.extend(e,b,{render:function(){var a=this,b=a.get("target");if(!b.length)return!1;var c=a._getWrapper();a.set("wrapper",c);var d=a.get("isExist");d||c.hide();var e=a.get("host");e.on("error",function(b){var c=b.rule,d=c.msg("error"),e="error";a.show({style:e,msg:d})}),e.on("success",function(b){var c=b.msg,d=b.style;c||d?(d=b.style||"success",a.show({style:d,msg:c})):a.hide()})},hide:function(){var b=this,c=b.get("wrapper");a.buffer(function(){c.slideUp(b.get("speed"))},50)()},show:function(b){var c=this,d=c.get("wrapper");a.buffer(function(){c._create(b),d.slideDown(c.get("speed"))},50)()},_create:function(a){var b=this,c=b.get("tpl"),e=b.get("wrapper"),f=new d(c).render(a);return e.html(f)},_getWrapper:function(){var a=this,b=a.get("wrapper"),c=a.get("target");if(!c.length)return a;var d=c.attr("msg-wrapper");if(d&&(b=f(d)),!b||!b.length){if(c.length>1){c=c.item(c.length-1);var e=f(c.parent());(e.hasClass("radio")||e.hasClass("checkbox"))&&(c=c.parent())}var e=f(c.parent());b=f('<div class="msg-wrapper"></div>').appendTo(e)}return b}},{ATTRS:{host:{value:""},target:{value:"",getter:function(a){return f(a)}},tpl:{value:'<p class="auth-msg auth-{{style}}">{{msg}}</p>'},wrapper:{value:"",getter:function(a){return f(a)}},isExist:{value:!1,getter:function(){var a=this,b=a.get("wrapper");return b.length?b.all(g).length:!1}},speed:{value:.3}}}),e},{requires:["base","node","xtemplate"]}),KISSY.add("gallery/auth/1.5/lib/utils",function(S,DOM,undefined){var Utils={toJSON:function(cfg){cfg=cfg.replace(/'/g,'"');try{eval("cfg="+cfg)}catch(e){S.log("data-valid json is invalid")}return cfg},guid:function(){return"AUTH_"+S.guid()},getEvent:function(a){var b="blur",c=DOM.attr(a,"type");switch(c){case"select":b="change";break;case"select-multiple":case"radio":b="click";break;case"checkbox":b="click";break;default:b="blur"}return b},getValue:function(a){var b=[],c=DOM.attr(a,"type");switch(c){case"select-multiple":S.each(a.options,function(a){a.selected&&b.push(a.value)});break;case"radio":case"checkbox":S.each(a,function(a){a.checked&&b.push(a.value)});break;default:b=DOM.val(a)}return b}};return Utils},{requires:["dom"]}),KISSY.add("gallery/auth/1.5/lib/field/field",function(a,b,c,d,e,f,g,h,i,j){function k(b){var c=g.rules,d={};return a.each(c,function(a,c){b.attr(c)&&(d[c]={msg:{error:b.attr(c+"-msg"),success:b.attr(c+"-success-msg")||"",warn:b.attr(c+"-warn-msg")||""},propertyValue:b.attr(c)})}),d}function l(b){var c={};if(b=n(b),!b||!b.length)return c;var d=k(b);a.isEmptyObject(d)||(c.rules=d);var e=b.attr("auth-event");return e&&(c.event=e),c}function m(b,c){var d=this;d._validateDone={},d._cache={};var e=l(b);return c=a.merge(q,c,e),d._cfg=c,a.mix(c,{target:b}),d._storage={},m.superclass.constructor.call(d,c),d._init(),d}var n=e.all,o="",p="data-field",q={event:"blur",style:{success:"ok",error:"error"}};return a.mix(m,{_defer:new f.Defer}),a.extend(m,c,{_init:function(){var b=this,c=b._cfg,d=a.merge({},c.rules);b._groupTarget(),b._renderMsg(),a.each(d,function(a,c){!b._storage[c]&&g.rules[c]&&b._createRule(c,a)});var e=b.get("target");e.data(p,b);var f=e.getDOMNode();b._targetBind(c.event||j.getEvent(f))},_groupTarget:function(){var b=this,c=b.get("target");if(a.inArray(c.attr("type"),["checkbox","radio"])){var d=c.attr("name");c=n(document.getElementsByName(d)),b.set("target",c)}return c},_targetBind:function(b){var c=this,d=c.get("target");return d.length?("select"==d.attr("type")&&(b+=" change"),d.on(b,function(){a.later(function(){c.validate()})}),c):!1},_renderMsg:function(){var a=this,b=a.get("msg");if(""==b){var c=a._cfg.msg||{};b=new i(c)}var d=a.get("target");return b.set("target",d),b.set("host",a),a.set("msg",b),b.render(),b},_createRule:function(b,c){var d=this,e=d.get("target");a.mix(c,{value:e.val(),target:e,field:d});var f=g.create(b,c);return d.add(b,f),f},add:function(b,c){var d=this,e=d._storage;return c instanceof h?e[b]=c:a.isFunction(c)&&(e[b]=new h(b,c,{el:d._el})),d.set("rules",e),d},remove:function(a){var b=this._storage;return delete b[a],self.set("rules",b),this},test:function(a){return this.validate(a)},validate:function(b){function c(a){if(p>=e.length)return k;var b=a;k=b.validate(),p++,k.then(function(){c(e[p])})}var d=this,e=[],g=d.get("rules");if(a.isString(b)){var h=b.split(",");a.each(h,function(a){g[a]&&e.push(g[a])})}else a.each(g,function(a){e.push(a)});var i=d.get("exclude");if(""!=i){var j=i.split(",");a.filter(e,function(b){return!a.inArray(b.get("name"),j)})}var k,l=m._defer;if(!e.length){var n=new f.Defer,o=n.promise;return o.then(function(){l.resolve(e),d.fire("success",{rules:e})}),n.resolve(),o}d.fire("beforeTest",{rules:e});var p=0;return c(e[p]),k.then(function(){l.resolve(e),d.fire("success",{rules:e})}).fail(function(a){l.reject(a),d.fire("error",{rule:a})}),k}},{ATTRS:{message:{value:o},result:{},target:{value:"",getter:function(a){return n(a)}},name:{value:""},event:{value:"",setter:function(a){var b=this;return b._targetBind(a),a}},host:{value:""},exclude:{value:""},rules:{value:{}},msg:{value:""}}}),m},{requires:["event","base","dom","node","promise","../rule/ruleFactory","../rule/rule","../msg/base","../utils"]}),KISSY.add("gallery/auth/1.5/lib/index",function(a,b,c,d,e,f,g,h){var i=b.all,j="data-field",k=function(b,c){var d=this;return c||(c={}),b&&a.mix(c,{target:b}),d._storages={},d.AuthConfig=c,k.superclass.constructor.call(d,c),d};return a.mix(k,{_defer:new e.Defer}),a.extend(k,d,{render:function(){var b=this,c=b.get("target");if(!c.length)return b;var d=c.getDOMNode().elements;return d.length?(a.each(d,function(c){var d=i(c),e=d.attr("type"),f=["BUTTON"],g=c.tagName;if(a.inArray(g,f))return!0;if("submit"==e)return!0;"SELECT"==g&&d.attr("type","select");var h=["radio","checkbox"];return a.inArray(e,h)&&d.data(j)?!0:(b.add(c),void 0)}),c.attr("novalidate","novalidate"),b._submit(),b):b},_submit:function(){var a=this,b=a.get("submitTest");if(!b)return a;var c=a.get("target");return c.on("submit",function(b){b.preventDefault(),a.test()}),a.on("success",function(){c.getDOMNode().submit()}),a},add:function(b,c){var d,e,g=this,j="";if(b instanceof f)d=b.get("target"),e=g.getName(d),j=g._storages[e||h.guid()]=b;else{var k=g.get("autoBind");if(d=i(b),!d.length)return!1;e=g.getName(d);var l={event:k?h.getEvent(d):"",host:g,name:e};a.mix(l,c),j=g._storages[e]=new f(d,c)}return j},getName:function(a){var b=this,c=h.guid();if(!a||!a.length)return c;var d=b.get("useId"),e=a.attr("id");return c=a.attr("name")||e,d&&(c=e),c},getField:function(a){return this._storages[a]},register:function(a,b){return g.register(a,b),this},test:function(a){return this.validate(a)},validate:function(a){function b(c){return g>=a.length?f:(f=c.test(),g++,f.then(function(){b(a[g])}).fail(function(){d||b(a[g])}),void 0)}var c=this;c.fire("beforeTest");var d=c.get("stopOnError"),e=k._defer;a=c._filterFields(a);var f,g=0;return b(a[g]),f.then(function(){e.resolve(a),c.fire("success",{fields:a})}).fail(function(a){e.reject(a),c.fire("error",{rule:a,field:a.get("field")})}),e.promise},_filterFields:function(b){var c=this,d=c.get("fields");if(b){var e=b.split(",");e.length>0&&(b=a.filter(d,function(b){return a.inArray(b.get("name"),e)}))}else b=d;return a.filter(b,function(b){var c=b.get("rules");return!a.isEmptyObject(c)})}},{ATTRS:{target:{value:"",getter:function(a){return i(a)}},rules:{value:{},getter:function(){return g.rules}},fields:{value:[],getter:function(){var b=this,c=b._storages,d=[];return a.each(c,function(a){d.push(a)}),d}},useId:{value:!1},autoBind:{value:!0},stopOnError:{value:!1},submitTest:{value:!0}}}),a.mix(k,{Field:f}),k},{requires:["node","json","base","promise","./field/field","./rule/ruleFactory","./utils"]}),KISSY.add("gallery/auth/1.5/index",function(a,b){return b},{requires:["./lib/index"]});