import { updateUser } from "./funcs/users.js";

window.addEventListener('load', () => {
     const editBtn = document.querySelector('#edit-btn')
     
     editBtn.addEventListener('click', e => {
          e.preventDefault()
          updateUser()
     })
})