import { insertNotifItem, seenNotif } from "./funcs/notification.js";
import { getAdminInfos } from "./funcs/utils.js";

window.seenNotif = seenNotif

const $ = document
window.addEventListener('load', () => {
     const adminNameElem = $.querySelector('#admin-welcome-name')
     const adminWelcomeNameElem = $.querySelector('#admin-name')
     const notifIconElem = $.querySelector('#notifications-icon')
     const notifBoxElem = $.querySelector('.home-notification-modal')

     getAdminInfos()
          .then(admin => {
               console.log(admin)

               if (admin.role === 'ADMIN') {
                    adminNameElem.innerHTML = ` ${admin.name}`
                    adminWelcomeNameElem.innerHTML = ` ${admin.name}`
               } else {
                    location.replace('../../login.html')
               }

               notifIconElem.addEventListener('mouseenter', () => {
                    console.log('Enter');
                    notifBoxElem.classList.add('active-modal-notfication')
               })
               notifBoxElem.addEventListener('mouseleave', () => {
                    console.log('Leave');
                    notifBoxElem.classList.remove('active-modal-notfication')
               })

               insertNotifItem(admin.notifications)
          })
})