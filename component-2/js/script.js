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
   * Настройки слайдера, параметры получаются из командной строки
   * pagination - boolean, отображает пагинацию
   * loop - boolean, зацикливает слайдер
   *
   * Для тестирования работы своего скрипта при разных значениях параметров временно
   * переопределяйте значение переменных, хранящих эти параметр.
   * Либо можете дописыват гет-параметры с нужным значением в конец адресной строки,
   * например: ?pagination=1&loop=0
   */
  const settings = {
    pagination: !!getUrlValue('pagination'),
    loop: !!getUrlValue('loop'),
  };

  /* Код компонента пишите ниже */

  const sliderItems = document.querySelector('.slider-items');
  const prevButton = document.querySelector('.slider-toggle--prev')
  const nextButton = document.querySelector('.slider-toggle--next')
  const sliderPagination = document.querySelector('.slider-pagination');

  let currentNumber = 0, prevNumber = 0;

  const render = () => {
    sliderItems.children[prevNumber].classList.remove('slider-item--current');
    sliderPagination.children[prevNumber].firstElementChild.disabled = false;
    sliderItems.children[currentNumber].classList.add('slider-item--current');
    sliderPagination.children[currentNumber].firstElementChild.disabled = true;

    if (!settings.loop) {
      if(currentNumber === 0) {
        prevButton.disabled = true;
        nextButton.disabled = false;
      } else if (currentNumber === 2)  {
        nextButton.disabled = true;
        prevButton.disabled = false;
      } else {
        nextButton.disabled = false;
        prevButton.disabled = false;
      }
    }

    if (settings.loop) {
      nextButton.disabled = false;
      prevButton.disabled = false;
    }
  }

  if (settings.pagination) {
    sliderPagination.classList.add('slider-pagination--shown')
  }

  prevButton.onclick = () => {
    prevNumber = currentNumber;
    if(currentNumber === 0) {
      currentNumber = 2
    } else {
      currentNumber--
    }
    render();
  }

  nextButton.onclick = () => {
    prevNumber = currentNumber;
    if(currentNumber === 2) {
      currentNumber = 0
    } else {
      currentNumber++
    }
    render();
  }

  for (let i = 0; i < 3; i++) {
    sliderPagination.children[i].onclick = () => {
      prevNumber = currentNumber;
      currentNumber = i;
      render();
    }
  }

  render();
})();
