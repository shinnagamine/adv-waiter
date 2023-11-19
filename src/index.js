/**
 * adv-waiter.js
 *
 * @module      : adv-waiter
 * @description : This software is a JavaScript library that provides a couple of wait functions
 *                to simplify the source code and make it more readable.
 * @version     : 1.1.10
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
 *   (1) callback
 *
 *     If 'options.callback' is specified, it executes 'options.callback' function after waiting.
 *
 *       @example
 *       // Waits for 5 seconds, then outputs a message to the console.
 *       await wait(5000, {
 *         callback: () => console.log('5 seconds have passed.')
 *       });
 *
 *   (2) while-waiting
 *
 *     a. In case of only 'while' being specfied
 *       If 'options.while' is specified and 'options.existsIn' is NOT specified,
 *       it waits WHILE 'options.while' function returns truthy value.
 *
 *         @example
 *         // Waits while the seconds of the current time is less than 30.
 *         await wait({
 *           while: () => new Date().getSeconds() < 30
 *         });
 *
 *         // Waits while the textbox is blank.
 *         await wait({
 *           while: () => document.querySelector('input[type="text"]').value === ''
 *         });
 *
 *         // Waits while the element exists.
 *         // * i.e., while document.querySelector() returns truthy value.
 *         await wait({
 *           while: () => document.querySelector('#will_be_removed')
 *         });
 *
 *     b. In case of both 'while' and 'existsIn' being specfied
 *       If both 'options.while' and 'options.existsIn' are specified:
 *         The function returns the result of 'options.while' function.
 *
 *         - If the type of 'options.existsIn' is Array:
 *           It waits WHILE the result of 'options.while' function matches an element
 *           in 'options.existsIn' array.
 *
 *         - If the type of 'options.existsIn' is other than Array and the value is truthy:
 *           It waits WHILE the result of 'options.while' function is equivalent
 *           to the value of 'options.existsIn'.
 *
 *         - If the type of 'options.existsIn' is other than Array and the value is falsy:
 *           The 'options.existsIn' is ignored.
 *           If you want to use a falsy value for the wait condition,
 *           it must be specified as an element within the array.
 *
 *         @example
 *         // Waits while the seconds of the current time is 0, 1, 2, 3 or 4,
 *         // then returns the seconds of the reached time (other than 0, 1, 2, 3 and 4).
 *         const secondsAfterWait = await wait({
 *           while: () => new Date().getSeconds(),
 *           existsIn: [ 0, 1, 2, 3, 4 ]
 *         });
 *
 *         // Waits while the value of select box is 'April', 'May' or 'June',
 *         // then returns the value when it becomes another month.
 *         return await wait({
 *           while: () => document.querySelector('select').value,
 *           existsIn: [ 'April', 'May', 'June' ]
 *         });
 *
 *   (3) until-waiting
 *
 *     a. In case of only 'until' being specfied
 *       If 'options.until' is specified and 'options.existsIn' is NOT specified,
 *       it waits until 'options.until' function returns truthy value.
 *
 *         @example
 *         // Waits until the seconds of the current time reach 0.
 *         await wait({
 *           until: () => new Date().getSeconds() === 0
 *         });
 *
 *         // Waits until the checkbox is checked.
 *         await wait({
 *           until: () => document.querySelector('input[type="checkbox"]').checked
 *         });
 *
 *         // Waits until the element is created.
 *         // * i.e., until document.querySelector() returns truthy value.
 *         await wait({
 *           until: () => document.querySelector('#will_be_created')
 *         });
 *
 *     b. In case of both 'until' and 'existsIn' being specfied
 *       If both 'options.until' and 'options.existsIn' are specified:
 *         The function returns the result of 'options.until' function.
 *
 *         - If the type of 'options.existsIn' is Array:
 *           It waits UNTIL the result of 'options.until' function matches an element
 *           in 'options.existsIn' array.
 *
 *         - If the type of 'options.existsIn' is other than Array and the value is truthy:
 *           It waits UNTIL the result of 'options.until' function is equivalent
 *           to the value of 'options.existsIn'.
 *
 *         - If the type of 'options.existsIn' is other than Array and the value is falsy:
 *           The 'options.existsIn' is ignored.
 *           If you want to use a falsy value for the wait condition,
 *           it must be specified as an element within the array.
 *
 *         @example
 *         // Waits until the seconds of the current time reach 0, 15, 30 or 45,
 *         // then returns the seconds of the reached time (0, 15, 30 or 45).
 *         const secondsAfterWait = await wait({
 *           until: () => new Date().getSeconds(),
 *           existsIn: [ 0, 15, 30, 45 ]
 *         });
 *
 *         // Waits until the 'Sunday' or 'Saturday' radio button is selected,
 *         // then returns the selected value when either is selected.
 *         return await wait({
 *           until: () => document.querySelectorAll('input[type="radio"]:checked').value,
 *           existsIn: [ 'Sunday', 'Saturday' ]
 *         });
 *
 *   (4) timeout
 *
 *       If 'options.timeout' is specified, the waiting process will terminate after specified time.
 *       If 'options.onTimeout' is specified, the specified function will be executed when a timeout occurs.
 *
 *         @example
 *         // Waiting process will terminate after 3 seconds, then outputs a message to the console.
 *         await wait({
 *           while: () => true,
 *           timeout: 3000,
 *           onTimeout: () => console.log('Waiting process terminated...')
 *         });
 *
 *   (5) onWaiting
 *
 *       If 'options.onWaiting' is specified, the specified function will be executed at specified intervals while waiting.
 *       This option may be used primarily for debugging purposes.
 *
 *         @example
 *         // Outputs the current time to the console while waiting.
 *         await wait({
 *           while: () => true,
 *           onWaiting: () => console.log(new Date())
 *         });
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
 *       The function returns the result of 'options.while' function.
 *
 *       If 'options.existsIn' is NOT specified:
 *         Waits WHILE 'options.while' function returns truthy value.
 *
 *       If 'options.existsIn' is specified:
 *         - If the type of 'options.existsIn' is Array:
 *           Waits WHILE the result of 'options.while' function matches an element
 *           in 'options.existsIn' array.
 *
 *         - If the type of 'options.existsIn' is other than Array and the value is truthy:
 *           Waits WHILE the result of 'options.while' function is equivalent
 *           to the value of 'options.existsIn'
 *
 *   @param {function} [options.until]
 *     - Condition check function for waiting UNTIL a specified condition is satisfied.
 *       The function returns the result of 'options.until' function.
 *
 *       If 'options.existsIn' is NOT specified:
 *         Waits UNTIL 'options.until' function returns truthy value.
 *
 *       If 'options.existsIn' is specified:
 *         - If the type of 'options.existsIn' is Array:
 *           Waits UNTIL the result of 'options.until' function matches an element
 *           in 'options.existsIn' array.
 *
 *         - If the type of 'options.existsIn' is other than Array and the value is truthy:
 *           Waits UNTIL the result of 'options.until' function is equivalent
 *           to the value of 'options.existsIn'
 *
 *   @param {Array} [options.existsIn]
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
 *   - If 'options.existsIn' is NOT specified, returns true.
 *     If 'options.existsIn' is specified, returns the result of the specified function.
 *     If timeout, returns false.
 */
export async function wait(intervalOrOpts, options) {
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
		 * @returns {*} - Result of the function or false on timeout.
		 */
		async function runWaitFunc(fn, typeIsWhile) {
			let _result;

			const checkCondition = async () => {
				_result = await fn();

				const criteria = (() => {
					const existsIn = _opts.existsIn;

					if (existsIn) {
						if (Array.isArray(existsIn)) {
							return existsIn.includes(_result);
						} else {
							return (existsIn === _result);
						}
					} else {
						return !!_result;
					}
				})();

				return criteria === typeIsWhile;
			};

			const onTimeout = (_opts.onTimeout && (typeof _opts.onTimeout === 'function') ? _opts.onTimeout : null);
			const startTime = Date.now();

			while (await checkCondition()) {
				// Check for timeout and execute onTimeout if specified.
				if (_isTimeout(startTime, _opts.timeout)) {
					if (onTimeout) {
						onTimeout();
					}
					return false;
				}

				await _wait(_interval, onWaitingFunc);
			}

			return _result;
		}

		if (whileFunc) {
			result = await runWaitFunc(whileFunc, true);
		} else if (untilFunc) {
			result = await runWaitFunc(untilFunc, false);
		}
	} else {
		// If neither untilFunc nor whileFunc is provided, simply wait for the specified interval.
		await _wait(_interval, onWaitingFunc);
		result = true;
	}

	if (callbackFunc) {
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
