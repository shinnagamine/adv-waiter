/**
 * adv-waiter.js
 *
 * @module      : adv-waiter
 * @description : This software is a JavaScript library that provides a couple of wait functions
 *                to simplify the source code and make it more readable.
 * @version     : 1.1.4
 * @author      : Shin Nagamine
 * @license     : Released under the MIT license.
 *                https://opensource.org/licenses/MIT
 */
async function b(n, e) {
  const i = n && isFinite(n) ? n : 100, t = e || (n && typeof n == "object" ? n : {}), o = t.while && typeof t.while == "function" ? t.while : null, a = t.until && typeof t.until == "function" ? t.until : null, u = t.callback && typeof t.callback == "function" ? t.callback : null, c = t.showDatetime;
  if (o || a) {
    async function s(f, w) {
      const r = t.resultExistsIn;
      if (r) {
        const y = t.timeout, m = t.onTimeout && typeof t.onTimeout == "function" ? t.onTimeout : null, T = Date.now();
        let h;
        for (; r.includes(h = await f()) === w; ) {
          if (D(T, y))
            return m && m(), null;
          await l(i, c);
        }
        return h;
      } else
        for (; await f() === w; )
          await l(i, c);
    }
    return o ? s(o, !0) : s(a, !1);
  } else
    await l(i, c);
  u && typeof u == "function" && u();
}
const d = {
  wait: b
};
window.AdvWaiter = d;
function D(n, e) {
  return e && Date.now() - n >= e;
}
function l(n, e) {
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
