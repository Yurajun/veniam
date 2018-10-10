/* global $ */

const x = String;
x.prototype.byteLength = function (){
	const str = this;
	const length = str.length;
	let count = 0;
	let i = 0;
	let ch = 0;
	for (i; i < length; i++){
		ch = str.charCodeAt(i);
		if (ch <= 127){
			count++;
		}else if (ch <= 2047){
			count += 2;
		}else if (ch <= 65535){
			count += 3;
		}else if (ch <= 2097151){
			count += 4;
		}else if (ch <= 67108863){
			count += 5;
		}else {
			count += 6;
		}
	}
	return count;
};

/* NAME */
$.validator.addMethod('js-name-valid', value => {
	return value.length;
}, '');

/* PHONE */
$.validator.addMethod('js-phone-valid', value => {
	const phoneNumberPattern = /^((\+?7|8)[ \-] ?)?((\(\d{3}\))|(\d{3}))?([ \-])?(\d{3}[\- ]?\d{2}[\- ]?\d{2})$/;
	return phoneNumberPattern.test(value);
}, '');

/* EMAIL */
$.validator.addMethod('js-email-valid', function (value, element){
	return (this.optional(element) || /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)) && (value.byteLength() <= 254);
}, '');

/* CHECKBOX */
$.validator.addMethod('js-check-valid', value => {
	return (typeof value !== 'undefined' && value !== false);
}, '');

$.validator.messages.required = '';

$('form[data-validate=Y]').each((ind, el) => {
	$(el).validate();
});

$(document).on('submit', 'form.js-form', e => {
	e.preventDefault();

	const self = $(e.currentTarget);

	if (self.data('validate') === 'Y' && self.valid()){
		console.log('submit ajax valid form');

		self.find('.js-form-success').addClass('active').hide().fadeIn();
		self.find('.js-form-helper').addClass('hide');
		setTimeout(() => {
			self.find('.js-form-success').removeClass('active').fadeOut();
			self.find('.js-form-helper').removeClass('hide');
		}, 5000);

	}else {
		console.log('simple ajax form');

	}
});

