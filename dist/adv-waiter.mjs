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
async function b(n, i) {
  const e = n && isFinite(n) ? n : 100, t = i || (n && typeof n == "object" ? n : {}), o = t.until && typeof t.until == "function" ? t.until : null, u = t.while && typeof t.while == "function" ? t.while : null, c = t.callback && typeof t.callback == "function" ? t.callback : null, l = t.showDatetime;
  if (o || u) {
    async function s(f, w) {
      const r = t.resultExistsIn;
      if (r) {
        const y = t.timeout, m = t.onTimeout && typeof t.onTimeout == "function" ? t.onTimeout : null, T = Date.now();
        let h;
        for (; r.includes(h = await f()) === w; ) {
          if (D(T, y))
            return m && m(), null;
          await a(e, l);
        }
        return h;
      } else
        for (; await f() === w; )
          await a(e, l);
    }
    if (o)
      return s(o, !1);
    if (u)
      return s(u, !0);
  } else
    await a(e, l);
  c && typeof c == "function" && c();
}
const d = {
  wait: b
};
window.AdvWaiter = d;
function D(n, i) {
  return i && Date.now() - n >= i;
}
function a(n, i) {
  return i && console.log(/* @__PURE__ */ new Date()), new Promise((e) => {
    setTimeout(() => {
      e();
    }, n);
  });
}
export {
  d as default,
  b as wait
};
