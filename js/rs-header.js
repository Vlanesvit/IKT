/* ====================================
Меню
==================================== */
function menuFunction() {
	const menus = document.querySelectorAll('.rs-header__menu');

	// Бургер-кнопка
	function burger() {
		menus.forEach(menu => {
			const menuBurgerBtns = menu.querySelectorAll('.menu__icon');

			if (menuBurgerBtns) {
				menuBurgerBtns.forEach(btn => {
					// Открываем меню
					btn.addEventListener("click", function (e) {
						e.preventDefault();
						menuToggle("menu-open");
					});
				});
			}
		});
	};
	burger()

	// Меню
	function menuInit() {
		menus.forEach(menu => {
			// Все пункты
			const menuItem = menu.querySelectorAll('.menu__list li');

			// Все пункты с выпадающим меню
			const menuItemDropdowns = menu.querySelectorAll('.menu__list .menu__dropdown');
			const menuItemDropdownsMenu = menu.querySelectorAll('.menu__list .menu__dropdown_list');

			// Блоки, которые копируются во вкладки
			const contactBlock = menu.querySelector('.menu__contact');
			menuItemDropdownsMenu.forEach(menuDropdown => {
				if (contactBlock) {
					const contactClone = contactBlock.cloneNode(true);
					menuDropdown.appendChild(contactClone);
				}
			});

			// Добавляем иконки в пункты с выпадающим меню
			menuItemDropdowns.forEach(item => {
				let icon = document.createElement('button');
				icon.setAttribute('type', 'button');
				icon.classList.add('menu__dropdown_arrow')
				item.append(icon);
			});

			// Добавляем иконки в пункты с выпадающим меню
			menuItemDropdownsMenu.forEach(list => {
				let back = document.createElement('li');
				back.classList.add('menu-item', 'switch-back');
				list.prepend(back);

				let btn = document.createElement('a');
				btn.setAttribute('href', '#');

				// Найдем элемент .menu__dropdown и проверим наличие <a>
				const menuLink = back.closest('.menu__dropdown')?.querySelector('a');

				if (menuLink) {
					btn.textContent = menuLink.textContent; // Добавляем текст только если <a> найден
				} else {
					btn.textContent = 'Назад'; // Запасной текст
				}

				back.prepend(btn);
			});

			// Функция для отдельных уровней меню, чтобы открывался только один пункт, а открытые закрывались, кроме тех, кто выше уровнем
			function openLvlMenu() {
				document.addEventListener('click', (e) => {
					if (e.target.classList.contains('menu__dropdown_arrow')) {
						const menuItemIcons = e.target;
						const currentDropdown = menuItemIcons.closest('.menu__dropdown');
						const parentDropdown = currentDropdown?.parentElement.closest('.menu__dropdown');
						currentDropdown.classList.add('_open-menu');

						if (parentDropdown) {
							parentDropdown.classList.add('_block-menu');
						}

						if (!document.documentElement.classList.contains('dropdown-menu-open')) {
							document.documentElement.classList.add('dropdown-menu-open');
						}
					}

					// Клик на кнопку "Назад" или её дочерние элементы
					const switchBackBtn = e.target.closest('.switch-back');
					if (switchBackBtn) {
						const currentDropdown = switchBackBtn.closest('.menu__dropdown');
						const parentDropdown = currentDropdown?.parentElement.closest('.menu__dropdown');
						currentDropdown.classList.remove('_open-menu');

						if (parentDropdown) {
							parentDropdown.classList.remove('_block-menu');
						}

						if (!document.documentElement.classList.contains('dropdown-menu-open')) {
							document.documentElement.classList.add('dropdown-menu-open');
						}

						// Получаем все элементы с классом _open-menu из массива menuItemDropdowns
						const openMenus = Array.from(menuItemDropdowns).filter(item => item.classList.contains('_open-menu'));
						// Если таких элементов 0 или меньше, убираем класс у document.documentElement
						if (openMenus.length <= 0) {
							document.documentElement.classList.remove('dropdown-menu-open');
						}
					}
				});
			}
			openLvlMenu()

			// При клике на бургер убираем открые меню и активные класс
			document.addEventListener("click", function (e) {
				if (e.target.closest('.menu__icon')) {
					menuItemDropdowns.forEach(item => {
						item.classList.remove('_open-menu');
					});
				}
			});
		});
	}
	menuInit()

	// Функции открытия меню с блокировкой скролла
	function menuOpen(classes) {
		document.documentElement.classList.add(classes);
	}
	function menuClose(classes) {
		document.documentElement.classList.remove(classes);
	}
	function menuToggle(classes) {
		bodyLockToggle();
		document.documentElement.classList.toggle(classes);
	}
}
menuFunction()

/* ====================================
Якорные ссылки
==================================== */
// data-goto - указать ID блока
// data-goto-header - учитывать header
// data-goto-top - недокрутить на указанный размер
// data-goto-speed - скорость (только если используется доп плагин)
let gotoblock_gotoBlock = (targetBlock, noHeader = true, speed = 500, offsetTop = 100) => {
	const targetBlockElement = document.querySelector(targetBlock);
	if (targetBlockElement) {
		let headerItem = "";
		let headerItemHeight = 0;
		if (noHeader) {
			headerItem = ".rs-header";
			const headerElement = document.querySelector(headerItem);
			if (!headerElement.classList.contains("_header-scroll")) {
				headerElement.style.cssText = `transition-duration: 0s;`;
				headerElement.classList.add("_header-scroll");
				headerItemHeight = headerElement.offsetHeight;
				headerElement.classList.remove("_header-scroll");
				setTimeout((() => {
					headerElement.style.cssText = ``;
				}), 0);
			} else headerItemHeight = headerElement.offsetHeight;
		}
		let options = {
			speedAsDuration: true,
			speed,
			header: headerItem,
			offset: offsetTop,
			easing: "linear"
		};
		document.documentElement.classList.contains("menu-open") ? menuClose() : null;
		if ("undefined" !== typeof SmoothScroll) (new SmoothScroll).animateScroll(targetBlockElement, "", options); else {
			let targetBlockElementPosition = targetBlockElement.getBoundingClientRect().top + scrollY;
			targetBlockElementPosition = headerItemHeight ? targetBlockElementPosition - headerItemHeight : targetBlockElementPosition;
			targetBlockElementPosition = offsetTop ? targetBlockElementPosition - offsetTop : targetBlockElementPosition;
			window.scrollTo({
				top: targetBlockElementPosition,
				behavior: "smooth"
			});
		};
	};
}
function pageNavigation() {
	document.addEventListener("click", pageNavigationAction);
	document.addEventListener("watcherCallback", pageNavigationAction);
	function pageNavigationAction(e) {
		if ("click" === e.type) {
			const targetElement = e.target;
			if (targetElement.closest("[data-goto]")) {
				const gotoLink = targetElement.closest("[data-goto]");
				const gotoLinkSelector = gotoLink.dataset.goto ? gotoLink.dataset.goto : "";
				const noHeader = gotoLink.hasAttribute("data-goto-header") ? true : false;
				const gotoSpeed = gotoLink.dataset.gotoSpeed ? gotoLink.dataset.gotoSpeed : 500;
				const offsetTop = gotoLink.dataset.gotoTop ? parseInt(gotoLink.dataset.gotoTop) : 0;
				gotoblock_gotoBlock(gotoLinkSelector, noHeader, gotoSpeed, offsetTop);
				e.preventDefault();
			}
		} else if ("watcherCallback" === e.type && e.detail) {
			const entry = e.detail.entry;
			const targetElement = entry.target;
			if ("navigator" === targetElement.dataset.watch) {
				document.querySelector(`[data-goto]._navigator-active`);
				let navigatorCurrentItem;
				if (targetElement.id && document.querySelector(`[data-goto="#${targetElement.id}"]`)) navigatorCurrentItem = document.querySelector(`[data-goto="#${targetElement.id}"]`); else if (targetElement.classList.length) for (let index = 0; index < targetElement.classList.length; index++) {
					const element = targetElement.classList[index];
					if (document.querySelector(`[data-goto=".${element}"]`)) {
						navigatorCurrentItem = document.querySelector(`[data-goto=".${element}"]`);
						break;
					}
				}
				if (entry.isIntersecting) navigatorCurrentItem ? navigatorCurrentItem.classList.add("_navigator-active") : null; else navigatorCurrentItem ? navigatorCurrentItem.classList.remove("_navigator-active") : null;
			}
		}
	}
}
pageNavigation();

/* ====================================
Header при скролле
==================================== */
function headerScroll() {
	const header = document.querySelector('.rs-header');
	const headerTag = document.querySelector('header');
	let lastScrollTop = 0;

	function headerClassAdd() {
		header.classList.toggle('_header-scroll', window.scrollY > 0)
		let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

		// Проверка на присутствие класса для бургер-меню. Если он есть, то шапка не скрывается
		if (document.documentElement.classList.contains("menu-open")) {
			header.style.top = "0px";
		}
		else {
			// Скрытие шапки
			if (scrollTop > lastScrollTop) {
				header.style.transform = `translateY(-${header.clientHeight}px)`;
				header.classList.remove('_header-show');
			} else {
				header.style.transform = "translateY(0px)";
				header.classList.add('_header-show');
			}
		}
		lastScrollTop = scrollTop;
	}

	window.addEventListener('scroll', function () {
		headerClassAdd()
	})
	window.addEventListener('load', function () {
		headerClassAdd();
		headerTag.style.height = header.clientHeight + 'px';
	})
	window.addEventListener('resize', function () {
		headerClassAdd();
		headerTag.style.height = header.clientHeight + 'px';

	})
}
headerScroll()