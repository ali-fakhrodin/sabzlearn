import { getAndShowAllDiscounts, prepareCreateDiscount, createDiscountCode, removeDiscountCode } from "./funcs/discounts.js"

window.removeDiscountCode = removeDiscountCode

window.addEventListener('load', () => {
     const addBtn = document.querySelector('#create-discount')
     
     prepareCreateDiscount()
     getAndShowAllDiscounts()

     addBtn.addEventListener('click', e => {
          e.preventDefault()
          createDiscountCode()
     })
     
})