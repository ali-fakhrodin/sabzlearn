import {
     getAndShowAllCourses,
     getAndShowPopularCourses,
     getAndShowPresellCourses,
     getAndShowArticles,
     globalSearch,
} from './funcs/shared.js';

const $ = document
const landingTitle = $.querySelector('.landing-title')
const landingTitleTypewriterText = 'ما به هر قیمتی دوره آموزشی تولید نمی کنیم !'
let typewriterCounter = 0

const landingTimeCount = $.querySelector('#time-count')
const landingCourseCount = $.querySelector('#courses-count')
const landingUsersCount = $.querySelector('#users-count')

function makeCounter(max, elem, step) {
     let counter = 0;

     const landingInterval = setInterval(() => {

          if (counter >= max) {
               clearInterval(landingInterval)
          }

          elem.innerHTML = counter
          counter += step

     }, 20);

}

window.addEventListener('load', () => {
     const searchBtn = document.querySelector('.landing-searschbar__btn')
     const globalSearchInp = document.querySelector('.landing-searchbar__input')

     searchBtn.addEventListener('click', () => {
          location.href = `./search.html?search=${globalSearchInp.value.trim()}`
          // globalSearch()
     })

     setInterval(() => {
          if (typewriterCounter < landingTitleTypewriterText.length) {
               landingTitle.innerHTML += landingTitleTypewriterText[typewriterCounter]
               typewriterCounter++
          }
     }, 50)

     makeCounter(70, landingCourseCount, 1)
     makeCounter(5_751, landingTimeCount, 30)
     makeCounter(68_059, landingUsersCount, 500)

     getAndShowAllCourses()
     getAndShowPopularCourses()
     getAndShowPresellCourses()
     getAndShowArticles()

})