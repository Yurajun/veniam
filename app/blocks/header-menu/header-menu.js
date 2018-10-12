/* global $ */

import {appResponse}from '../scripts/utils/aero.mediaquery';

const $html                = $('html');

const $buttonOpenCloseMenu = $('.js-button-main-menu');
const $subMenu             = $('.js-header-menu .sub-menu');
const $backLinkSubMenu     = $('.js-header-menu .sub-menu ul li:first-child a');

const $buttonExtraMenu     = $('.js-extra-menu');

$buttonOpenCloseMenu.on('click', e => {
	e.preventDefault();
	const $button = $(e.currentTarget);
	if (!$button.is('.is-open')){
		$button.addClass('is-open');
		$html.addClass('is-open');
	}else {
		$button.removeClass('is-open');
		$html.removeClass('is-open');
		$buttonExtraMenu.find('ul').css('display', 'none');
		$buttonExtraMenu.find('.menu-button').removeClass('is-open');
	}
});

$subMenu.on('click', e => {
	e.preventDefault();
	if ($html.is('.mobile')){
		$(e.currentTarget).addClass('is-open');
	}else {
		$(e.currentTarget).removeClass('is-open');
	}
});

$backLinkSubMenu.on('click', e => {
	e.preventDefault();
	e.stopPropagation();
	$(e.currentTarget).closest('.sub-menu').removeClass('is-open');
});

$buttonExtraMenu.on('click', e => {
	e.preventDefault();
	if ($(e.target).closest('ul').length){
		return false;
	}
	const $currentElement = $(e.currentTarget);
	if ($html.is('.mobile') && $(e.currentTarget).find('ul').is(':hidden')){
		$currentElement.find('ul').slideDown();
		$currentElement.find('.menu-button').addClass('is-open');
	}else if ($html.is('.mobile')){
		$currentElement.find('ul').slideUp();
		$currentElement.find('.menu-button').removeClass('is-open');
	}
});

const mqOpenCloseMenu = () => {
	if (appResponse.MediaQuery.app.bp.name === 'xs'){
		if (!$html.is('.mobile')){
			$html.addClass('mobile');
			$html.removeClass('desctop');
			$buttonExtraMenu.find('ul').css('display', 'none');
		}
	}else if (!$html.is('.desctop')){
		$html.addClass('desctop');
		$html.removeClass('mobile');
		$buttonOpenCloseMenu.trigger('click');
		$('.js-button-main-menu.is-open').trigger('click');
		$subMenu.trigger('click');
		$backLinkSubMenu.trigger('click');
		$buttonExtraMenu.find('ul').css('display', 'block');
		$buttonExtraMenu.find('.menu-button').removeClass('is-open');
	}
};

mqOpenCloseMenu();

$(window).on('resize', () => {
	mqOpenCloseMenu();
});
