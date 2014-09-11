/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./DataType','./Metadata'],function(q,D,M){"use strict";var b=function(c,C){M.apply(this,arguments)};b.prototype=q.sap.newObject(M.prototype);b.prototype.applySettings=function(c){var s=c.metadata;M.prototype.applySettings.call(this,c);var r=/(children|ies|ves|oes|ses|ches|shes|xes|s)$/i;var S={'children':-3,'ies':'y','ves':'f','oes':-2,'ses':-2,'ches':-2,'shes':-2,'xes':-2,'s':-1};function n(i,e,o){var N,I;i=i||{};for(N in i){I=i[N];if(e&&typeof I!=="object"){I={};I[e]=i[N]}I=q.extend({},o,I);I.name=N;if(I.multiple===true&&!I.singularName){I.singularName=N.replace(r,function($,p){var R=S[p.toLowerCase()];return typeof R==="string"?R:p.slice(0,R)})}i[N]=I}return i}function f(i,p){var R={},N;for(N in i){if(p===(i[N].visibility==='public')){R[N]=i[N]}}return R}var a=/([a-z][^.]*(?:\.[a-z][^.]*)*)\./;function d(N){var m=a.exec(N);return(m&&m[1])||""}this._sLibraryName=s.library||d(this.getName());this._mProperties=n(s.properties,"type",{type:"string",group:"Misc"});var A=n(s.aggregations,"type",{type:"sap.ui.core.Control",multiple:true,visibility:'public'});this._mAggregations=f(A,true);this._mPrivateAggregations=f(A,false);this._sDefaultAggregation=s.defaultAggregation||null;this._mAssociations=n(s.associations,"type",{type:"sap.ui.core.Control",multiple:false});this._mEvents=n(s.events,null,{allowPreventDefault:false});this._bEnriched=false;if(c.metadata.__version>1.0){this.generateAccessors()}};b.prototype.afterApplySettings=function(){M.prototype.afterApplySettings.call(this);var p=this.getParent();if(p&&p instanceof b){this._mAllEvents=q.extend({},p._mAllEvents,this._mEvents);this._mAllProperties=q.extend({},p._mAllProperties,this._mProperties);this._mAllPrivateAggregations=q.extend({},p._mAllPrivateAggregations,this._mPrivateAggregations);this._mAllAggregations=q.extend({},p._mAllAggregations,this._mAggregations);this._mAllAssociations=q.extend({},p._mAllAssociations,this._mAssociations);this._sDefaultAggregation=this._sDefaultAggregation||p._sDefaultAggregation;if(p._mHiddenAggregations){this._mHiddenAggregations=q.extend({},p._mHiddenAggregations)}}else{this._mAllEvents=this._mEvents;this._mAllProperties=this._mProperties;this._mAllPrivateAggregations=this._mPrivateAggregations;this._mAllAggregations=this._mAggregations;this._mAllAssociations=this._mAssociations}};b.Kind={PROPERTY:0,SINGLE_AGGREGATION:1,MULTIPLE_AGGREGATION:2,SINGLE_ASSOCIATION:3,MULTIPLE_ASSOCIATION:4,EVENT:5};b.prototype.getLibraryName=function(){return this._sLibraryName};b.prototype.isAbstract=function(){return this._bAbstract};b.prototype.addProperty=function(n,i){i.name=n;this._mProperties[n]=i;if(!this._mAllProperties[n]){this._mAllProperties[n]=i}if(this._bEnriched){this._enrichChildInfos()}};b.prototype.hasProperty=function(n){return!!this._mAllProperties[n]};b.prototype.getProperties=function(){return this._mProperties};b.prototype.getAllProperties=function(){return this._mAllProperties};b.prototype.getAggregations=function(){return this._mAggregations};b.prototype.hasAggregation=function(n){return!!this._mAllAggregations[n]};b.prototype.getAllAggregations=function(){return this._mAllAggregations};b.prototype.getAllPrivateAggregations=function(){return this._mAllPrivateAggregations};b.prototype.getManagedAggregation=function(a){return this._mAllAggregations[a]||this._mAllPrivateAggregations[a]};b.prototype.getDefaultAggregationName=function(){return this._sDefaultAggregation};b.prototype.getDefaultAggregation=function(){return this._sDefaultAggregation&&this.getAllAggregations()[this._sDefaultAggregation]};b.prototype.getAssociations=function(){return this._mAssociations};b.prototype.hasAssociation=function(n){return!!this._mAllAssociations[n]};b.prototype.getAllAssociations=function(){return this._mAllAssociations};b.prototype.getEvents=function(){return this._mEvents};b.prototype.hasEvent=function(n){return!!this._mAllEvents[n]};b.prototype.getAllEvents=function(){return this._mAllEvents};b.prototype.getPropertyDefaults=function(){var d=this._mDefaults,t;if(d){return d}if(this.getParent()instanceof b){d=q.sap.newObject(this.getParent().getPropertyDefaults())}else{d={}}for(var s in this._mProperties){if(this._mProperties[s].defaultValue!==null){d[s]=this._mProperties[s].defaultValue}else{t=D.getType(this._mProperties[s].type);if(t instanceof D){d[s]=t.getDefaultValue()}else{for(var i in t){d[s]=t[i];break}}}}return(this._mDefaults=d)};b.prototype.createPropertyBag=function(){if(!this._fnPropertyBagFactory){this._fnPropertyBagFactory=q.sap.factory(this.getPropertyDefaults())}return new(this._fnPropertyBagFactory)()};b.prototype._enrichChildInfos=function(){if(this._bEnriched){return}if(this.getParent()instanceof b){this.getParent()._enrichChildInfos()}var m,n,i;function a(p,n){return p+n.substring(0,1).toUpperCase()+n.substring(1)}m=this._mProperties;for(n in m){i=m[n];i._sName=n;i._sUID=n;i._oParent=this;i._iKind=b.Kind.PROPERTY;i._sMutator=a("set",n);i._sGetter=a("get",n)}m=this._mAggregations;for(n in m){i=m[n];i._sName=n;i._sUID="aggregation:"+n;i._oParent=this;i._sDestructor=a("destroy",n);i._sGetter=a("get",n);if(i.multiple){i._iKind=b.Kind.MULTIPLE_AGGREGATION;i._sMutator=a("add",i.singularName);i._sRemoveMutator=a("remove",i.singularName);i._sRemoveAllMutator=a("removeAll",n)}else{i._iKind=b.Kind.SINGLE_AGGREGATION;i._sMutator=a("set",n)}}m=this._mAssociations;for(n in m){i=m[n];i._sName=n;i._sUID="association:"+n;i._oParent=this;i._sGetter=a("get",n);if(i.multiple){i._iKind=b.Kind.MULTIPLE_ASSOCIATION;i._sMutator=a("add",i.singularName)}else{i._iKind=b.Kind.SINGLE_ASSOCIATION;i._sMutator=a("set",n)}}m=this._mEvents;for(n in m){i=m[n];i._sName=n;i._sUID="event:"+n;i._oParent=this;i._iKind=b.Kind.EVENT;i._sMutator=a("attach",n)}this._bEnriched=true};b.prototype.getJSONKeys=function(){if(this._mJSONKeys){return this._mJSONKeys}this._enrichChildInfos();var j={};function a(m){var n,i;for(n in m){i=m[n];if(!j[n]||i._iKind<j[n]._iKind){j[n]=i};j[i._sUID]=i}}a(this.getAllProperties());a(this.getAllAggregations());a(this.getAllAssociations());a(this.getAllEvents());return(this._mJSONKeys=j)};b.prototype.generateAccessors=function(){var c=this;var e=this.getClass().prototype;function g(p,n,f,d){var n=p+n.substring(0,1).toUpperCase()+n.substring(1);if(!e[n]){e[n]=d?function(){q.sap.log.warning("Usage of deprecated feature: "+c.getName()+"."+n);return f.apply(this,arguments)}:f;c._aPublicMethods.push(n)}}q.each(this._mProperties,function(n,i){g("get",n,function(){return this.getProperty(n)});g("set",n,function(v){this.setProperty(n,v);return this},i.deprecated);if(i.bindable){g("bind",n,function(p,f,m){this.bindProperty(n,p,f,m);return this},i.deprecated);g("unbind",n,function(p){this.unbindProperty(n,p);return this})}});q.each(this._mAggregations,function(n,d){if(!d.multiple){g("get",n,function(){return this.getAggregation(n)});g("set",n,function(v){this.setAggregation(n,v);return this},d.deprecated)}else{var h=d.singularName;g("get",n,function(){return this.getAggregation(n,[])});g("add",h,function(a){this.addAggregation(n,a);return this},d.deprecated);g("insert",h,function(i,a){this.insertAggregation(n,i,a);return this},d.deprecated);g("remove",h,function(a){return this.removeAggregation(n,a)});g("removeAll",n,function(){return this.removeAllAggregation(n)});g("indexOf",h,function(a){return this.indexOfAggregation(n,a)})}g("destroy",n,function(){this.destroyAggregation(n);return this});if(d.bindable){g("bind",n,function(p,t,s,f){this.bindAggregation(n,p,t,s,f);return this},d.deprecated);g("unbind",n,function(p){this.unbindAggregation(n,p);return this})}});q.each(this._mAssociations,function(n,i){if(!i.multiple){g("get",n,function(){return this.getAssociation(n)});g("set",n,function(v){this.setAssociation(n,v);return this},i.deprecated)}else{var d=i.singularName;g("get",n,function(){return this.getAssociation(n,[])});g("add",d,function(a){this.addAssociation(n,a);return this},i.deprecated);g("remove",d,function(a){return this.removeAssociation(n,a)});g("removeAll",n,function(){return this.removeAllAssociation(n)})}});q.each(this._mEvents,function(n,i){g("attach",n,function(d,f,o){this.attachEvent(n,d,f,o);return this},i.deprecated);g("detach",n,function(f,o){this.detachEvent(n,f,o);return this});var a=!!i.allowPreventDefault;var h=!!i.enableEventBubbling;g("fire",n,function(p){return this.fireEvent(n,p,a,h)})})};(function(){var u={};function a(i){i=sap.ui.getCore().getConfiguration().getUIDPrefix()+i;u[i]=u[i]||0;return(i+u[i]++)}b.uid=a;b.prototype.uid=function(){var i=this._sUIDToken;if(typeof i!=="string"){i=this.getName();i=i.slice(i.lastIndexOf('.')+1);i=i.replace(/([a-z])([A-Z])/g,"$1 $2").split(" ").slice(-1)[0];i=this._sUIDToken=i.replace(/([^A-Za-z0-9-_.:])|([0-9]+$)/g,"").toLowerCase()}return a(i)}}());return b},true);
