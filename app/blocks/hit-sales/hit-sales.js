/* global $ */
import {appResponse}from '../scripts/utils/aero.mediaquery';
import {parseStyleToObject}from '../scripts/utils/aero.utilities';

const {xs, xl}             = parseStyleToObject($('meta.aero-mq').css('font-family'));
const $hitSalseCarousel    = $('.js-hit-sales-carousel');
const $containerNavHitSale = $('.js-navigation-hit-sale');
const gapSlide             = 20;

$hitSalseCarousel.owlCarousel({
	loop: true,
	nav: false,
	responsive: {
		[parseInt(xl, 10)]: {
			items: 3,
			margin: gapSlide,
			dots: false
		},
		[parseInt(xs, 10)]: {
			items: 1,
			dots: true,
			margin: 22,
			autoHeight: true
		}
	},
	onInitialized() {
		if (appResponse.MediaQuery.app.bp.name === 'xl'){
			setTimeout(() => {
				$hitSalseCarousel.find('.owl-stage-outer')
					.css({
						'margin-left': `-${$hitSalseCarousel.find('.owl-item').outerWidth() + gapSlide}px`,
						'margin-right': `-${$hitSalseCarousel.find('.owl-item').outerWidth() + gapSlide}px`
					})
					.find('.owl-item').equalHeights();
			}, 0);
		}
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
	},
	onChanged() {
		if (appResponse.MediaQuery.app.bp.name === 'xs'){
			setTimeout(() => {
				$hitSalseCarousel.find('.owl-stage-outer')
					.css({
						'margin-left': 0,
						'margin-right': 0
					})
					.find('.owl-item').equalHeights();
			}, 0);
		}else {
			setTimeout(() => {
				$hitSalseCarousel.find('.owl-stage-outer')
					.css({
						'margin-left': `-${$hitSalseCarousel.find('.owl-item').outerWidth() + gapSlide}px`,
						'margin-right': `-${$hitSalseCarousel.find('.owl-item').outerWidth() + gapSlide}px`
					})
					.find('.owl-item').equalHeights();
			}, 0);
		}
	}
});

$('body').on('click', '.js-carousel-hit-owl-prev', () => {
	$hitSalseCarousel.trigger('next.owl.carousel');
});

$('body').on('click', '.js-carousel-hit-owl-next', () => {
	$hitSalseCarousel.trigger('prev.owl.carousel');
});
