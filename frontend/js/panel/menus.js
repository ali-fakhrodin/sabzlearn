import { createNewMenu, prepareCreateNewMenu, getAndShowAllMenus, removeMenu } from "./funcs/menus.js"

window.removeMenu = removeMenu

window.addEventListener('load', () => {
     const addNewMenuBtn = document.querySelector('#add-new-menu')

     getAndShowAllMenus()

     prepareCreateNewMenu()

     addNewMenuBtn.addEventListener('click', e => {
          e.preventDefault()

          createNewMenu()
               .then(() => {
                    getAndShowAllMenus()
                    prepareCreateNewMenu()
               })
     })
})