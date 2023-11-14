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

/**
 * Waits for the specified time or options.
 *
 * If the options.until function is specified, it waits until the result of the options.until function
 * matches an element in the options.untilResultExistsIn array.
 *
 * If the options.while function is specified, it waits while the result of the options.while function
 * matches an element in the options.whileResultExistsIn array.
 *
 * If both options.until and options.while are unspecified, it waits for the time specified in intervalOrOpts.
 *
 * If the options.callback function is specified, it executes the options.callback function after waiting.
 *
 * Note: If a JSON is specified as the first argument and the second argument is unspecified,
 * the first argument is treated as options, and the wait time is set to 100 milliseconds.
 * 
 * @param {number|Object} intervalOrOpts - Wait time in milliseconds or options.
 *                      If a JSON is specified and the second argument is unspecified,
 *                      the first argument is treated as options, and the wait time is set to 100 milliseconds.
 *
 * @param {Object} [options] - Optional JSON data.
 *
 * @param {function} [options.callback] - Function to execute after waiting.
 *
 * @param {function} [options.until] - Condition check function for waiting until a specified condition is satisfied.
 *                                     If options.untilResultExistsIn is specified:
 *                                       Waits until the result of the options.until function matches an element
 *                                       in the options.untilResultExistsIn array.
 *                                     If options.untilResultExistsIn is unspecified:
 *                                       Waits while the result of the options.until function is falsy.
 * @param {Array} [options.untilResultExistsIn] - Result array for the until-wait condition function.
 *
 * @param {function} [options.while] - Condition check function for waiting while a specified condition is satisfied.
 *                                      If options.whileResultExistsIn is specified:
 *                                        Waits while the result of the options.while function matches an element
 *                                        in the options.whileResultExistsIn array.
 *                                      If options.whileResultExistsIn is unspecified:
 *                                        Waits while the result of the options.while function is truthy.
 * @param {Array} [options.whileResultExistsIn] - Result array for the while-wait condition function.
 *
 * @param {number} [options.timeout] - Timeout period in milliseconds.
 * @param {function} [options.onTimeout] - Function to execute on timeout.
 *
 * @param {function} [options.showDatetime] - Whether to log the current datetime on function call (for debugging).
 * @returns {*} - If options.untilResultExistsIn or options.whileResultExistsIn is specified,
 *                returns the result of the function.
 */
export async function wait(intervalOrOpts, options) {
	// Determine the wait interval based on the argument.
	const _interval = (intervalOrOpts && isFinite(intervalOrOpts)) ? intervalOrOpts : 100;

	// Process options.
	const _opts = options || (intervalOrOpts && typeof intervalOrOpts === 'object' ? intervalOrOpts : {});

	// Extract relevant functions from options, defaulting to null if not provided or not a function.
	const untilFunc = (_opts.until && (typeof _opts.until === 'function') ? _opts.until : null);
	const whileFunc = (_opts.while && (typeof _opts.while === 'function') ? _opts.while : null);
	const callbackFunc = (_opts.callback && (typeof _opts.callback === 'function') ? _opts.callback : null);

    // Flag to determine whether to log the current datetime for debugging.
	const showDatetime = _opts.showDatetime;

	if (untilFunc || whileFunc) {
		/**
		 * Internal function to run the wait function based on provided conditions.
		 *
		 * @param {function} fn - Function to wait for.
		 * @param {Array} criteria - Array of conditions for waiting.
		 * @param {boolean} typeIsWhile - Flag indicating whether the type is 'while'.
		 * @returns {*} - Result of the function or null on timeout.
		 */
		async function runWaitFunc(fn, criteria, typeIsWhile) {
			const timeout = _opts.timeout;
			const onTimeout = (_opts.onTimeout && (typeof _opts.onTimeout === 'function') ? _opts.onTimeout : null);

			const startTime = Date.now();

			if (criteria) {
				let result;

				while (criteria.includes(result = await fn()) === typeIsWhile) {
					// Check for timeout and execute onTimeout if specified.
					if (_isTimeout(startTime, timeout)) {
						if (onTimeout) {
							onTimeout();
						}
						return null;
					}

					await _wait(_interval, showDatetime);
				}
				return result;
			}
			else {
				while ((await fn()) === typeIsWhile) {
					await _wait(_interval, showDatetime);
				}
			}
		}

		if (untilFunc) {
			return runWaitFunc(untilFunc, _opts.untilResultExistsIn, false);
		}
		else if (whileFunc) {
			return runWaitFunc(whileFunc, _opts.whileResultExistsIn, true);
		}
	} else {
		// If neither untilFunc nor whileFunc is provided, simply wait for the specified interval.
		await _wait(_interval, showDatetime);
	}

	if (callbackFunc && typeof callbackFunc === 'function') {
		// If callbackFunc is provided, execute it after the wait.
		callbackFunc();
	}
}


const AdvWaiter = {
	wait
};
export default AdvWaiter;
window.AdvWaiter = AdvWaiter;


/**
 *
 * Private functions
 *
 */

/**
 * Private method for timeout check.
 *
 * @private
 * @param {number} startTime - Timestamp when the operation started.
 * @param {number} timeout - Timeout duration in milliseconds.
 * @returns {boolean} - Result indicating whether a timeout occurred.
 */
function _isTimeout(startTime, timeout) {
	return (timeout && (Date.now() - startTime >= timeout));
}

/**
 * Private method to wait for a specified time.
 * 
 * @private
 * @param {number} interval - Time to wait in milliseconds.
 * @param {boolean} showDatetime - Whether to log the current datetime to the console when waiting starts.
 * @returns {Promise} - Promise that resolves once the wait is completed.
 */
function _wait(interval, showDatetime) {
	if (showDatetime) {
		console.log(new Date());
	}

	return new Promise(resolve => {
		setTimeout(() => {
			resolve();
		}, interval);
	});
}
