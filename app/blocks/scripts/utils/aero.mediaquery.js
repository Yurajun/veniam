/* global $ */
'use strict';

import {parseStyleToObject}from './aero.utilities';

class MediaQuery {
	constructor(app) {
		const self = this;

		self.app = app;

		// Default set of media queries
		self.defaultQueries = {
			default: 'only screen',
			landscape: 'only screen and (orientation: landscape)',
			portrait: 'only screen and (orientation: portrait)',
			retina: 'only screen and (-webkit-min-device-pixel-ratio: 2),' +
				'only screen and (min--moz-device-pixel-ratio: 2),' +
				'only screen and (-o-min-device-pixel-ratio: 2/1),' +
				'only screen and (min-device-pixel-ratio: 2),' +
				'only screen and (min-resolution: 192dpi),' +
				'only screen and (min-resolution: 2dppx)'
		};

		self.queries = [];

		for (const key in self.defaultQueries) {
			if (self.defaultQueries.hasOwnProperty(key)) {
				self.queries.push({
					name: key,
					value: self.defaultQueries[key]
				});
			}
		}

		self.current = '';
	}

	/**
	  * Initializes the media query helper, by extracting the breakpoint list from the CSS and activating the breakpoint watcher.
	  * @function
	  * @private
	  */
	init() {
		const self = this;
		const $meta = $('meta.aero-mq');
		if (!$meta.length){
			$('<meta class="aero-mq">').appendTo(document.head);
		}

		const extractedStyles = $('.aero-mq').css('font-family');

		const namedQueries = parseStyleToObject(extractedStyles);

		for (const key in namedQueries) {
			if (namedQueries.hasOwnProperty(key)) {
				self.queries.push({
					name: key,
					value: `only screen and (min-width: ${namedQueries[key]})`,
					mdq: namedQueries[key]
				});
			}
		}

		self.current = self.getCurrentSize();

		self.watcher();

		$(document).trigger( 'changed.aero.mediaquery', [self.current] );
	}

	/**
	 *
	 */
	UIdemo() {
		const self = this;
		const $demo = $('.js-grid-demo');
		let tableData = '';
		const gridOnly = Array.prototype.slice.call(self.queries, 4);

		for (const key in gridOnly) {
			if (gridOnly.hasOwnProperty(key)){
				const item = gridOnly[key];
				tableData += `<tr>
					<th>${item.name}</th>
					<td>${item.value}</td>
				</tr>`;
			}
		}

		const table = `<table class="aero-table aero-table-bordered">
			<tbody>${tableData}</tbody>
		</table>`;

		$demo.append(table);
	}

	/**
	 * Checks if the screen is at least as wide as a breakpoint.
	 * @function
	 * @param {String} size - Name of the breakpoint to check.
	 * @param {String} size - имя контрольной точки для проверки.
	 * @returns {Boolean} `true` if the breakpoint matches, `false` if it's smaller.
	 * @returns {Boolean} `true ', если точка останова совпадает,` false`, если она меньше.
	 */
	atLeast(size) {
		const self = this;

		const query = self.get(size);

		if (query) {
			return matchMedia(query).matches;
		}

		return false;
	}

	/**
	 * Checks if the screen matches to a breakpoint.
	 * @function
	 * @param {String} size - Name of the breakpoint to check, either 'small only' or 'small'. Omitting 'only' falls back to using atLeast() method.
	 * @param {String} size - имя контрольной точки для проверки, либо «только малый», либо «маленький». Опускание «только» возвращается к использованию метода atLeast ().
	 * @returns {Boolean} `true` if the breakpoint matches, `false` if it does not.
	 * @returns {Boolean} `true ', если точка останова совпадает,` false`, если это не так.
	 */
	is(size) {
		const self = this;

		size = size.trim().split(' ');
		console.log(size);
		if (size.length > 1 && size[1] === 'only') {
			if (size[0] === self.getCurrentSize()){return true;}
		}else {
			return self.atLeast(size[0]);
		}
		return false;
	}

	/**
	 * Gets the media query of a breakpoint.
	 * @function
	 * @param {String} size - Name of the breakpoint to get.
	 * @returns {String|null} - The media query of the breakpoint, or `null` if the breakpoint doesn't exist.
	 */
	get(size) {
		const self = this;
		const returned = [];

		for (const i in self.queries) {
			if (self.queries.hasOwnProperty(i)) {
				const query = self.queries[i];
				returned.push(query.value);
				if (size === query.name){return returned;}
			}
		}

		return null;
	}

	/**
	 * Gets the current breakpoint name by testing every breakpoint and returning the last one to match (the biggest one).
	 * @function
	 * @private
	 * @returns {String} Name of the current breakpoint.
	 */
	getCurrentSize() {
		const self = this;

		const matched = [];
		// const returned = [];

		for (let i = 0; i < self.queries.length; i++) {
			const query = self.queries[i];

			if (matchMedia(query.value).matches) {
				matched.push(query);
			}
		}

		if (typeof matched === 'object' && matched.length === 1) {
			return matched.name;
		}
		return matched;

	}

	/**
	 * Activates the breakpoint watcher, which fires an event on the window whenever the breakpoint changes.
	 * @function
	 * @private
	 */
	watcher() {
		const self = this;

		$(window).off('resize.aero.mediaquery').on('resize.aero.mediaquery', () => {
			const newSize = self.getCurrentSize();
			const currentSize = self.current;

			if (newSize !== currentSize) {
				// Change the current media query
				self.current = newSize;

				// Broadcast the media query change on the window
				$(document).trigger( 'changed.aero.mediaquery', [ newSize, currentSize ] );
				// $(window).trigger('changed.aero.mediaquery', [newSize, currentSize]);
			}
		});

		$(document).on('changed.aero.mediaquery', (event, newSize) => {
			self.app.breakpoints = newSize;
			self.app.bp = newSize[newSize.length - 1];
		});
	}
}

const app = {};
const appResponse = {};
appResponse.MediaQuery = new MediaQuery(app);
appResponse.MediaQuery.init();
export {appResponse};
