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
 *     // Waits for 1 second.
 *     await wait(1000);
 *
 *     // Waits for 100ms.
 *     await wait(0);
 *     await wait('');
 *     await wait(null);
 *     await wait(false);
 *     await wait(undefined);
 *
 *   If ONLY first argument 'intervalOrOpts' is specified as a JSON,
 *   the first argument is treated as options, and the default value of 100 is set as the 'wait time'.
 *
 *     @example
 *     // The first argument is treated as options.
 *     await wait({ until: () => ... });
 *
 *     // The above code is equivalent to the following codes.
 *     await wait(100, { until: () => ... });
 *     await wait(0, { until: () => ... });
 *     await wait('', { until: () => ... });
 *     await wait(null, { until: () => ... });
 *     await wait(false, { until: () => ... });
 *     await wait(undefined, { until: () => ... });
 *
 * 2. Options
 *  (1) while-waiting
 *
 *   If 'options.while' is specified and 'options.resultExistsIn' is NOT specified,
 *   it waits while 'options.while' function returns truthy value.
 *
 *     @example
 *     // Waits while the seconds of the current time is less than 30.
 *     await wait({
 *       while: function() {
 *         return new Date().getSeconds() < 30;
 *       }
 *     });
 *
 *     // Waits while the textbox is blank.
 *     await wait({
 *       while: () => document.querySelector('input[type="text"]').value === ''
 *     });
 *
 *   If both 'options.while' and 'options.resultExistsIn' are specified,
 *   it waits while the result of 'options.while' function matches an element
 *   in 'options.resultExistsIn' array.
 *   The function returns the result of 'options.while' function.
 *
 *     @example
 *     // Waits while the seconds of the current time is 0, 1, 2, 3 or 4,
 *     // then returns the seconds of the reached time (0, 1, 2, 3 or 4).
 *     const secondsAfterWait = await wait({
 *       while: function() {
 *         return new Date().getSeconds();
 *       },
 *       resultExistsIn: [ 0, 1, 2, 3, 4 ]
 *     });
 *
 *     // Waits while the value of select box is 'April', 'May' or 'June',
 *     // then returns the value when it becomes another month.
 *     return await wait({
 *       while: () => document.querySelector('select').value,
 *       resultExistsIn: [ 'April', 'May', 'June' ]
 *     });
 *
 *  (2) until-waiting
 *
 *   If 'options.until' is specified and 'options.resultExistsIn' is NOT specified,
 *   it waits until 'options.until' function returns truthy value.
 *
 *     @example
 *     // Waits until the seconds of the current time reach 0.
 *     await wait({
 *       until: function() {
 *         return new Date().getSeconds() === 0;
 *       }
 *     });
 *
 *     // Waits until the checkbox is checked.
 *     await wait({
 *       until: () => document.querySelector('input[type="checkbox"]').checked
 *     });
 *
 *   If both 'options.until' and 'options.resultExistsIn' are specified,
 *   it waits until the result of 'options.until' function matches an element
 *   in 'options.resultExistsIn' array.
 *   The function returns the result of 'options.until' function.
 *
 *     @example
 *     // Waits until the seconds of the current time reach 0, 15, 30 or 45,
 *     // then returns the seconds of the reached time (0, 15, 30 or 45).
 *     const secondsAfterWait = await wait({
 *       until: function() {
 *         return new Date().getSeconds();
 *       },
 *       resultExistsIn: [ 0, 15, 30, 45 ]
 *     });
 *
 *     // Waits until the 'Sunday' or 'Saturday' radio button is selected,
 *     // then returns the selected value when either is selected.
 *     return await wait({
 *       until: () => document.querySelectorAll('input[type="radio"]:checked').value,
 *       resultExistsIn: [ 'Sunday', 'Saturday' ]
 *     });
 *
 *  (3) callback
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
 *  (4) timeout
 *
 *   If 'options.timeout' is specified, the waiting process will terminate after specified time.
 *   If 'options.onTimeout' is specified, the specified function will be executed when a timeout occurs.
 *
 *     @example
 *     // Waiting process will terminate after 3 seconds, then outputs a message to the console.
 *     await wait({
 *       while: () => true,
 *       timeout: 3000,
 *       onTimeout: () => console.log('Waiting process terminated...')
 *     });
 *
 *  (5) onWaiting
 *
 *   If 'options.onWaiting' is specified, the specified function will be executed at specified intervals while waiting.
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
 *   @param {function} [options.while]
 *     - Condition check function for waiting WHILE a specified condition is satisfied.
 *
 *       If 'options.resultExistsIn' is NOT specified:
 *         Waits WHILE 'options.while' function returns truthy value.
 *
 *       If 'options.resultExistsIn' is specified:
 *         Waits WHILE the result of 'options.while' function matches an element
 *         in 'options.resultExistsIn' array.
 *         The function returns the result of 'options.while' function.
 *
 *   @param {function} [options.until]
 *     - Condition check function for waiting UNTIL a specified condition is satisfied.
 *
 *       If 'options.resultExistsIn' is NOT specified:
 *         Waits UNTIL 'options.until' function returns truthy value.
 *
 *       If 'options.resultExistsIn' is specified:
 *         Waits UNTIL the result of 'options.until' function matches an element
 *         in 'options.resultExistsIn' array.
 *         The function returns the result of 'options.until' function.
 *
 *   @param {Array} [options.resultExistsIn]
 *     - Array to store the value for determining whether to continue the waiting process or not.
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
 *   @param {function} [options.onWaiting]
 *     - Function to execute at specified intervals while waiting.
 *
 * @returns {*}
 *   - If 'options.resultExistsIn' is specified, returns the result of the specified function.
 */
async function wait(intervalOrOpts, options) {
	// Determine the wait interval based on the argument.
	const _interval = (intervalOrOpts && isFinite(intervalOrOpts)) ? intervalOrOpts : 100;

	// Process options.
	const _opts = options || (intervalOrOpts && typeof intervalOrOpts === 'object' ? intervalOrOpts : {});

	// Extract relevant functions from options, defaulting to null if not provided or not a function.
	const whileFunc = (_opts.while && (typeof _opts.while === 'function') ? _opts.while : null);
	const untilFunc = (_opts.until && (typeof _opts.until === 'function') ? _opts.until : null);
	const callbackFunc = (_opts.callback && (typeof _opts.callback === 'function') ? _opts.callback : null);
	const onWaitingFunc = (_opts.onWaiting && (typeof _opts.onWaiting === 'function') ? _opts.onWaiting : null);

	let result = null;

	if (whileFunc || untilFunc) {
		/**
		 * Internal function to run the wait function based on provided conditions.
		 *
		 * @param {function} fn - Function to wait for.
		 * @param {boolean} typeIsWhile - Flag indicating whether the type is 'while'.
		 * @returns {*} - Result of the function or null on timeout.
		 */
		async function runWaitFunc(fn, typeIsWhile) {
			const criteria = _opts.resultExistsIn;

			if (criteria) {
				const timeout = _opts.timeout;
				const onTimeout = (_opts.onTimeout && (typeof _opts.onTimeout === 'function') ? _opts.onTimeout : null);
				const startTime = Date.now();

				let result;

				while (criteria.includes(result = await fn()) === typeIsWhile) {
					// Check for timeout and execute onTimeout if specified.
					if (_isTimeout(startTime, timeout)) {
						if (onTimeout) {
							onTimeout();
						}
						return null;
					}

					await _wait(_interval, onWaitingFunc);
				}
				return result;
			}
			else {
				if (typeIsWhile) {
					while (await fn()) {
						await _wait(_interval, onWaitingFunc);
					}
				} else {
					while (!(await fn())) {
						await _wait(_interval, onWaitingFunc);
					}
				}
			}
		}

		if (whileFunc) {
			result = await runWaitFunc(whileFunc, true);
		} else if (untilFunc) {
			result = await runWaitFunc(untilFunc, false);
		}
	} else {
		// If neither untilFunc nor whileFunc is provided, simply wait for the specified interval.
		await _wait(_interval, onWaitingFunc);
	}

	if (callbackFunc && typeof callbackFunc === 'function') {
		// If callbackFunc is provided, execute it after the wait.
		callbackFunc();
	}

	return result;
}

/**
 * Module definition and export
 */
const AdvWaiter = {
	wait
};
export default AdvWaiter;


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
 * @param {function} onWaitingFunc - Function to execute when '_wait()' called.
 * @returns {Promise} - Promise that resolves once the wait is completed.
 */
function _wait(interval, onWaitingFunc) {
	if (onWaitingFunc) {
		onWaitingFunc();
	}

	return new Promise(resolve => {
		setTimeout(() => {
			resolve();
		}, interval);
	});
}
