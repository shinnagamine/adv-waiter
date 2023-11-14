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
 * 1. Interval
 *   If NO arguments are specified, it waits for 100 milliseconds as a default wait time.
 *
 *     @example
 *     // Waits for 100ms.
 *     await wait();
 *
 *   If ONLY first argument 'intervalOrOpts' is specified as a numeric value,
 *   it waits for the time specified in 'intervalOrOpts'.
 *   [Note] If a FALSY value is specified, the default value of 100 is set as the 'wait time'.
 *
 *     @example
 *     // Waits for 1000ms.
 *     await wait(1000);
 *
 *     // Waits for 100ms.
 *     await wait(null);
 *     await wait(0);
 *     await wait('');
 *
 *   If ONLY first argument 'intervalOrOpts' is specified as a JSON,
 *   the first argument is treated as options, and the 'wait time' is set to 100 milliseconds.
 *
 *     @example
 *     // The first argument is treated as options.
 *     await wait({ until: () => ... });
 *
 *     // The above code is equivalent to the following code.
 *     await wait(100, { until: () => ... });
 *
 * 2. Options
 *   If 'options.until' is specified and 'options.untilResultExistsIn' is NOT specified,
 *   it waits until 'options.until' function returns truthy value.
 *
 *     @example
 *     // Waits until the seconds of the current time reach 0.
 *     await wait({
 *       until: () => new Date().getSeconds() === 0
 *     });
 *
 *   If both 'options.until' and 'options.untilResultExistsIn' are specified,
 *   it waits until the result of 'options.until' function matches an element
 *   in 'options.untilResultExistsIn' array.
 *   The function returns the result of 'options.until' function.
 *
 *     @example
 *     // Waits until the seconds of the current time reach 0, 15, 30 or 45,
 *     // then returns the seconds of the reached time.
 *     await wait({
 *       until: () => new Date().getSeconds(),
 *       untilResultExistsIn: [ 0, 15, 30, 45 ]
 *     });
 *
 *   If 'options.while' is specified and 'options.whileResultExistsIn' is NOT specified,
 *   it waits while 'options.while' function returns truthy value.
 *
 *     @example
 *     // Waits while the seconds of the current time is less than 30.
 *     await wait({
 *       while: () => new Date().getSeconds() < 30
 *     });
 *
 *   If both 'options.while' and 'options.whileResultExistsIn' are specified,
 *   it waits while the result of 'options.while' function matches an element
 *   in 'options.whileResultExistsIn' array.
 *   The function returns the result of 'options.while' function.
 *
 *     @example
 *     // Waits while the seconds of the current time is 0, 1, 2, 3 or 4,
 *     // then returns the seconds of the reached time.
 *     await wait({
 *       while: () => new Date().getSeconds(),
 *       whileResultExistsIn: [ 0, 1, 2, 3, 4 ]
 *     });
 *
 *   If 'options.callback' is specified, it executes 'options.callback' function after waiting.
 *
 *     @example
 *     // Waits for 5 seconds, then outputs a message to the console.
 *     await wait(5000, {
 *       callback: () => console.log('5 seconds have passed.')
 *     });
 *
 *     // Waits until the seconds of the current time become 0,
 *     // then outputs a message to the console.
 *     await wait({
 *       until: () => new Date().getSeconds() === 0,
 *       callback: () => console.log('Time is up!')
 *     });
 *
 *   If 'options.timeout' is specified, the waiting process will terminate after specified time.
 *   If 'options.onTimeout' is specified, the specified function will be executed when a timeout occurs.
 *
 *     @example
 *     // Waiting process will terminate after 3 seconds, then outputs a message to the console.
 *     await wait({
 *       while: () => 1 < 2,
 *       timeout: 3000,
 *       onTimeout: () => console.log('Waiting process is terminated...')
 *     });
 *
 *
 * @param {number|Object} intervalOrOpts
 *   - Wait time in milliseconds or options.
 *     If NOT specified or FALSY value is specified, the default value of 100 is set as the 'wait time'.
 *     If a JSON is specified and the second argument is NOT specified,
 *     the first argument is treated as options, and the 'wait time' is set to 100 milliseconds.
 *
 * @param {Object} [options]
 *   - Optional JSON data.
 *
 *   @param {function} [options.until]
 *     - Condition check function for waiting until a specified condition is satisfied.
 *
 *       If 'options.untilResultExistsIn' is NOT specified:
 *         Waits until 'options.until' function returns truthy value.
 *
 *       If 'options.untilResultExistsIn' is specified:
 *         Waits until the result of 'options.until' function matches an element
 *         in 'options.untilResultExistsIn' array.
 *         The function returns the result of 'options.until' function.
 *
 *   @param {Array} [options.untilResultExistsIn]
 *     - Result array for the until-wait condition function.
 *
 *   @param {function} [options.while]
 *     - Condition check function for waiting while a specified condition is satisfied.
 *
 *       If 'options.whileResultExistsIn' is NOT specified:
 *         Waits while 'options.while' function returns truthy value.
 *
 *       If 'options.whileResultExistsIn' is specified:
 *         Waits while the result of 'options.while' function matches an element
 *         in 'options.whileResultExistsIn' array.
 *         The function returns the result of 'options.while' function.
 *
 *   @param {Array} [options.whileResultExistsIn]
 *     - Result array for the while-wait condition function.
 *
 *   @param {function} [options.callback]
 *     - Function to execute after waiting.
 *
 *   @param {number} [options.timeout]
 *     - Timeout period in milliseconds.
 *
 *   @param {function} [options.onTimeout]
 *     - Function to execute on timeout.
 *
 *   @param {function} [options.showDatetime]
 *     - Whether to log the current datetime on function call (for debugging).
 *
 * @returns {*}
 *   - If either 'options.untilResultExistsIn' or 'options.whileResultExistsIn' is specified,
 *     returns the result of the specified function.
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
