/* global $ */

import {appResponse}from '../scripts/utils/aero.mediaquery';

const $html = $('html');
const $sliderOwlCarousel = $('.js-main-slider');

const mainSlider = () => {
	if (appResponse.MediaQuery.app.bp.name === 'xs'){
		if (!$html.is('.mobile-slieder')){
			$html.addClass('mobile-slieder');
			$html.removeClass('desctop-slieder');
			$sliderOwlCarousel.owlCarousel('destroy');
		}
	}else if (!$html.is('.desctop-slieder')){
		$html.addClass('desctop-slieder');
		$html.removeClass('mobile-slieder');
		$sliderOwlCarousel.owlCarousel({
			items: 1,
			nav: false,
			dots: false,
			loop: true,
			onInitialized() {
				$sliderOwlCarousel.append(`
					<div class="my-owl-nav">
						<div class="button-section">
							<button class="carousel__arrow carousel__arrow_prev js-carousel-owl-prev">
								<svg class="icon-chevron-down"><use xlink:href="/assets/images/icon.svg#icon_icon-chevron-down"></use></svg>
							</button>
							<button class="carousel__arrow carousel__arrow_next js-carousel-owl-next">
								<svg class="icon-chevron-down"><use xlink:href="/assets/images/icon.svg#icon_icon-chevron-down"></use></svg>
							</button>
						</div>
						<div class="number-section">
							<span class="current-number js-owl-current-number">1</span>
							/
							<span class="total-number js-owl-total-number">${$sliderOwlCarousel.find('.owl-item:not(.cloned)').length}</span>
						</div>
					</div>`);
			},
			onChanged(event) {
				const $numberContainer = $('.js-owl-current-number');
				if (event.item.index > 1){
					$numberContainer.text(event.item.index - 1);
				}else {
					$numberContainer.text($sliderOwlCarousel.find('.owl-item:not(.cloned)').length);
				}
				// Хотя можно было добавить id в html и зачитывать его.
			}
		});
	}
};


mainSlider();

$(window).on('resize', () => {
	mainSlider();
});

$('body').on('click', '.js-carousel-owl-next', e => {
	const $carousel = $(e.currentTarget).closest('.js-main-slider');
	$carousel.trigger('next.owl.carousel');
	const sliderActive = $carousel.find('.owl-item:not(.cloned)').map((ind, elem) => {if ($(elem).is('.active')){ return ind + 1;}})[0];
	$('.js-owl-current-number').text(sliderActive);
});

$('body').on('click', '.js-carousel-owl-prev', e => {
	const $carousel = $(e.currentTarget).closest('.js-main-slider');
	$carousel.trigger('prev.owl.carousel');
});

