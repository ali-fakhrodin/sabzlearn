import { createNewCategory, getAndShowAllCategories, removeCategory } from "./funcs/categories.js";

window.removeCategory = removeCategory

window.addEventListener('load', () => {
     const createNewCatBtn = document.querySelector('#add-new-cat-btn')

     getAndShowAllCategories()
 
     createNewCatBtn.addEventListener('click', e => {
          e.preventDefault()
          createNewCategory()
     })
})

console.log('cat');
