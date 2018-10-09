/* global $ */

import {appResponse}from '../scripts/utils/aero.mediaquery';

const $html = $('html');
const $buttonCategories = $('.js-show-all-categories');

const categories = () => {
	if (appResponse.MediaQuery.app.bp.name === 'xs'){
		if (!$html.is('cat-mobile')){
			$html.addClass('cat-mobile');
			$html.removeClass('cat-desctop');
			$buttonCategories.siblings('.js-categories-list').find('li').hide();
		}
	}else if (!$html.is('cat-desctop')){
		$html.removeClass('cat-mobile');
		$html.addClass('cat-desctop');
		$buttonCategories.siblings('.js-categories-list').find('li').show();
	}
};

$buttonCategories.on('click', e => {
	const $button = $(e.currentTarget);
	if (!$button.is('.is-open')){
		$button.siblings('.js-categories-list').find('li').slideDown();
		$button.addClass('is-open');
	}else {
		$button.siblings('.js-categories-list').find('li').slideUp();
		$button.removeClass('is-open');
	}
});

categories();

$(window).on('resize', () => {
	categories();
});
