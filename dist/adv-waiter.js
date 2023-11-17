(function(n,i){typeof exports=="object"&&typeof module<"u"?i(exports):typeof define=="function"&&define.amd?define(["exports"],i):(n=typeof globalThis<"u"?globalThis:n||self,i(n["adv-waiter"]={}))})(this,function(n){"use strict";/**
 * adv-waiter.js
 *
 * @module      : adv-waiter
 * @description : This software is a JavaScript library that provides a couple of wait functions
 *                to simplify the source code and make it more readable.
 * @version     : 1.1.5
 * @author      : Shin Nagamine
 * @license     : Released under the MIT license.
 *                https://opensource.org/licenses/MIT
 */async function i(e,o){const u=e&&isFinite(e)?e:100,t=o||(e&&typeof e=="object"?e:{}),c=t.while&&typeof t.while=="function"?t.while:null,a=t.until&&typeof t.until=="function"?t.until:null,f=t.callback&&typeof t.callback=="function"?t.callback:null,s=t.showDatetime;let w=null;if(c||a){async function r(m,h){const y=t.resultExistsIn;if(y){const _=t.timeout,T=t.onTimeout&&typeof t.onTimeout=="function"?t.onTimeout:null,D=Date.now();let b;for(;y.includes(b=await m())===h;){if(p(D,_))return T&&T(),null;await l(u,s)}return b}else for(;await m()===h;)await l(u,s)}c?w=await r(c,!0):a&&(w=await r(a,!1))}else await l(u,s);return f&&typeof f=="function"&&f(),w}const d={wait:i};window.AdvWaiter=d;function p(e,o){return o&&Date.now()-e>=o}function l(e,o){return o&&console.log(new Date),new Promise(u=>{setTimeout(()=>{u()},e)})}n.default=d,n.wait=i,Object.defineProperties(n,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
