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

     return topbarMenus
}

const getAndShowAllCourses = async () => {
     const coursesContainer = document.querySelector('.courses-content .row')
     const res = await axios({ url: 'http://localhost:4000/v1/courses', method: 'get' })

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

     return res
}

const getAndShowPopularCourses = async () => {
     const popularContainer = document.querySelector('.popular__swiper .swiper-wrapper')
     const res = await axios({ url: `http://localhost:4000/v1/courses/popular`, method: 'get' })

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

     return res
}

const getAndShowPresellCourses = async () => {
     const presellContainer = document.querySelector('.presell__swiper .swiper-wrapper')
     const res = await axios({ url: `http://localhost:4000/v1/courses/presell` })

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

     return res
}

const getAndShowArticles = async () => {
     const artileContainer = document.querySelector('.article__content .row')
     const res = await axios({ url: `http://localhost:4000/v1/articles` })

     res.data.slice(0, 3).forEach(article => {
          artileContainer.insertAdjacentHTML('beforeend', `
               <div class="col-4 my-5">
                         <div class="article-card rounded-4 overflow-hidden pb-4">
                              <div class="article-card__header">
                                   <a href="#" class="d-flex justify-content-center">
                                        <img src="http://localhost:4000/courses/covers/${article.cover}" class="article-card__img w-100"
                                             alt="Article-Cover">
                                   </a>
                              </div>

                              <div class="article-card__content px-4 pb-2 mt-4">
                                   <a href="#" class="article-card__link fw-bold fs-3">
                                        ${article.title}
                                   </a>
                                   <p class="article-card__text fs-5">
                                        ${article.description}
                                   </p>
                                   <a class="article-card__btn px-3 py-1 rounded-3 fs-4 d-inline">
                                        <span>بیشتر بخوانید</span>
                                   </a>
                              </div>
                         </div>
                    </div>
               `)
     });

     return res
}

const getAndShowNavbarMenus = async () => {
     const artileContainer = document.querySelector('.main-header__menu')
     const res = await axios({ url: `http://localhost:4000/v1/menus` })

     res.data.forEach(item => {
          artileContainer.insertAdjacentHTML('beforeend',
               `<li class="main-header__item">
                    <a href="#" class="main-header__link">${item.title}</a>

                    ${item.submenus.length !== 0 ?
                    `<i class="fas fa-angle-down"></i>
                         <ul class="main-header__dropdown">
                         ${item.submenus.map(submenu => (
                                   `<li class="main-header__dropdown-item">
                                        <a href="#" class="main-header__dropdown-link">
                                             ${submenu.title}
                                        </a>
                                   </li>`
                              )).join('')}
                         </ul>` : ''
                    }

               </li>`)
     })
     
     console.log(res);
     return res
}

export {
     ShowUserNameInNavbar,
     renderTopbarMenus,
     getAndShowAllCourses,
     getAndShowPopularCourses,
     getAndShowPresellCourses,
     getAndShowArticles,
     getAndShowNavbarMenus,
}