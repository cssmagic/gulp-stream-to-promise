# gulp-stream-to-promise

> Convert gulp stream to promise.

## Introduction

In Gulp 4, all task functions need be async, that means a task function needs to return a gulp stream, or a promise, etc.

With this feature, we can define multiple gulp streams as one gulp task. To do that, firstly we convert each gulp steam to promise, then combine them via `Promise.all()` to get one promise, finally return this all-in-one promise in the task function.

This package is to convert gulp streams to promises.

## Usage

0. Install:

	```sh
	$ npm install --save gulp-stream-to-promise
	```

0. Require:

	```js
	const gulpStreamToPromise = require('gulp-stream-to-promise')
	```

0. Convert:

	```js
	// we have a gulp stream here:
	let stream = gulp.src('path/to/src')
		.pipe(/* ... */)
		.pipe(gulp.dest('path/to/dest'))
	
	// convert it to a promise:
	let promise = gulpStreamToPromise(stream)
	```

## Example

```js
const gulp = require('gulp')	// gulp 4
const concat = require('gulp-concat')
const gulpStreamToPromise = require('gulp-stream-to-promise')

// suppose we need to combine files according to this config:
const rules = {
	'foo.js': [
		'./node_modules/foo/src/a.js',
		'./node_modules/foo/src/b.js',
	],
	'bar.js': [
		'./src/c.js',
		'./src/d.js',
	],
}

gulp.task('js', () => {
	// array to contain each single combining operation:
	var tasks = []

	Object.keys(rules).forEach((filename) => {
		let src = rules[filename]
		
		// get a gulp stream for a combining operation:
		let stream = gulp.src(src)
			.pipe(concat(filename))
			.pipe(gulp.dest('path/to/dest'))

		// convert this gulp stream to a promise:
		let promise = gulpStreamToPromise(stream)

		// put into the array:
		tasks.push(promise)
	})
	
	// return the combined promise to complete the task function:
	return Promise.all(tasks)
})
```

***

## License

[MIT License](http://www.opensource.org/licenses/mit-license.php)
