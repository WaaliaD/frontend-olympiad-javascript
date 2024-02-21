(function() {
  /**
   * Служебная функция для считывания параметров из адресной строки
   * и определения конфигурации компонента
   * @param  {string} name - имя параметра
   * @return {number} - значение параметра в адресной строке
   */
  const getUrlValue = (name) => {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get(name), 10);
  };

  /**
   * Настройки аккордеона, параметры получаются из командной строки
   *
   * tabs_limit - number, максимальное количество одновременно открытых элементов,
   * по умолчанию 0 - не ограничено
   *
   * Для тестирования работы своего скрипта при разных значениях tabs_limit
   * временно переопределяйте значение переменной, хранящей этот параметр.
   * Либо можете дописыват GET-параметр с нужным значением в конец адресной строки,
   * например: ?tabs_limit=1
   */
  const settings = {
    tabsLimit: getUrlValue('tabs_limit') || 0,
  };

  /* Код компонента пишите ниже */

  let stack = [];

  const accordeon = document.querySelector('.accordeon')

  accordeon.onclick = (event) => {
    const elem = event.target.closest('div.accordeon-item-title');

    if (!elem || !elem.parentElement || !accordeon.contains(elem)) return;

    if(settings.tabsLimit === 0) {
      elem.parentElement.classList.toggle('accordeon-item--open')
    }
    if (settings.tabsLimit !== 0) {
      if(elem.parentElement.classList.contains('accordeon-item--open')) {
        stack = stack.filter(item => elem.parentElement !== item);
        elem.parentElement.classList.remove('accordeon-item--open')
      } else {
        if(settings.tabsLimit === stack.length) {
          stack.shift().classList.remove('accordeon-item--open')
        }
        stack.push(elem.parentElement);
        elem.parentElement.classList.toggle('accordeon-item--open')
      }
    }
  }
})();
