/**
 * adv-waiter.js
 *
 * @module      : adv-waiter
 * @description : This software is a JavaScript library that provides a couple of wait functions
 *                to simplify the source code and make it more readable.
 * @version     : 1.1.8
 * @author      : Shin Nagamine
 * @license     : Released under the MIT license.
 *                https://opensource.org/licenses/MIT
 */
async function k(t, i) {
  const o = t && isFinite(t) ? t : 100, n = i || (t && typeof t == "object" ? t : {}), a = n.while && typeof n.while == "function" ? n.while : null, l = n.until && typeof n.until == "function" ? n.until : null, s = n.callback && typeof n.callback == "function" ? n.callback : null, f = n.onWaiting && typeof n.onWaiting == "function" ? n.onWaiting : null;
  let u = null;
  if (a || l) {
    async function r(m, T) {
      let e;
      const h = async () => (e = await m(), (() => {
        const c = n.existsIn;
        return c ? Array.isArray(c) ? c.includes(e) : c === e : !!e;
      })() === T), w = n.onTimeout && typeof n.onTimeout == "function" ? n.onTimeout : null, b = Date.now();
      for (; await h(); ) {
        if (F(b, n.timeout))
          return w && w(), !1;
        await y(o, f);
      }
      return e;
    }
    a ? u = await r(a, !0) : l && (u = await r(l, !1));
  } else
    await y(o, f), u = !0;
  return s && s(), u;
}
const _ = {
  wait: k
};
function F(t, i) {
  return i && Date.now() - t >= i;
}
function y(t, i) {
  return i && i(), new Promise((o) => {
    setTimeout(() => {
      o();
    }, t);
  });
}
export {
  _ as default
};
