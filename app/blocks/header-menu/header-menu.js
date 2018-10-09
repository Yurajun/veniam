/* global $ */

import {appResponse}from '../scripts/utils/aero.mediaquery';

const $html                = $('html');

const $buttonOpenCloseMenu = $('.js-button-main-menu');
const $subMenu             = $('.js-header-menu .sub-menu');
const $backLinkSubMenu     = $('.js-header-menu .sub-menu ul li:first-child a');

const $buttonExtraMenu     = $('.js-extra-menu');

$buttonOpenCloseMenu.on('click', e => {
	const $button = $(e.currentTarget);
	if (!$button.is('.is-open')){
		$button.addClass('is-open');
		$html.addClass('is-open');
	}else {
		$button.removeClass('is-open');
		$html.removeClass('is-open');
	}
});

$subMenu.on('click', e => {
	if ($html.is('.mobile')){
		$(e.currentTarget).addClass('is-open');
	}else {
		$(e.currentTarget).removeClass('is-open');
	}
});

$backLinkSubMenu.on('click', e => {
	e.stopPropagation();
	$(e.currentTarget).closest('.sub-menu').removeClass('is-open');
});

$buttonExtraMenu.on('click', e => {
	console.log($(e.currentTarget).find('ul'));
	if ($html.is('.mobile') && $(e.currentTarget).find('ul').is(':hidden')){
		$(e.currentTarget).find('ul').slideDown();
	}else if ($html.is('.mobile')){
		$(e.currentTarget).find('ul').slideUp();
	}
});

const mqOpenCloseMenu = () => {
	if (appResponse.MediaQuery.app.bp.name === 'xs'){
		if (!$html.is('.mobile')){
			$html.addClass('mobile');
			$html.removeClass('desctop');
		}
	}else if (!$html.is('.desctop')){
		$html.addClass('desctop');
		$html.removeClass('mobile');
		$buttonOpenCloseMenu.trigger('click');
		$('.js-button-main-menu.is-open').trigger('click');
		$subMenu.trigger('click');
		$backLinkSubMenu.trigger('click');
		$($buttonExtraMenu).find('ul').css('display', 'block');
	}
};

mqOpenCloseMenu();

$(window).on('resize', () => {
	mqOpenCloseMenu();
});
