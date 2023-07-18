let selector = document.querySelector("#tel")
let selectorModal = document.querySelector("#tel-modal")
let wrapper = document.querySelector(".wrapper")
let modal_thank = document.querySelector("#modal-thank")
let modal = document.querySelector(".modal")
let im = new Inputmask("+7(999) 999-99-99")
im.mask(selector)
im.mask(selectorModal)

const validation = new JustValidate('#form');
const validator = new JustValidate('#modal-form');

validation.addField("#name", [
  {
    rule: "required",
    errorMessage: "Введите имя!"
  },
  {
    rule: "minLength",
    value: 2,
    errorMessage: "Минимум 2 символа!"
  }
]).addField("#tel", [
  {
    validator: (value) => {
      const phone = selector.inputmask.unmaskedvalue()
      return Boolean(Number(phone) && phone.length > 0)
    },
    errorMessage: 'Введите телефон!'
  },
  {
    validator: (value) => {
      const phone = selector.inputmask.unmaskedvalue()
      return Boolean(Number(phone) && phone.length === 10)
    },
    errorMessage: 'Введите телефон полностью!'
  }
]).onSuccess(async function () {
  let data = {
    name: document.getElementById("name").value,
    tel: selector.inputmask.unmaskedvalue(),
    msg: document.getElementById("msg").value,
  }

  let response = await fetch("files/php/mail.php", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json; charset=UTF-8"
    }
  })

  let result = await response.text()

  wrapper.classList.add("wrapper-active");
  modal_thank.classList.add("modal-thank-active");
  document.querySelector("#form").reset();
})


validator.addField("#name-modal", [
  {
    rule: "required",
    errorMessage: "Введите имя!"
  },
  {
    rule: "minLength",
    value: 2,
    errorMessage: "Минимум 2 символа!"
  }
]).addField("#tel-modal", [
  {
    validator: (value) => {
      const phone = selectorModal.inputmask.unmaskedvalue()
      return Boolean(Number(phone) && phone.length > 0)
    },
    errorMessage: 'Введите телефон!'
  },
  {
    validator: (value) => {
      const phone = selectorModal.inputmask.unmaskedvalue()
      return Boolean(Number(phone) && phone.length === 10)
    },
    errorMessage: 'Введите телефон полностью!'
  }
]).addField("#msg", [
  {
    rule: "required",
    errorMessage: "Опишите ваш проект!"
  },
  {
    rule: "minLength",
    value: 2,
    errorMessage: "Минимум 2 символа!"
  }
]).onSuccess(async function () {
  let data = {
    name: document.getElementById("name-modal").value,
    tel: selectorModal.inputmask.unmaskedvalue(),
    msg: document.getElementById("msg").value,
  }

  let response = await fetch("files/php/mail-modal.php", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json; charset=UTF-8"
    }
  })

  let result = await response.text()
  modal.classList.remove("modal-active");
  modal_thank.classList.add("modal-thank-active");
  document.querySelector("#modal-form").reset();
})