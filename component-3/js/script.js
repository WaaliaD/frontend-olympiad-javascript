(function () {
  /* Код компонента пишите здесь */

  const phone = document.getElementById('phone');
  const checkinDate = document.getElementById('checkin-date');
  const checkoutDate = document.getElementById('checkout-date');
  const adults = document.getElementById('adults');
  const children = document.getElementById('children');

  const setError = (node) => {
    node.classList.add('field-error')
  }
  const setCorrect = (node) => {
    node.classList.add('field-correct')
  }

  const validatePhone = () => {
    setError(phone)
    if (phone.value.match(/^(\+7[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/)) {
      setCorrect(phone);
    }
  }

  const validateCheckDate = () => {
    setError(checkinDate)
    setError(checkoutDate)

    let start, finish = null;
    if (checkoutDate.value.match(/^\d{4}-\d{2}-\d{2}$/)) {
      finish = new Date(checkoutDate.value);
    }
    if (checkoutDate.value.match(/^\d{2}\.\d{2}\.\d{4}$/)) {
      let dates = checkoutDate.value.split('.')
      finish = new Date(`${dates[2]}-${dates[1]}-${dates[0]}`);
    }
    if (checkinDate.value.match(/^\d{4}-\d{2}-\d{2}$/)) {
      start = new Date(checkinDate.value);
    }
    if (checkinDate.value.match(/^\d{2}\.\d{2}\.\d{4}$/)) {
      let dates = checkinDate.value.split('.')
      start = new Date(`${dates[2]}-${dates[1]}-${dates[0]}`);
    }
    if (finish - start >= 345600000) {
      setCorrect(checkinDate)
      setCorrect(checkoutDate)
    }
  }

  const validatePeople = () => {
    setError(adults)
    setError(children)

    if (
      adults.value >= 1 &&
      children.value <= adults.value &&
      ((document.getElementById('radio-1').checked
          && adults.value === '1')
        || (document.getElementById('radio-3').checked
          && adults.value >= 2
          && children.value >= 1))
      ) {
      setCorrect(adults)
      setCorrect(children)
    }
  }

  const validate = (event) => {
    event.preventDefault();

    validatePhone();
    validateCheckDate();
    validatePeople();
  }

  document.querySelector('.submit-btn').onclick = (event) => validate(event)
})();
