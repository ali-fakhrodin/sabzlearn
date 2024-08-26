import { getMe } from "./auth.js"
import { isLogin } from "./utils.js"

const navbarProfileBox = document.querySelector('.main-header__profile')
const ShowUserNameInNavbar = () => {

     const isUserLogin = isLogin()

     if (isLogin()) {
          getMe().then(res => {
               navbarProfileBox.insertAdjacentHTML('beforeend', `<span class="main-header__profile-text">${res.name}</span>`)
               navbarProfileBox.setAttribute('href', './index.html')
          })
     } else {
          navbarProfileBox.setAttribute('href', './login.html')
          navbarProfileBox.innerHTML = ('beforeend', `<span class="main-header__profile-text">ورود / ثبت نام</span>`)
     }

     const userInfos = getMe().then(data => {
          console.log(data);
     })

}

export { ShowUserNameInNavbar }