(function(i,o){typeof exports=="object"&&typeof module<"u"?module.exports=o():typeof define=="function"&&define.amd?define(o):(i=typeof globalThis<"u"?globalThis:i||self,i["adv-waiter"]=o())})(this,function(){"use strict";/**
 * adv-waiter.js
 *
 * @module      : adv-waiter
 * @description : This software is a JavaScript library that provides a couple of wait functions
 *                to simplify the source code and make it more readable.
 * @version     : 1.1.8
 * @author      : Shin Nagamine
 * @license     : Released under the MIT license.
 *                https://opensource.org/licenses/MIT
 */async function i(t,e){const c=t&&isFinite(t)?t:100,n=e||(t&&typeof t=="object"?t:{}),f=n.while&&typeof n.while=="function"?n.while:null,a=n.until&&typeof n.until=="function"?n.until:null,w=n.callback&&typeof n.callback=="function"?n.callback:null,d=n.onWaiting&&typeof n.onWaiting=="function"?n.onWaiting:null;let l=null;if(f||a){async function y(T,p){let u;const b=async()=>(u=await T(),(()=>{const s=n.existsIn;return s?Array.isArray(s)?s.includes(u):s===u:!!u})()===p),m=n.onTimeout&&typeof n.onTimeout=="function"?n.onTimeout:null,k=Date.now();for(;await b();){if(h(k,n.timeout))return m&&m(),!1;await r(c,d)}return u}f?l=await y(f,!0):a&&(l=await y(a,!1))}else await r(c,d),l=!0;return w&&w(),l}const o={wait:i};function h(t,e){return e&&Date.now()-t>=e}function r(t,e){return e&&e(),new Promise(c=>{setTimeout(()=>{c()},t)})}return o});
