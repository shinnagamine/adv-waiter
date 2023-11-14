(function(n,i){typeof exports=="object"&&typeof module<"u"?i(exports):typeof define=="function"&&define.amd?define(["exports"],i):(n=typeof globalThis<"u"?globalThis:n||self,i(n["adv-waiter"]={}))})(this,function(n){"use strict";/**
 * adv-waiter.js
 *
 * @module      : adv-waiter
 * @description : This software is a JavaScript library that provides a couple of wait functions
 *                to simplify the source code and make it more readable.
 * @version     : 1.1.0
 * @author      : Shin Nagamine
 * @license     : Released under the MIT license.
 *                https://opensource.org/licenses/MIT
 */async function i(t,o){const u=t&&isFinite(t)?t:100,e=o||(t&&typeof t=="object"?t:{}),l=e.until&&typeof e.until=="function"?e.until:null,f=e.while&&typeof e.while=="function"?e.while:null,a=e.callback&&typeof e.callback=="function"?e.callback:null,s=e.showDatetime;if(l||f){async function d(r,m){const h=e.resultExistsIn;if(h){const p=e.timeout,y=e.onTimeout&&typeof e.onTimeout=="function"?e.onTimeout:null,_=Date.now();let T;for(;h.includes(T=await r())===m;){if(b(_,p))return y&&y(),null;await c(u,s)}return T}else for(;await r()===m;)await c(u,s)}if(l)return d(l,!1);if(f)return d(f,!0)}else await c(u,s);a&&typeof a=="function"&&a()}const w={wait:i};window.AdvWaiter=w;function b(t,o){return o&&Date.now()-t>=o}function c(t,o){return o&&console.log(new Date),new Promise(u=>{setTimeout(()=>{u()},t)})}n.default=w,n.wait=i,Object.defineProperties(n,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
