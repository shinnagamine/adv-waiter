(function(o,u){typeof exports=="object"&&typeof module<"u"?module.exports=u():typeof define=="function"&&define.amd?define(u):(o=typeof globalThis<"u"?globalThis:o||self,o["adv-waiter"]=u())})(this,function(){"use strict";/**
 * adv-waiter.js
 *
 * @module      : adv-waiter
 * @description : This software is a JavaScript library that provides a couple of wait functions
 *                to simplify the source code and make it more readable.
 * @version     : 1.1.6
 * @author      : Shin Nagamine
 * @license     : Released under the MIT license.
 *                https://opensource.org/licenses/MIT
 */async function o(n,i){const e=n&&isFinite(n)?n:100,t=i||(n&&typeof n=="object"?n:{}),a=t.while&&typeof t.while=="function"?t.while:null,f=t.until&&typeof t.until=="function"?t.until:null,s=t.callback&&typeof t.callback=="function"?t.callback:null,c=t.onWaiting&&typeof t.onWaiting=="function"?t.onWaiting:null;let w=null;if(a||f){async function d(r,m){const y=t.resultExistsIn;if(y){const b=t.timeout,h=t.onTimeout&&typeof t.onTimeout=="function"?t.onTimeout:null,F=Date.now();let T;for(;y.includes(T=await r())===m;){if(p(F,b))return h&&h(),null;await l(e,c)}return T}else if(m)for(;await r();)await l(e,c);else for(;!await r();)await l(e,c)}a?w=await d(a,!0):f&&(w=await d(f,!1))}else await l(e,c);return s&&typeof s=="function"&&s(),w}const u={wait:o};function p(n,i){return i&&Date.now()-n>=i}function l(n,i){return i&&i(),new Promise(e=>{setTimeout(()=>{e()},n)})}return u});
