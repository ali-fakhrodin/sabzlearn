import { getAndShowAllCourses, getAndShowPopularCourses, getAndShowPresellCourses } from './funcs/shared.js';

const $ = document
const landingTitle = $.querySelector('.landing-title')
const landingTitleTypewriterText = 'ما به هر قیمتی دوره آموزشی تولید نمی کنیم !'
let typewriterCounter = 0

const landingTimeCount = $.querySelector('#time-count')
const landingCourseCount = $.querySelector('#courses-count')
const landingUsersCount = $.querySelector('#users-count')

const coursesContainer = document.querySelector('.courses-content .row')
const popularContainer = document.querySelector('.popular__swiper .swiper-wrapper')
const presellContainer = document.querySelector('.presell__swiper .swiper-wrapper')


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
          .then(res => {
               res.data.slice(0, 6).map(course => {
                    coursesContainer.insertAdjacentHTML('beforeend',
                         `<div class="col-4">
                    <div class="course-box d-flex flex-xl-column rounded-4 mt-5 overflow-hidden">
                         <a href="#">
                              <img src="http://localhost:4000/courses/covers/${course.cover}" alt="fareelancer-image"
                                   class="course-box__img w-100">
                         </a>
     
                         <div class="course-box__main px-4">
                              <a href="#" class="course-box__title d-block pt-4">
                                   ${course.name}
                              </a>
                              <div
                                   class="course-box__rating-teacher d-flex justify-content-between align-items-center py-3">
                                   <div class="course-box__teacher d-flex align-items-center gap-2">
                                        <i class="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
                                        <a href="#" class="course-box__teacher-link">${course.creator}</a>
                                   </div>
                                   <div class="course-box__rating">
                                        ${Array(5 - course.courseAverageScore).fill(0).map(score =>
                              `<img src="./images/svgs/star.svg" alt="rating" class="course-box__star"></img>`
                         ).join('')
                         }
                                        ${Array(course.courseAverageScore).fill(0).map(score =>
                              `<img src="./images/svgs/star_fill.svg" alt="rating" class="course-box__star"></img>`
                         ).join('')
                         }
                              </div>
                              </div>
                              <div class="course-box_status d-flex justify-content-between">
                                   <div class="course-box__user">
                                        <i class="fas fa-users course-box__users-icon"></i>
                                        <span class="course-box__users-text">${course.registers}</span>
                                   </div>
                                   <span class="course-box__price">${course.price ? course.price.toLocaleString() : 'رایگان'}</span>
                              </div>
                              </div>
     
                              <div class="course-box__footer mt-3">
                                   <a href="#"
                                        class="course-box__footer-link d-flex align-items-center gap-2 justify-content-center py-3">
                                        مشاهده اطلاعات
                                        <i class="fas fa-arrow-left course-box__footer-icon"></i>
                                   </a>
                              </div>
                         </div>
               </div>`
                    )
               })
          })

     getAndShowPopularCourses()
          .then(res => {
               res.data.forEach(course => {
                    popularContainer.insertAdjacentHTML('beforeend', `
                         <div class="swiper-slide">
                                             <div class="course-box d-flex flex-xl-column rounded-4 mt-5 overflow-hidden">
                                                  <a href="#">
                                                       <img src="http://localhost:4000/courses/covers/${course.cover}" alt="fareelancer-image"
                                                            class="course-box__img w-100">
                                                  </a>
     
                                                  <div class="course-box__main px-4">
                                                       <a href="#" class="course-box__title d-block pt-4">
                                                            ${course.name}
                                                       </a>
     
                                                       <div
                                                            class="course-box__rating-teacher d-flex justify-content-between align-items-center py-3">
                                                            <div class="course-box__teacher d-flex align-items-center gap-2">
                                                                 <i
                                                                      class="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
                                                                 <a href="#" class="course-box__teacher-link">${course.creator}</a>
                                                            </div>
     
                                                            <div class="course-box__rating">
                                                            ${Array(5 - course.courseAverageScore).fill(0).map(() =>
                         `<img src="./images/svgs/star.svg" alt="rating"
                                                                           class="course-box__star">`
                    ).join('')
                         }
                                                                 ${Array(course.courseAverageScore).fill(0).map(() =>
                              `<img src="./images/svgs/star_fill.svg" alt="rating"
                                                                                class="course-box__star">`
                         ).join('')
                         }
                                                                 
                                                            </div>
                                                       </div>
     
                                                       <div class="course-box_status d-flex justify-content-between">
                                                            <div class="course-box__user">
                                                                 <i class="fas fa-users course-box__users-icon"></i>
                                                                 <span class="course-box__users-text">${course.registers}</span>
                                                            </div>
                                                            <span class="course-box__price">${course.price ? course.price.toLocaleString() : "رایگان"}</span>
                                                       </div>
                                                  </div>
     
                                                  <div class="course-box__footer mt-3">
                                                       <a href="#"
                                                            class="course-box__footer-link d-flex align-items-center gap-2 justify-content-center py-3">
                                                            مشاهده اطلاعات
                                                            <i class="fas fa-arrow-left course-box__footer-icon"></i>
                                                       </a>
                                                  </div>
                                             </div>
                                        </div>`)
               })
          })

     getAndShowPresellCourses()
          .then(res => {
               console.log(res)
               console.log(res.data)

               res.data.forEach(course => {
                    presellContainer.insertAdjacentHTML('beforeend', `
                              <div class="swiper-slide">
                                   <div class="course-box d-flex flex-xl-column rounded-4 mt-5 overflow-hidden">
                                        <a href="#">
                                             <img src="http://localhost:4000/courses/covers/${course.cover}" alt="fareelancer-image"
                                                  class="course-box__img w-100">
                                        </a>

                                        <div class="course-box__main px-4">
                                             <a href="#" class="course-box__title d-block pt-4">
                                                  ${course.name}
                                             </a>

                                             <div
                                                  class="course-box__rating-teacher d-flex justify-content-between align-items-center py-3">
                                                  <div class="course-box__teacher d-flex align-items-center gap-2">
                                                       <i
                                                            class="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
                                                       <a href="#" class="course-box__teacher-link">${course.creator}</a>
                                                  </div>

                                                  <div class="course-box__rating">
                                                  ${Array(5 - course.courseAverageScore).fill(0).map(() =>
                         `<img src="./images/svgs/star.svg" alt="rating"
                                                                 class="course-box__star">`
                    ).join('')
                         }
                                                       ${Array(course.courseAverageScore).fill(0).map(() =>
                              `<img src="./images/svgs/star_fill.svg" alt="rating"
                                                                      class="course-box__star">`
                         ).join('')
                         }            
                                                  </div>
                                             </div>

                                             <div class="course-box_status d-flex justify-content-between">
                                                  <div class="course-box__user">
                                                       <i class="fas fa-users course-box__users-icon"></i>
                                                       <span class="course-box__users-text">${course.registers}</span>
                                                  </div>
                                                  <span class="course-box__price">${course.price ? course.price.toLocaleString() : "رایگان"}</span>
                                             </div>
                                        </div>

                                        <div class="course-box__footer mt-3">
                                             <a href="#"
                                                  class="course-box__footer-link d-flex align-items-center gap-2 justify-content-center py-3">
                                                  مشاهده اطلاعات
                                                  <i class="fas fa-arrow-left course-box__footer-icon"></i>
                                             </a>
                                        </div>
                                   </div>
                              </div>`)
               });
          })
})