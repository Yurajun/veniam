/* global $ */
import {parseStyleToObject}from '../scripts/utils/aero.utilities';

const {xs, xl}             = parseStyleToObject($('meta.aero-mq').css('font-family'));
const $hitSalseCarousel    = $('.js-hit-sales-carousel');
const $containerNavHitSale = $('.js-navigation-hit-sale');

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
		$containerNavHitSale.append(`
			<div class="hit-sale-nav">
				<button class="carousel__arrow carousel__arrow_prev js-carousel-hit-owl-prev">
					<svg class="icon-chevron-down"><use xlink:href="/assets/images/icon.svg#icon_icon-chevron-down"></use></svg>
				</button>
				<button class="carousel__arrow carousel__arrow_next js-carousel-hit-owl-next">
					<svg class="icon-chevron-down"><use xlink:href="/assets/images/icon.svg#icon_icon-chevron-down"></use></svg>
				</button>
			</div>
		`);
	}
});

$('body').on('click', '.js-carousel-hit-owl-prev', () => {
	$hitSalseCarousel.trigger('next.owl.carousel');
});

$('body').on('click', '.js-carousel-hit-owl-next', () => {
	$hitSalseCarousel.trigger('prev.owl.carousel');
});
