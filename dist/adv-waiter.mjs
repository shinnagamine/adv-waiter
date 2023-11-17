/**
 * adv-waiter.js
 *
 * @module      : adv-waiter
 * @description : This software is a JavaScript library that provides a couple of wait functions
 *                to simplify the source code and make it more readable.
 * @version     : 1.1.5
 * @author      : Shin Nagamine
 * @license     : Released under the MIT license.
 *                https://opensource.org/licenses/MIT
 */
async function d(n, i) {
  const e = n && isFinite(n) ? n : 100, t = i || (n && typeof n == "object" ? n : {}), o = t.while && typeof t.while == "function" ? t.while : null, u = t.until && typeof t.until == "function" ? t.until : null, c = t.callback && typeof t.callback == "function" ? t.callback : null, l = t.showDatetime;
  let a = null;
  if (o || u) {
    async function f(w, r) {
      const m = t.resultExistsIn;
      if (m) {
        const T = t.timeout, h = t.onTimeout && typeof t.onTimeout == "function" ? t.onTimeout : null, b = Date.now();
        let y;
        for (; m.includes(y = await w()) === r; ) {
          if (F(b, T))
            return h && h(), null;
          await s(e, l);
        }
        return y;
      } else
        for (; await w() === r; )
          await s(e, l);
    }
    o ? a = await f(o, !0) : u && (a = await f(u, !1));
  } else
    await s(e, l);
  return c && typeof c == "function" && c(), a;
}
const D = {
  wait: d
};
window.AdvWaiter = D;
function F(n, i) {
  return i && Date.now() - n >= i;
}
function s(n, i) {
  return i && console.log(/* @__PURE__ */ new Date()), new Promise((e) => {
    setTimeout(() => {
      e();
    }, n);
  });
}
export {
  D as default,
  d as wait
};
