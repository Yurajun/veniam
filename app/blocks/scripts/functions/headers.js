/* global $ */

export const headerH2 = elem => {
	$(elem).each((ind, el) => {
		const txt = $(el);
		txt.html(txt.html().replace(/^(\S+)/, '<span>$1</span>'));
	});
};
