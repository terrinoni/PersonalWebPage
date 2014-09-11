/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.unified.ShellOverlay");jQuery.sap.require("sap.ui.unified.library");jQuery.sap.require("sap.ui.core.Control");sap.ui.core.Control.extend("sap.ui.unified.ShellOverlay",{metadata:{library:"sap.ui.unified",defaultAggregation:"content",aggregations:{"content":{type:"sap.ui.core.Control",multiple:true,singularName:"content"},"search":{type:"sap.ui.core.Control",multiple:false}},associations:{"shell":{type:"sap.ui.unified.Shell",multiple:false}},events:{"closed":{}}}});sap.ui.unified.ShellOverlay.M_EVENTS={'closed':'closed'};jQuery.sap.require("sap.ui.core.Popup");jQuery.sap.require("sap.ui.Device");jQuery.sap.require("sap.ui.unified.Shell");jQuery.sap.require("jquery.sap.script");
sap.ui.unified.ShellOverlay.prototype.open=function(){if(this._getPopup().isOpen()){return}this._opening=true;this._forceShellHeaderVisible();this._getPopup().setModal(true,sap.ui.core.Popup.blStack.length==0&&this._getAnimActive()?"sapUiUfdShellOvrlyBly sapUiUfdShellOvrlyBlyTp":"");this._getPopup().open(0,sap.ui.core.Popup.Dock.BeginTop,sap.ui.core.Popup.Dock.BeginTop,window,"0 0","none");var s=this.getSearch();if(s){s.focus()}this._opening=false;if(this._getAnimActive()){jQuery.sap.delayedCall(50,this,function(){jQuery.sap.byId("sap-ui-blocklayer-popup").toggleClass("sapUiUfdShellOvrlyBlyTp",false)})}jQuery.sap.delayedCall(this._getAnimDuration(true),this,function(){this.$().toggleClass("sapUiUfdShellOvrlyOpening",false)})};
sap.ui.unified.ShellOverlay.prototype.close=function(){if(!this._getPopup().isOpen()){return}this.$().toggleClass("sapUiUfdShellOvrlyCntntHidden",true).toggleClass("sapUiUfdShellOvrlyClosing",true);this._setSearchWidth();jQuery.sap.delayedCall(Math.max(this._getAnimDuration(false)-this._getBLAnimDuration(),0),this,function(){var b=jQuery.sap.byId("sap-ui-blocklayer-popup");if(sap.ui.core.Popup.blStack.length==1&&this._getAnimActive()&&b.hasClass("sapUiUfdShellOvrlyBly")){b.toggleClass("sapUiUfdShellOvrlyBlyTp",true)}});jQuery.sap.delayedCall(this._getAnimDuration(false),this,function(){this._getPopup().close(0);this.$().remove();this._forceShellHeaderVisible();this.fireClosed()})};
sap.ui.unified.ShellOverlay.prototype.setShell=function(s){return this.setAssociation("shell",s,true)};
sap.ui.unified.ShellOverlay.prototype.setSearch=function(s){this.setAggregation("search",s,true);if(!!this.getDomRef()){this._headRenderer.render()}return this};
sap.ui.unified.ShellOverlay.prototype.insertContent=function(c,i){var r=this.insertAggregation("content",c,i,true);if(!!this.getDomRef()){this._contentRenderer.render()}return r};
sap.ui.unified.ShellOverlay.prototype.addContent=function(c){var r=this.addAggregation("content",c,true);if(!!this.getDomRef()){this._contentRenderer.render()}return r};
sap.ui.unified.ShellOverlay.prototype.removeContent=function(i){var r=this.removeAggregation("content",i,true);if(!!this.getDomRef()){this._contentRenderer.render()}return r};
sap.ui.unified.ShellOverlay.prototype.removeAllContent=function(){var r=this.removeAllAggregation("content",true);if(!!this.getDomRef()){this._contentRenderer.render()}return r};
sap.ui.unified.ShellOverlay.prototype.destroyContent=function(){var r=this.destroyAggregation("content",true);if(!!this.getDomRef()){this._contentRenderer.render()}return r};
sap.ui.unified.ShellOverlay.prototype.init=function(){this._animOpenDuration=-1;this._animCloseDuration=-1;this._animBlockLayerDuration=-1;this._animation=sap.ui.getCore().getConfiguration().getAnimation();this._opening=false;var t=this;this._headRenderer=new sap.ui.unified._ContentRenderer(this,this.getId()+"-hdr-center",function(r){sap.ui.unified.ShellOverlayRenderer.renderSearch(r,t)});this._contentRenderer=new sap.ui.unified._ContentRenderer(this,this.getId()+"-cntnt",function(r){sap.ui.unified.ShellOverlayRenderer.renderContent(r,t)})};
sap.ui.unified.ShellOverlay.prototype.exit=function(){if(this._popup){this._popup.close(0);this._popup.destroy();this._popup=null}this._getPopup=function(){return null};this._headRenderer.destroy();delete this._headRenderer;this._contentRenderer.destroy();delete this._contentRenderer};
sap.ui.unified.ShellOverlay.prototype.onAfterRendering=function(){if(this._opening){this._setSearchWidth()}jQuery.sap.delayedCall(10,this,function(){this.$().toggleClass("sapUiUfdShellOvrlyCntntHidden",false);this.$("search").css("width","")})};
sap.ui.unified.ShellOverlay.prototype.onclick=function(e){if(jQuery(e.target).attr("id")===this.getId()+"-close"){this.close()}};
sap.ui.unified.ShellOverlay.prototype.onThemeChanged=function(){this._animOpenDuration=-1;this._animCloseDuration=-1;this._animBlockLayerDuration=-1};
sap.ui.unified.ShellOverlay.prototype._getAnimDurationThemeParam=function(p,c){var v=parseInt(sap.ui.core.theming.Parameters.get(p),10);if(!this._getAnimActive()&&c){v=0}return v};
sap.ui.unified.ShellOverlay.prototype._getAnimDuration=function(o){if((o&&this._animOpenDuration==-1)||(!o&&this._animCloseDuration==-1)){var t=o?"Open":"Close";this["_anim"+t+"Duration"]=this._getAnimDurationThemeParam("sapUiUfdShellOvrly"+t+"AnimOverAll",true)}return o?this._animOpenDuration:this._animCloseDuration};
sap.ui.unified.ShellOverlay.prototype._getBLAnimDuration=function(){if(this._animBlockLayerDuration==-1){this._animBlockLayerDuration=this._getAnimDurationThemeParam("sapUiUfdShellOvrlyBlockLayerAnimDuration",true)}return this._animBlockLayerDuration};
sap.ui.unified.ShellOverlay.prototype._getAnimActive=function(){if(!this._animation||(sap.ui.Device.browser.internet_explorer&&sap.ui.Device.browser.version<10)){return false}return true};
sap.ui.unified.ShellOverlay.prototype._getPopup=function(){if(!this._popup){this._popup=new sap.ui.core.Popup(this,true,false,false);this._popup._applyPosition=function(p){this._$().css("left","0").css("top","0");this._oLastPosition=p;this._oLastOfRect=jQuery(window).rect()};this._popup.attachOpened(function(){sap.ui.unified._iNumberOfOpenedShellOverlays++});this._popup.attachClosed(function(){sap.ui.unified._iNumberOfOpenedShellOverlays--})}return this._popup};
sap.ui.unified.ShellOverlay.prototype._getShell=function(){var i=this.getShell();if(!i){return}var s=sap.ui.getCore().byId(i);if(!s||!(s instanceof sap.ui.unified.Shell)){return}return s};
sap.ui.unified.ShellOverlay.prototype._forceShellHeaderVisible=function(){var s=this._getShell();if(s){s._doShowHeader(true)}};
sap.ui.unified.ShellOverlay.prototype._getSearchWidth=function(){var s=this.getShell();if(!s){return-1}var S=jQuery.sap.byId(s+"-hdr-center").children();if(S.length){return S.width()}return-1};
sap.ui.unified.ShellOverlay.prototype._setSearchWidth=function(){var w=this._getSearchWidth();if(w<=0){return}var W=w+"px";if(sap.ui.Device.browser.safari){var t=this.$("hdr-center").width();if(t>w){W=Math.round((w*100)/t)+"%"}else{W="100%"}}this.$("search").css("width",W)};
