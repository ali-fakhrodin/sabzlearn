import { getAndShowAllDiscounts, prepareCreateDiscount, createDiscountCode } from "./funcs/discounts.js"

window.addEventListener('load', () => {
     const addBtn = document.querySelector('#create-discount')
     
     prepareCreateDiscount()
     getAndShowAllDiscounts()

     addBtn.addEventListener('click', e => {
          e.preventDefault()
          createDiscountCode()
     })
     
})