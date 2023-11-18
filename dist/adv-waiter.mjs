/**
 * adv-waiter.js
 *
 * @module      : adv-waiter
 * @description : This software is a JavaScript library that provides a couple of wait functions
 *                to simplify the source code and make it more readable.
 * @version     : 1.1.6
 * @author      : Shin Nagamine
 * @license     : Released under the MIT license.
 *                https://opensource.org/licenses/MIT
 */
async function F(n, i) {
  const e = n && isFinite(n) ? n : 100, t = i || (n && typeof n == "object" ? n : {}), l = t.while && typeof t.while == "function" ? t.while : null, a = t.until && typeof t.until == "function" ? t.until : null, c = t.callback && typeof t.callback == "function" ? t.callback : null, o = t.onWaiting && typeof t.onWaiting == "function" ? t.onWaiting : null;
  let f = null;
  if (l || a) {
    async function w(s, r) {
      const m = t.resultExistsIn;
      if (m) {
        const h = t.timeout, y = t.onTimeout && typeof t.onTimeout == "function" ? t.onTimeout : null, b = Date.now();
        let T;
        for (; m.includes(T = await s()) === r; ) {
          if (k(b, h))
            return y && y(), null;
          await u(e, o);
        }
        return T;
      } else if (r)
        for (; await s(); )
          await u(e, o);
      else
        for (; !await s(); )
          await u(e, o);
    }
    l ? f = await w(l, !0) : a && (f = await w(a, !1));
  } else
    await u(e, o);
  return c && typeof c == "function" && c(), f;
}
const W = {
  wait: F
};
function k(n, i) {
  return i && Date.now() - n >= i;
}
function u(n, i) {
  return i && i(), new Promise((e) => {
    setTimeout(() => {
      e();
    }, n);
  });
}
export {
  W as default
};
