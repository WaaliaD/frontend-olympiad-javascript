(function() {
  /**
   * Служебная функция для заполнения диапазона слайдера цветом.
   * @param {number} from - начальное значение в %% диапазона.
   * @param {number} to - конечное значение в %% диапазона.
   * @param {HTMLElement} controlSlider - Элемент управления слайдером
   */
  const fillSlider = (from, to, controlSlider) => {
    const sliderColor = '#ffffff';
    const rangeColor = '#25daa5';
    controlSlider.style.background = `linear-gradient(
      to right,
      ${sliderColor} 0%,
      ${sliderColor} ${from}%,
      ${rangeColor} ${from}%,
      ${rangeColor} ${to}%,
      ${sliderColor} ${to}%,
      ${sliderColor} 100%)`;
  };

  /* Код компонента пишите ниже */

  document.querySelectorAll('.range_container').forEach(rangeContainer => handler(rangeContainer));

  function updateRange(rootElement) {
    fillSlider(rootElement.querySelector('.fromSlider').value / 12 * 100,
      rootElement.querySelector('.toSlider').value / 12 * 100,
      rootElement.querySelector('.toSlider'));
  }

  function handler(rootElement) {
    const toInput = rootElement.querySelector('.toInput')
    const toSlider = rootElement.querySelector('.toSlider')
    const fromInput = rootElement.querySelector('.fromInput')
    const fromSlider = rootElement.querySelector('.fromSlider')

    if(!rootElement.dataset.range) {
      fromInput.closest('.form_control_container').hidden = true
      fromSlider.hidden = true

      toInput.oninput = (event) => {
        toSlider.value = event.target.value;
      }

      toSlider.oninput = (event) => {
        toInput.value = event.target.value;
      }
    } else {
      const minDiff = +rootElement.dataset.minDiff;
      const maxDiff = +rootElement.dataset.maxDiff;

      toInput.oninput = (event) => {
        toSlider.value = event.target.value;
        updateRange(rootElement)
      }

      toInput.onchange = (event) => {
        let value = +event.target.value
        if(value < minDiff) {
          value = minDiff
          toInput.value = value;
        }
        if (value - fromInput.value > maxDiff) {
          fromInput.value = value - maxDiff
        }
        if (value - fromInput.value < minDiff) {
          fromInput.value = value - minDiff
        }

        toSlider.value = value
        fromSlider.value = fromInput.value;
        updateRange(rootElement)
      }

      fromInput.oninput = (event) => {
        fromSlider.value = event.target.value;
        updateRange(rootElement)
      }

      fromInput.onchange = (event) => {
        let value = +event.target.value
        if(value > 12 - minDiff) {
          value = 12 - minDiff
          fromInput.value = value;
        }
        if (toInput.value - value > maxDiff) {
          toInput.value = value + maxDiff
        }
        if (toInput.value - value < minDiff) {
          toInput.value = value + minDiff
        }

        fromSlider.value = value;
        toSlider.value = toInput.value;
        updateRange(rootElement)
      }

      toSlider.oninput = (event) => {
        let value = +event.target.value
        if(value < minDiff) {
          value = minDiff
          toSlider.value = value;
        }
        if (value - fromSlider.value > maxDiff) {
          fromSlider.value = value - maxDiff
        }
        if (value - fromSlider.value < minDiff) {
          fromSlider.value = value - minDiff
        }

        toInput.value = value;
        fromInput.value = fromSlider.value;

        toSlider.value = event.target.value;
        updateRange(rootElement)
      }

      fromSlider.oninput = (event) => {
        let value = +event.target.value
        if(value > 12 - minDiff) {
          value = 12 - minDiff
          fromSlider.value = value;
        }
        if (toSlider.value - value > maxDiff) {
          toSlider.value = value + maxDiff
        }
        if (toSlider.value - value < minDiff) {
          toSlider.value = value + minDiff
        }

        fromInput.value = value;
        toInput.value = toSlider.value;

        fromSlider.value = event.target.value;
        updateRange(rootElement)
      }
      updateRange(rootElement)
    }
  }
})();
