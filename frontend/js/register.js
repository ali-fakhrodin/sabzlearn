import { register } from "./funcs/auth.js";

const $ = document

const form = $.querySelector('.login-form')

form.addEventListener('submit', (e) => {
     e.preventDefault()
     register()
})