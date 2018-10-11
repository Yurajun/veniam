/* global ymaps */
/* eslint id-length: ["error", { "properties": "never" }] */

const init = () => {
	const myMap = new ymaps.Map('js-map',
		{
			center: [56.139122, 40.427182],
			zoom: 16,
			controls: []
		},
		{
			suppressObsoleteBrowserNotifier: true, // отключаем - Ссылка «Обновите браузер» для устаревших версий браузера
			yandexMapDisablePoiInteractivity: true, // отключаем активность левых точек на карте
			suppressMapOpenBlock: true // отключаем  — Ссылка «Открыть в Яндекс.Картах»
		});

	const myPlacemark = new ymaps.Placemark(
		[56.138888, 40.425369],
		{
			// Хинт показывается при наведении мышкой на иконку метки.
			hintContent: '',
			// Балун откроется при клике по метке.
			balloonContent: '',
			iconCaption: 'улица Луначарского, 43'
		},
		{
			preset: 'islands#blueCircleDotIconWithCaption',
			iconCaptionMaxWidth: '150'
		}
	);
	myMap.geoObjects.add(myPlacemark);

	myMap.behaviors.disable('scrollZoom');
	ymaps.domEvent.manager.group(document.querySelector('#js-map'))
		.add(['click', 'mouseleave'], event => {
			if (event.get('type') === 'click'){
				myMap.behaviors.enable('scrollZoom');
			}else if (event.get('type') === 'mouseleave') {
				myMap.behaviors.disable('scrollZoom');
			}
		});
};

ymaps.ready(init);
