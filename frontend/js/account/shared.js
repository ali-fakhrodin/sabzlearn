import { logOut } from '../../js/panel/funcs/utils.js';

window.addEventListener('load', () => {
     const logoutBtn = document.querySelector('#logout-user')

     logoutBtn.addEventListener('click', e => {
          e.preventDefault()
          logoutBtn()
     })

})