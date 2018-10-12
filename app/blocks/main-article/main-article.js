/* global $ */

import {appResponse}from '../scripts/utils/aero.mediaquery';

const $html       = $('html');
const mainArticle = $('.js-article').find('p:not(:first-of-type)');
const btnShowMore = $('.js-show-more');

btnShowMore.on('click', () => {
	mainArticle.slideToggle();
});

const artMobele = () => {
	if (appResponse.MediaQuery.app.bp.name === 'xs'){
		if (!$html.is('.art-mobile')){
			mainArticle.slideUp();
			$html.addClass('art-mobile');
			$html.removeClass('art-desctop');
		}
	}else if (!$html.is('.art-desct')){
		mainArticle.slideDown();
		$html.removeClass('art-mobile');
		$html.addClass('art-desctop');
	}
};

artMobele();

$(window).on('resize', () => {
	artMobele();
});
