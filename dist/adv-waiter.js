(function(e,o){typeof exports=="object"&&typeof module<"u"?o(exports):typeof define=="function"&&define.amd?define(["exports"],o):(e=typeof globalThis<"u"?globalThis:e||self,o(e["adv-waiter"]={}))})(this,function(e){"use strict";/**
 * adv-waiter.js
 *
 * @module      : adv-waiter
 * @description : This software is a JavaScript library that provides a couple of wait functions
 *                to simplify the source code and make it more readable.
 * @version     : 1.1.10
 * @author      : Shin Nagamine
 * @license     : Released under the MIT license.
 *                https://opensource.org/licenses/MIT
 */async function o(t,i){const c=t&&isFinite(t)?t:100,n=i||(t&&typeof t=="object"?t:{}),f=n.while&&typeof n.while=="function"?n.while:null,s=n.until&&typeof n.until=="function"?n.until:null,w=n.callback&&typeof n.callback=="function"?n.callback:null,d=n.onWaiting&&typeof n.onWaiting=="function"?n.onWaiting:null;let l=null;if(f||s){async function y(b,p){let u;const _=async()=>(u=await b(),(()=>{const a=n.existsIn;return a?Array.isArray(a)?a.includes(u):a===u:!!u})()===p),m=n.onTimeout&&typeof n.onTimeout=="function"?n.onTimeout:null,g=Date.now();for(;await _();){if(h(g,n.timeout))return m&&m(),!1;await r(c,d)}return u}f?l=await y(f,!0):s&&(l=await y(s,!1))}else await r(c,d),l=!0;return w&&w(),l}const T={wait:o};function h(t,i){return i&&Date.now()-t>=i}function r(t,i){return i&&i(),new Promise(c=>{setTimeout(()=>{c()},t)})}e.default=T,e.wait=o,Object.defineProperties(e,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
