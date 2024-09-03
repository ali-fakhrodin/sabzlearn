import { getToken } from "../../funcs/utils.js";
import { getAdminInfos } from "./utils.js"; // For Update When Notif Removed

const insertNotifItem = (notifs) => {
     const notifModalListElem = document.querySelector('.home-notification-modal-list')
     notifModalListElem.innerHTML = ''

     if (notifs.length) {
          notifs.forEach(notifs => {
               console.log(notifs);

               notifModalListElem.insertAdjacentHTML('beforeend', `
                    <li class="home-notification-modal-item">
                         <span class="home-notification-modal-text">${notifs.msg}</span>
                         <a onclick=seenNotif('${notifs._id}')>دیدم</a>
                    </li>
               `)
          });

     } else {
          notifModalListElem.innerHTML = `<p class="alert alert-danger text-center">هیچ پیغامی برای شما وجود ندارد</p>`
     }
}

const seenNotif = async (notifID) => {
     const res = await axios({
          url: `http://localhost:4000/v1/notifications/see/${notifID}`,
          method: 'put',
          headers: {
               Authorization: `Bearer ${getToken()}`
          }
     }).then(getAdminInfos().then(admin => insertNotifItem(admin.notifications)))
}

export {
     insertNotifItem,
     seenNotif,
}