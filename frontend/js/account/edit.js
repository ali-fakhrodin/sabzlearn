import { updateUser } from "../panel/funcs/users.js";
import { getAndShowUserInfosInEdit } from "./funcs/edit.js";


window.addEventListener('load', () => {
     const editInfoBtn = document.querySelector('#edit-info-btn')
     
     editInfoBtn.addEventListener('click', e => {
          e.preventDefault()
          console.log(editInfoBtn);
          updateUser()
          
     })
     getAndShowUserInfosInEdit()
})