import { insertNotifItem, seenNotif } from "./funcs/notification.js";
import { getAdminInfos, logOut } from "./funcs/utils.js";

window.seenNotif = seenNotif

const $ = document
window.addEventListener('load', () => {
     const adminNameElem = $.querySelector('#admin-name')
     const notifIconElem = $.querySelector('#notifications-icon')
     const notifBoxElem = $.querySelector('.home-notification-modal')
     const logoutBtn = $.querySelector('#logout-btn')

     getAdminInfos()
          .then(admin => {
               console.log(admin)

               if (admin.role === 'ADMIN') {
                    adminNameElem.innerHTML = ` ${admin.name}`
               } else {
                    location.replace('../../login.html')
               }

               notifIconElem.addEventListener('mouseenter', () => {
                    notifBoxElem.classList.add('active-modal-notfication')
               })
               notifBoxElem.addEventListener('mouseleave', () => {
                    console.log('Leave');
                    notifBoxElem.classList.remove('active-modal-notfication')
               })

               insertNotifItem(admin.notifications)
          })

     logoutBtn.addEventListener('click', e => {
          e.preventDefault()

          Swal.fire({
               title: 'آیا از خروج مطمئنی؟',
               confirmButtonText: 'بله',
               showCancelButton: true,
               cancelButtonText: 'خیر'
          }).then(result => {
               if (result.isConfirmed) {
                    logOut()
                    console.log(result);
                    Swal.fire({
                         title: 'خارج شدید!',
                         icon: 'success',
                         toast: true,
                         position: 'top-start',
                         showConfirmButton: false,
                         timer: 1200,
                         timerProgressBar: true,
                    }).then(() => location.href = '../../index.html')
               }
          })
     })
})