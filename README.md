# AdvWaiter: Advanced wait functions library/module
1. [Overview](#1-overview)  
2. [How to use AdvWaiter](#2-how-to-use-advwaiter)  
	+ [Direct script loading (CDN)](#direct-script-loading-cdn)  
	+ [Module importing (ES6)](#module-importing-es6)
3. [API Reference](#3-api-reference)  
	+ [wait(intervalOrOpts, options)](#waitintervaloropts-options)  
		+ [Interval](#interval)  
		+ [Options](#options)  
			(1) [while-waiting](#while-waiting)  
			(2) [until-waiting](#until-waiting)  
			(3) [callback](#callback)  
			(4) [timeout](#timeout)  
			(5) [debug](#debug)  

## 1. Overview
***AdvWaiter*** is a JavaScript library/module that provides a couple of wait functions to simplify the source code and make it more readable.

## 2. How to use ***AdvWaiter***
+ ### Direct script loading (CDN)
1. Downloading library file  
	When you use ***AdvWaiter*** as a library, please download **adv-waiter.js**.
2. Specifying library file path  
	You can specify the library file path to the library within the script tag.

	```
	<script type="text/javascript" src="./adv-waiter.js">
	```

3. Calling function  
	Invoke the function by appending the function name after the class name ***AdvWaiter***. 

	```
	// Waits until the seconds of the current time reach 0.
	await AdvWaiter.wait({
	    until: () => new Date().getSeconds() === 0,
	    callback: () => console.log('Time is up!')
	});
	```

+ ### Module importing (ES6)
1. Downloading module file  
	If you want to use ***AdvWaiter*** as a module, just download **adv-waiter.mjs**.

2. Specifying module file path  
	You can use the import statement to specify the module file.  

	```
	import AdvWaiter from './adv-waiter.mjs';
	  or
	import { wait } from './adv-waiter.mjs';
	```

3. Calling function  
	Invoke the function.  

	```
	// Waits while the seconds of the current time is 0, 1, 2, 3 or 4.
	await wait({
	    while: () => new Date().getSeconds(),
	    resultExistsIn: [ 0, 1, 2, 3, 4 ]
	});
	```

## 3. API References

  + ### `wait(intervalOrOpts, options)`  
	Waits for the specified time or options.  

	> ### Interval  

	If **NO** arguments are specified, it waits for 100 milliseconds as a default 'wait time'.  

	```
	// Waits for 100ms.
	await wait();
	```

	If **ONLY** first argument `intervalOrOpts` is specified as a numeric value,
	it waits for the time specified in `intervalOrOpts`.  
	If a **FALSY** value is specified, the default value of 100 is set as the 'wait time'.  

	```
	// Waits for 1000ms.
	await wait(1000);

	// Waits for 100ms.
	await wait(0);
	await wait('');
	await wait(null);
	await wait(false);
	await wait(undefined);
	```

	If **ONLY** first argument `intervalOrOpts` is specified as a JSON,
	the first argument is treated as options, and the default value of 100 is set as the 'wait time'.  

	```
	// The first argument is treated as options.
	await wait({ until: () => ... });

	// The above code is equivalent to the following codes.
	await wait(100, { until: () => ... });
	await wait(0, { until: () => ... });
	await wait('', { until: () => ... });
	await wait(null, { until: () => ... });
	await wait(false, { until: () => ... });
	await wait(undefined, { until: () => ... });
	```

	> ### Options  

	+ ### (1) while-waiting  

		If `options.while` is specified and `options.resultExistsIn` is **NOT** specified,
		it waits while `options.while` function returns truthy value.  

		```
		// Waits while the seconds of the current time is less than 30.
		await wait({
		  while: function() {
		    return new Date().getSeconds() < 30;
		  }
		});

		// Waits while the textbox is blank.
		await wait({
		  while: () => document.querySelector('input[type="text"]').value === ''
		});
		```

		If both `options.while` and `options.resultExistsIn` are specified,
		it waits while the result of `options.while` function matches an element
		in `options.resultExistsIn` array.  
		The function returns the result of `options.while` function.  

		```
		// Waits while the seconds of the current time is 0, 1, 2, 3 or 4,
		// then returns the seconds of the reached time (0, 1, 2, 3 or 4).
		const secondsAfterWait = await wait({
		  while: function() {
		    return new Date().getSeconds();
		  },
		  resultExistsIn: [ 0, 1, 2, 3, 4 ]
		});

		// Waits while the value of select box is 'April', 'May' or 'June',
		// then returns the value when it becomes another month.
		return await wait({
		  while: () => document.querySelector('select').value,
		  resultExistsIn: [ 'April', 'May', 'June' ]
		});
		```

		> [!NOTE]
		> Without using ***AdvWaiter***, the code for the above process would be the complex code shown below:  

		```
		let selectedMonth;
		while ([ 'April', 'May', 'June' ].includes(selectedMonth = document.querySelector('select').value)) {
		  await new Promise(resolve => {
		    setTimeout(() => {
		      resolve();
		    }, 100);
		  });
		}
		return selectedMonth;
		```


	+ ### (2) until-waiting  

		If `options.until` is specified and `options.resultExistsIn` is **NOT** specified,
		it waits until `options.until` function returns truthy value.  

		```
		// Waits until the seconds of the current time reach 0.
		await wait({
		  until: function() {
		    return new Date().getSeconds() === 0;
		  }
		});

		// Waits until the checkbox is checked.
		await wait({
		  until: () => document.querySelector('input[type="checkbox"]').checked
		});
		```

		If both `options.until` and `options.resultExistsIn` are specified,
		it waits until the result of `options.until` function matches an element
		in `options.resultExistsIn` array.  
		The function returns the result of `options.until` function.  

		```
		// Waits until the seconds of the current time reach 0, 15, 30 or 45,
		// then returns the seconds of the reached time (0, 15, 30 or 45).
		const secondsAfterWait = await wait({
		  until: function() {
		    return new Date().getSeconds();
		  },
		  resultExistsIn: [ 0, 15, 30, 45 ]
		});

		// Waits until the 'Sunday' or 'Saturday' radio button is selected,
		// then returns the selected value when either is selected.
		return await wait({
		  until: () => document.querySelectorAll('input[type="radio"]:checked').value,
		  resultExistsIn: [ 'Sunday', 'Saturday' ]
		});
		```

		> [!NOTE]
		> Without using ***AdvWaiter***, the code for the above process would be the complex code shown below:  

		```
		const getCheckedRadio = () => document.querySelector('input[type="radio"]:checked');
		while (!(getCheckedRadio() && [ 'Sunday', 'Saturday' ].includes(getCheckedRadio().value)) {
		  await new Promise(resolve => {
		    setTimeout(() => {
		      resolve();
		    }, 100);
		  });
		}
		return getCheckedRadio().value;
		```

	+ ### (3) callback  

		If `options.callback` is specified, it executes `options.callback` function after waiting.  

		```
		// Waits for 5 seconds, then outputs a message to the console.
		await wait(5000, {
		  callback: () => console.log('5 seconds have passed.')
		});

		// Waits until the seconds of the current time become 0,
		// then outputs a message to the console.
		await wait({
		  until: () => new Date().getSeconds() === 0,
		  callback: () => console.log('Time is up!')
		});
		```

	+ ### (4) timeout  

		If `options.timeout` is specified, the waiting process will terminate after specified time.  
		If `options.onTimeout` is specified, the specified function will be executed when a timeout occurs.  

		```
		// Waiting process will terminate after 3 seconds, then outputs a message to the console.
		await wait({
		  while: () => 1 < 2,
		  timeout: 3000,
		  onTimeout: () => console.log('Waiting process terminated...')
		});
		```

	+ ### (5) debug  

		If `options.showDatetime` is specified, the current datetime will be logged to the console at specified intervals.

## License
***AdvWaiter*** is licensed under [MIT](https://github.com/shinnagamine/adv-waiter/blob/main/LICENSE).
