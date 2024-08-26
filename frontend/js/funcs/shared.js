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

const renderTopbarMenus = async () => {
     const topbarList = document.querySelector('.top-bar__menu')
     const res = await axios({ url: 'http://localhost:4000/v1/menus/topbar', method: "get" })
     const topbarMenus = await res.data;

     const shuffledArray = topbarMenus.sort((a, b) => 0.5 - Math.random());

     shuffledArray.slice(0, 6).map(menu => {
          topbarList.innerHTML +=
               `<li class="t4p-bar__item">
                    <a href="${menu.href}" class="top-bar__link">${menu.title}</a>
               </li>`
     })

     console.log(topbarMenus);

     return topbarMenus
}

export { ShowUserNameInNavbar, renderTopbarMenus }