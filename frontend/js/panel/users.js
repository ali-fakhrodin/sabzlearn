import { getAndShowAllUsers, removeUser, banUser, createNewUsers, changeRole } from "./funcs/users.js";

window.changeRole = changeRole
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