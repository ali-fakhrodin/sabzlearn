import { getAndShowAllUsers, removeUser, banUser, createNewUsers } from "./funcs/users.js";

window.removeUser = removeUser
window.banUser = banUser

window.addEventListener('load', () => {
     const addNewUserBtn = document.querySelector('#add-new-user-btn')

     addNewUserBtn.addEventListener('click', event => {
          event.preventDefault()
          createNewUsers()
     })
     
     getAndShowAllUsers()
})