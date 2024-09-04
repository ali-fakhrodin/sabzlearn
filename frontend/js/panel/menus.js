import { getAndShowAllMenus } from "./funcs/menus.js"


window.addEventListener('load', () => {
     getAndShowAllMenus().then(data => {
          
          console.log(data);
     })
     
})