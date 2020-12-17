!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var r=t();for(var s in r)("object"==typeof exports?exports:e)[s]=r[s]}}(this,(function(){return function(e){var t={};function r(s){if(t[s])return t[s].exports;var a=t[s]={i:s,l:!1,exports:{}};return e[s].call(a.exports,a,a.exports,r),a.l=!0,a.exports}return r.m=e,r.c=t,r.d=function(e,t,s){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(r.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)r.d(s,a,function(t){return e[t]}.bind(null,a));return s},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){"use strict";var s=this&&this.__assign||function(){return(s=Object.assign||function(e){for(var t,r=1,s=arguments.length;r<s;r++)for(var a in t=arguments[r])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)};t.__esModule=!0,t.PlayerSdk=void 0;var a=function(){function e(t,r){var s=this;this.iframe=null,this.playerReady=!1,this.onceReadyCallbacks=[],this.userEventListeners=[],this.playerOrigin=null,this.postMessageCallbacks={},this.sdkPlayerId=e.nextSdkPlayerId++,this.sdkOrigin=window.location.protocol+"//"+window.location.host;var a=document.querySelector(t);if(null==a)throw new Error("No match found for selector "+t);this.iframe="IFRAME"!==a.tagName?this.createIframe(a):a,r=r||{},this.iframeUrl=r.iframeUrl||e.DEFAULT_IFRAME_URL,this.iframe.src?this.bindExistingPlayer(this.iframe):this.createNewPlayer(this.iframe,r),this.onceReadyCallbacks=[],this.userEventListeners=[],this.playerReady=!1,this.playerOrigin=new URL(this.iframeUrl).origin,window.addEventListener("message",(function(e){var t;e.origin===s.playerOrigin&&(null===(t=e.data)||void 0===t?void 0:t.sdkPlayerId)==s.sdkPlayerId&&(e.data.callbackId&&s.postMessageCallbacks[e.data.callbackId]?s.postMessageCallbacks[e.data.callbackId](e.data.arg):s.onEvent(e.data))}),!1)}return e.prototype.createNewPlayer=function(e,t){var r=this.iframeUrl.replace("${id}",t.id).replace("${type}",t.live?"live":"vod");this.setIframeSrc(e,this.addParametersInIframeHash(r+"?"+this.urlParametersFromOptions(t)))},e.prototype.bindExistingPlayer=function(e){this.setIframeSrc(e,this.addParametersInIframeHash(e.src))},e.prototype.addParametersInIframeHash=function(e){return e=this.addParameterInIframeHash(e,"sdkPlayerId",""+this.sdkPlayerId),e=this.addParameterInIframeHash(e,"sdkOrigin",btoa(this.sdkOrigin)),e=this.addParameterInIframeHash(e,"api")},e.prototype.addParameterInIframeHash=function(e,t,r){var s=e.indexOf("#"),a=r?t+":"+r:t;if(-1===s)return e+"#"+a;var o=e.substr(0,s),n=e.substr(s+1);return o+"#"+a+";"+(n=n.replace(new RegExp(t+"(:[^;]+)?;?"),""))},e.prototype.play=function(){this.postMessage({message:"play"})},e.prototype.pause=function(){this.postMessage({message:"pause"})},e.prototype.mute=function(){this.postMessage({message:"mute"})},e.prototype.unmute=function(){this.postMessage({message:"unmute"})},e.prototype.seek=function(e){this.postMessage({message:"seek",seek:e})},e.prototype.setCurrentTime=function(e){this.postMessage({message:"setCurrentTime",currentTime:e})},e.prototype.setVolume=function(e){this.postMessage({message:"setVolume",volume:e})},e.prototype.setLoop=function(e){this.postMessage({message:"setLoop",loop:e})},e.prototype.getPaused=function(e){this.postMessage({message:"getPaused"},e)},e.prototype.getMuted=function(e){this.postMessage({message:"getMuted"},e)},e.prototype.getDuration=function(e){this.postMessage({message:"getDuration"},e)},e.prototype.getCurrentTime=function(e){this.postMessage({message:"getCurrentTime"},e)},e.prototype.getVolume=function(e){this.postMessage({message:"getVolume"},e)},e.prototype.getLoop=function(e){this.postMessage({message:"getLoop"},e)},e.prototype.addEventListener=function(e,t){this.userEventListeners.push({event:e,callback:t})},e.prototype.destroy=function(){var e=this;this.postMessage({message:"destroy"}),setTimeout((function(){var t,r;return null===(r=null===(t=e.iframe)||void 0===t?void 0:t.parentElement)||void 0===r?void 0:r.removeChild(e.iframe)}),0)},e.prototype.urlParametersFromOptions=function(e){return e.ts=(new Date).getTime(),Object.keys(e).map((function(t){return t+"="+e[t]})).join("&")},e.prototype.onEvent=function(e){switch(this.userEventListeners.filter((function(t){return t.event===e.type})).forEach((function(e){return e.callback()})),e.type){case"sdkSync":this.onReady()}},e.prototype.onReady=function(){this.playerReady||(this.playerReady=!0,this.onceReadyCallbacks.forEach((function(e){e()})))},e.prototype.postMessage=function(e,t){var r,a=this;if(this.playerOrigin&&(null===(r=this.iframe)||void 0===r?void 0:r.contentWindow)){var o=s(s({},e),{sdkPlayerId:this.sdkPlayerId});if(t){var n=this.makeId(16);this.postMessageCallbacks[n]=t,o.callbackId=n}this.playerReady&&this.playerOrigin?this.iframe.contentWindow.postMessage(o,this.playerOrigin):this.onceReadyCallbacks.push((function(){var e,t;return a.playerOrigin&&(null===(t=null===(e=a.iframe)||void 0===e?void 0:e.contentWindow)||void 0===t?void 0:t.postMessage(o,a.playerOrigin))}))}},e.prototype.makeId=function(e){for(var t="",r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",s=r.length,a=0;a<e;a++)t+=r.charAt(Math.floor(Math.random()*s));return t},e.prototype.createIframe=function(e){var t=document.createElement("iframe");return t.style.height="100%",t.style.width="100%",t.allowFullscreen=!0,e.appendChild(t),t},e.prototype.setIframeSrc=function(e,t){e.src=t},e.DEFAULT_IFRAME_URL="https://embed.api.video/${type}/${id}",e.nextSdkPlayerId=1,e}();t.PlayerSdk=a}])}));