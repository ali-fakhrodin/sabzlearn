import { getAdminInfos } from "./funcs/utils.js";

const $ = document
window.addEventListener('load', () => {
     const adminNameElem = $.querySelector('#admin-welcome-name')
     const adminWelcomeNameElem = $.querySelector('#admin-name')
     getAdminInfos().then(data => {
          console.log(data)

          if (data.role === 'ADMIN') {
               adminNameElem.innerHTML = ` ${data.name}`
               adminWelcomeNameElem.innerHTML = ` ${data.name}`
          } else {
               location.replace('../../login.html')
          }
     })
})