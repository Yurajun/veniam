/* global jQuery */

(function ($) {
	$.fn.equalHeights = function () {
		const $items = $(this);
		function equalize() {
			$items.height('initial');
			let maxH = $items.eq(0).height();
			$items.each(function () {
				maxH = ($(this).height() > maxH) ? $(this).height() : maxH;
			});
			$items.height(maxH);
		}
		equalize();
		$(window).bind('resize', function () {
			equalize();
		});
	};
})(jQuery);
