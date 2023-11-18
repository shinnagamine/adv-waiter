# AdvWaiter: Advanced wait functions library/module

1. [Overview](#1-overview)  
2. [How to use AdvWaiter](#2-how-to-use-advwaiter)  
	+ [Direct script loading (CDN)](#direct-script-loading-cdn)  
	+ [Module importing (ES6)](#module-importing-es6)
3. [API References](#3-api-references)  
	+ [wait(intervalOrOpts, options)](#waitintervaloropts-options)  
		+ [Interval](#interval)  
		+ [Options](#options)  
			(1) [callback](#1-callback)  
			(2) [while-waiting](#2-while-waiting)  
			(3) [until-waiting](#3-until-waiting)  
			(4) [timeout](#4-timeout)  
			(5) [onWaiting](#5-onwaiting)  

## 1. Overview
***AdvWaiter*** is a JavaScript library/module that provides a couple of ***wait*** functions to simplify the source code and make it more readable.  

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=flat&logo=javascript&logoColor=white&color=blue)
![MIT License](https://img.shields.io/badge/license-MIT-orange.svg?style=flat)  

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
	// Waits until the seconds of the current time becomes 10, 20, 40 or 50.
	await wait({
	    while: () => new Date().getSeconds(),
	    existsIn: [ 10, 20, 40, 50 ]
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
	// Waits for 1 second.
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

	### (1) callback  

	If `options.callback` is specified, it executes `options.callback` function after waiting.  

	```
	// [Example 1.1]
	// Waits for 5 seconds, then outputs a message to the console.
	await wait(5000, {
	  callback: () => console.log('5 seconds have passed.')
	});
	```

	+ ### (2) while-waiting  

		#### ① In case of only 'while' being specfied  

		<img src="https://github.com/shinnagamine/adv-waiter/blob/main/images/while-waiting_1.png" width="600">

		If `options.while` is specified and `options.existsIn` is **NOT** specified,
		it waits **WHILE** `options.while` function returns truthy value.  

		```
		// [Example 2.1.1]
		// Waits while the seconds of the current time is less than 30.
		await wait({
		  while: () => new Date().getSeconds() < 30
		});

		// [Example 2.1.2]
		// Waits while the textbox is blank.
		await wait({
		  while: () => document.querySelector('input[type="text"]').value === ''
		});

		// [Example 2.1.3]
		// Waits while the element exists.
		// * i.e., while document.querySelector() returns truthy value.
		await wait({
		  while: () => document.querySelector('#will_be_removed')
		});
		```

		#### ② In case of both 'while' and 'existsIn' being specfied  

		<img src="https://github.com/shinnagamine/adv-waiter/blob/main/images/while-waiting_2.png" width="600">

		If both `options.while` and `options.existsIn` are specified:  
		The function returns the result of `options.while` function.  

		- If the type of 'options.existsIn' is Array:  
		  It waits **WHILE** the result of `options.while` function matches an element
		  in `options.existsIn` array.  

		- If the type of 'options.existsIn' is other than Array and the value is truthy:  
		  It waits **WHILE** the result of 'options.while' function is equivalent
		  to the value of 'options.existsIn'.  

		- If the type of 'options.existsIn' is other than Array and the value is falsy:  
		  The 'options.existsIn' is ignored.  
		  If you want to use a falsy value for the wait condition,
		  it must be specified as an element within the array.

		```
		// [Example 2.2.1]
		// Waits while the seconds of the current time is 0, 1, 2, 3 or 4,
		// then returns the seconds of the reached time (other than 0, 1, 2, 3 and 4).
		const secondsAfterWait = await wait({
		  while: () => new Date().getSeconds(),
		  existsIn: [ 0, 1, 2, 3, 4 ]
		});

		> [!NOTE]  
		> The above code is equivalent to the following code:

		const secondsAfterWait = await wait({
		  while: () => new Date().getSeconds() <= 4
		});

		// [Example 2.2.2]
		// Waits while the value of select box is 'April', 'May' or 'June',
		// then returns the value when it becomes another month.
		return await wait({
		  while: () => document.querySelector('select').value,
		  existsIn: [ 'April', 'May', 'June' ]
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

	### (3) until-waiting  

	#### ① In case of only 'until' being specfied  

	<img src="https://github.com/shinnagamine/adv-waiter/blob/main/images/until-waiting_1.png" width="600">

	If `options.until` is specified and `options.existsIn` is **NOT** specified,
	it waits **UNTIL** `options.until` function returns truthy value.  

	```
	// [Example 3.1.1]
	// Waits until the seconds of the current time reach 0.
	await wait({
	  until: () => new Date().getSeconds() === 0
	});

	// [Example 3.1.2]
	// Waits until the checkbox is checked.
	await wait({
	  until: () => document.querySelector('input[type="checkbox"]').checked
	});

	// [Example 3.1.3]
	// Waits until the element is created.
	// * i.e., until document.querySelector() returns truthy value.
	await wait({
	  until: () => document.querySelector('#will_be_created')
	});
	```

	#### ② In case of both 'until' and 'existsIn' being specfied  

	<img src="https://github.com/shinnagamine/adv-waiter/blob/main/images/until-waiting_2.png" width="600">

	If both `options.until` and `options.existsIn` are specified:  
	The function returns the result of `options.until` function.  

	- If the type of 'options.existsIn' is Array:
	  It waits **UNTIL** the result of `options.until` function matches an element
	  in `options.existsIn` array.  

	- If the type of 'options.existsIn' is other than Array and the value is truthy:
	  It waits **UNTIL** the result of 'options.until' function is equivalent
	  to the value of 'options.existsIn'.  

	- If the type of 'options.existsIn' is other than Array and the value is falsy:  
	  The 'options.existsIn' is ignored.  
	  If you want to use a falsy value for the wait condition,
	  it must be specified as an element within the array.

	```
	// [Example 3.2.1]
	// Waits until the seconds of the current time reach 0, 15, 30 or 45,
	// then returns the seconds of the reached time (0, 15, 30 or 45).
	const secondsAfterWait = await wait({
	  until: () => new Date().getSeconds(),
	  existsIn: [ 0, 15, 30, 45 ]
	});

	> [!NOTE]  
	> The above code is equivalent to the following codes:

	const secondsAfterWait = await wait({
	  until: () => (new Date().getSeconds()) % 15,
	  existsIn: 0
	});

	const secondsAfterWait = await wait({
	  until: () => (new Date().getSeconds()) % 15 === 0
	});

	// [Example 3.2.2]
	// Waits until the 'Sunday' or 'Saturday' radio button is selected,
	// then returns the selected value when either is selected.
	return await wait({
	  until: () => document.querySelectorAll('input[type="radio"]:checked').value,
	  existsIn: [ 'Sunday', 'Saturday' ]
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

	### (4) timeout  

	If `options.timeout` is specified, the waiting process will terminate after specified time.  
	If `options.onTimeout` is specified, the specified function will be executed when a timeout occurs.  

	```
	// [Example 4]
	// Waiting process will terminate after 3 seconds, then outputs a message to the console.
	await wait({
	  while: () => true,
	  timeout: 3000,
	  onTimeout: () => console.log('Waiting process terminated...')
	});
	```

	### (5) onWaiting  

	If `options.onWaiting` is specified, the specified function will be executed at specified intervals while waiting.
	This option may be used primarily for debugging purposes.  

	```
	// [Example 5]
	// Outputs the current time to the console while waiting.
	await wait({
	  while: () => true,
	  onWaiting: () => console.log(new Date())
	});
	```

## License
***AdvWaiter*** is licensed under [MIT](https://github.com/shinnagamine/adv-waiter/blob/main/LICENSE).
