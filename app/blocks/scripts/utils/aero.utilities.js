'use strict';

/**
 * Parses string to object of styles
 * Thank you: https://github.com/sindresorhus/query-string
 * @function
 * @private
 */
function parseStyleToObject(str) {
	let styleObject = {};

	if (typeof str !== 'string') {
		return styleObject;
	}

	str = str.trim().slice(1, -1); // browsers re-quote string style values

	if (!str) {
		return styleObject;
	}

	styleObject = str.split('&').reduce(function (ret, param) {
		const parts = param.replace(/\+/g, ' ').split('=');
		let key = parts[0];
		let val = parts[1];
		key = decodeURIComponent(key);

		// missing `=` should be `null`:
		// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
		val = typeof val === 'undefined' ? null : decodeURIComponent(val);

		if (!ret.hasOwnProperty(key)) {
			ret[key] = val;
		}else if (Array.isArray(ret[key])) {
			ret[key].push(val);
		}else {
			ret[key] = [ret[key], val];
		}
		return ret;
	}, {});

	return styleObject;
}

export {parseStyleToObject};
