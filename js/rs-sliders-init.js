/*
Документация слайдера: https://swiperjs.com/
*/

// Инициализация слайдеров
function initSliders() {
	// Перечень слайдов
	if (document.querySelector('.rs-slider__slider')) {
		const sliderBlocks = document.querySelectorAll('.rs-slider');
		sliderBlocks.forEach(sliderBlock => {
			const slider = sliderBlock.querySelector('.rs-slider__slider');
			const pagination = sliderBlock.querySelector('.rs-slider__pagination');
			const arrowNext = sliderBlock.querySelector('.rs-slider__button-next');
			const arrowPrev = sliderBlock.querySelector('.rs-slider__button-prev');

			const sliderSwiper = new Swiper(slider, {
				// // Автопрокрутка
				// autoplay: {
				// 	// Пауза между прокруткой
				// 	delay: 10000,
				// 	// Закончить на последнем слайде
				// 	stopOnLastSlide: false,
				// 	// Отключить после ручного переключения
				// 	disableOnInteraction: false,
				// },

				// Обновить свайпер
				// при изменении элементов слайдера
				observer: true,
				// при изменении родительских элементов слайдера
				observeParents: true,
				// при изменении дочерних элементов слайдера
				observeSlideChildren: true,

				// Скорость смены слайдов
				speed: 800,

				// Включение/отключение
				// перетаскивание на ПК
				simulateTouch: true,
				// Чувствительность свайпа
				touchRadio: 1,
				// Угол срабатывания свайпа/перетаскивания
				touchAngle: 45,

				// Цикличность слайдера
				// loop: true,

				// Анимация переключения
				effect: 'fade',

				// Пагинация
				pagination: {
					el: pagination,
					clickable: true,
					// Преобразуем в формат '01', '02', '03'
					renderBullet: function (index, className) {
						let number = (index + 1).toString().padStart(2, '0');
						return `<span class="${className}">${number}</span>`;
					}
				},

				// Стрелки
				navigation: {
					nextEl: arrowNext,
					prevEl: arrowPrev,
				},

				slidesPerView: 1,
			});
		});
	}

	if (document.querySelector('.rs-services__slider')) {
		// До этой ширины слайдер будет неактивным
		const breakpoint = window.matchMedia('(min-width: 991.98px)');

		let sliderSwiper;

		const breakpointChecker = function () {
			if (breakpoint.matches === true) {
				// Выключаем слайдер
				if (sliderSwiper !== undefined) sliderSwiper.destroy(true, true);
				return;
			} else if (breakpoint.matches === false) {
				// Включаем слайдер
				return enableSwiper();
			}
		};

		// Инициализация слайдера
		const enableSwiper = function () {
			const sliderBlocks = document.querySelectorAll('.rs-services');

			sliderBlocks.forEach(sliderBlock => {
				const sliders = sliderBlock.querySelectorAll('.rs-services__slider');

				sliders.forEach(slider => {
					const arrowPrev = sliderBlock.querySelector('.rs-services__button-prev');
					const arrowNext = sliderBlock.querySelector('.rs-services__button-next');
					const pagination = sliderBlock.querySelector('.rs-services__pagination');

					sliderSwiper = new Swiper(slider, {
						// // Автопрокрутка
						// autoplay: {
						// 	// Пауза между прокруткой
						// 	delay: 10000,
						// 	// Закончить на последнем слайде
						// 	stopOnLastSlide: false,
						// 	// Отключить после ручного переключения
						// 	disableOnInteraction: false,
						// },

						// Обновить свайпер
						// при изменении элементов слайдера
						observer: true,
						// при изменении родительских элементов слайдера
						observeParents: true,
						// при изменении дочерних элементов слайдера
						observeSlideChildren: true,

						// Скорость смены слайдов
						speed: 500,

						// Включение/отключение
						// перетаскивание на ПК
						simulateTouch: true,
						allowTouchMove: true,
						// Чувствительность свайпа
						touchRadio: 1,
						// Угол срабатывания свайпа/перетаскивания
						touchAngle: 45,

						// Цикличность слайдера
						// loop: true,

						// Анимация переключения
						// effect: 'fade',

						// Курсор перетаскивания
						grabCursor: true,

						// Стрелки
						navigation: {
							prevEl: arrowPrev,
							nextEl: arrowNext,
						},

						// Пагинация
						pagination: {
							el: pagination,
							clickable: true,
						},

						// Брекпоинты (адаптив)
						breakpoints: {
							320: {
								slidesPerView: 1.1,
								spaceBetween: 16,
							},
							539.98: {
								slidesPerView: 2,
								spaceBetween: 16,
							},
							767.98: {
								slidesPerView: 3,
								spaceBetween: 36,
							},
						},
					});
				});

			});
		}

		breakpoint.addListener(breakpointChecker);
		breakpointChecker();
	}

	if (document.querySelector('.rs-catalog-nav__slider')) {
		// До этой ширины слайдер будет неактивным
		const breakpoint = window.matchMedia('(min-width: 991.98px)');

		let sliderSwiper;

		const breakpointChecker = function () {
			if (breakpoint.matches === true) {
				// Выключаем слайдер
				if (sliderSwiper !== undefined) sliderSwiper.destroy(true, true);
				return;
			} else if (breakpoint.matches === false) {
				// Включаем слайдер
				return enableSwiper();
			}
		};

		// Инициализация слайдера
		const enableSwiper = function () {
			const sliderBlocks = document.querySelectorAll('.rs-catalog-nav');

			sliderBlocks.forEach(sliderBlock => {
				const sliders = sliderBlock.querySelectorAll('.rs-catalog-nav__slider');

				sliders.forEach(slider => {
					const arrowPrev = sliderBlock.querySelector('.rs-catalog-nav__button-prev');
					const arrowNext = sliderBlock.querySelector('.rs-catalog-nav__button-next');
					const pagination = sliderBlock.querySelector('.rs-catalog-nav__pagination');

					sliderSwiper = new Swiper(slider, {
						// // Автопрокрутка
						// autoplay: {
						// 	// Пауза между прокруткой
						// 	delay: 10000,
						// 	// Закончить на последнем слайде
						// 	stopOnLastSlide: false,
						// 	// Отключить после ручного переключения
						// 	disableOnInteraction: false,
						// },

						// Обновить свайпер
						// при изменении элементов слайдера
						observer: true,
						// при изменении родительских элементов слайдера
						observeParents: true,
						// при изменении дочерних элементов слайдера
						observeSlideChildren: true,

						// Скорость смены слайдов
						speed: 500,

						// Включение/отключение
						// перетаскивание на ПК
						simulateTouch: true,
						allowTouchMove: true,
						// Чувствительность свайпа
						touchRadio: 1,
						// Угол срабатывания свайпа/перетаскивания
						touchAngle: 45,

						// Цикличность слайдера
						// loop: true,

						// Анимация переключения
						// effect: 'fade',

						// Курсор перетаскивания
						grabCursor: true,

						// Стрелки
						navigation: {
							prevEl: arrowPrev,
							nextEl: arrowNext,
						},

						// Пагинация
						pagination: {
							el: pagination,
							clickable: true,
						},

						// Брекпоинты (адаптив)
						breakpoints: {
							320: {
								slidesPerView: 1.1,
								spaceBetween: 16,
							},
							539.98: {
								slidesPerView: 2,
								spaceBetween: 16,
							},
							767.98: {
								slidesPerView: 3,
								spaceBetween: 36,
							},
						},
					});
				});

			});
		}

		breakpoint.addListener(breakpointChecker);
		breakpointChecker();
	}
}

window.addEventListener("load", function (e) {
	// Запуск инициализации слайдеров
	if (document.querySelector('.swiper')) {
		initSliders();
	}
});