/**
 * adv-waiter.js
 *
 * @module      : adv-waiter
 * @description : This software is a JavaScript library that provides a couple of wait functions
 *                to simplify the source code and make it more readable.
 * @version     : 1.1.0
 * @author      : Shin Nagamine
 * @license     : Released under the MIT license.
 *                https://opensource.org/licenses/MIT
 */
async function b(n, e) {
  const i = n && isFinite(n) ? n : 100, t = e || (n && typeof n == "object" ? n : {}), o = t.until && typeof t.until == "function" ? t.until : null, u = t.while && typeof t.while == "function" ? t.while : null, l = t.callback && typeof t.callback == "function" ? t.callback : null, c = t.showDatetime;
  if (o || u) {
    async function s(f, w, m) {
      const y = t.timeout, r = t.onTimeout && typeof t.onTimeout == "function" ? t.onTimeout : null, T = Date.now();
      if (w) {
        let h;
        for (; w.includes(h = await f()) === m; ) {
          if (D(T, y))
            return r && r(), null;
          await a(i, c);
        }
        return h;
      } else
        for (; await f() === m; )
          await a(i, c);
    }
    if (o)
      return s(o, t.untilResultExistsIn, !1);
    if (u)
      return s(u, t.whileResultExistsIn, !0);
  } else
    await a(i, c);
  l && typeof l == "function" && l();
}
const d = {
  wait: b
};
window.AdvWaiter = d;
function D(n, e) {
  return e && Date.now() - n >= e;
}
function a(n, e) {
  return e && console.log(/* @__PURE__ */ new Date()), new Promise((i) => {
    setTimeout(() => {
      i();
    }, n);
  });
}
export {
  d as default,
  b as wait
};
