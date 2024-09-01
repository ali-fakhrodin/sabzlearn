import { submitContancUsMsg } from "./funcs/shared.js";

const loginFormBtn = document.querySelector('.login-form__btn')

loginFormBtn.addEventListener('click', e => {
     e.preventDefault()
     // if (submitContancUsMsg.status === 201) {
          submitContancUsMsg()
     // }
})