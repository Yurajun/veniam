/* global $ */
import {parseStyleToObject}from '../scripts/utils/aero.utilities';

const {xs, xl}          = parseStyleToObject($('meta.aero-mq').css('font-family'));
const $hitSalseCarousel = $('.js-hit-sales-carousel');

$hitSalseCarousel.owlCarousel({
	loop: true,
	nav: false,
	margin: 20,
	responsive: {
		[parseInt(xl, 10)]: {
			items: 3
		},
		[parseInt(xs, 10)]: {
			items: 1
		}
	},
	onInitialized() {
		$hitSalseCarousel.find('.owl-stage-outer')
			.css({
				'margin-left': `-${$hitSalseCarousel.find('.owl-item').outerWidth() + 20}px`,
				'margin-right': `-${$hitSalseCarousel.find('.owl-item').outerWidth() + 20}px`
			})
			.find('.slide').equalHeights();

	}
});
