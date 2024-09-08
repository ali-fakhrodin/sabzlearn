import { getAdminInfos } from "./funcs/utils.js";
const $ = document
window.addEventListener('load', () => {
     const adminWelcomeNameElem = $.querySelector('#admin-welcome-name')

     getAdminInfos()
          .then(admin => {
               adminWelcomeNameElem.innerHTML = ` ${admin.name}`
          })
})