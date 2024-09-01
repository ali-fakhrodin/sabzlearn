import { getMe } from "./auth.js"
import { getUrlParam, isLogin, getToken } from "./utils.js"

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
                    <a href=category.html?cat=${item.href} class="main-header__link">${item.title}</a>

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

     return res
}

const getAndShowCategoryCourses = async () => {
     const categoryName = getUrlParam('cat')
     // const coursesContainer = document.querySelector('.courses-content .row')
     console.log(categoryName);

     // const res = await axios({ url: `http://localhost:4000/v1/courses/category/${categoryName}`, method: 'get' })
     const res = await axios({ url: `http://localhost:4000/v1/courses/` })

     return res
}

const insertCourseBoxTemplate = (courses, showType, parrent) => {
     const coursesContainer = document.querySelector('.courses-content .row')
     coursesContainer.innerHTML = ''

     if (showType === 'row') {
          courses.forEach(course => {
               parrent.insertAdjacentHTML('beforeend', `
                         <div class="col-12">
                <div class="course-box my-3 rounded-4 overflow-hidden">
                    <div class="course__box-header d-flex">
                        <div class="course__box-right">
                            <a class="course__box-right-link" href="./course.html?name=${course.shortName}">
                                <img src=http://localhost:4000/courses/covers/${course.cover} class="course__box-right-img h-100" style="max-width: 350px;">
                            </a>
                        </div>
                        <div class="course__box-left p-4 d-flex flex-column gap-3">
                            <div class="course__box-left-top">
                                <a href="./course.html?name=${course.shortName}" class="course__box-left-link fw-bold">${course.name}</a>
                            </div>
                            <div class="course__box-left-center d-flex align-items-center justify-content-between">
                                <div class="course__box-left-teacher">
                                    <i class="course__box-left-icon fa fa-chalkboard-teacher"></i>
                                    <span class="course__box-left-name fs-4" style="color: #7d7e7f">${course.creator}</span>
                                </div>
                                <div class="course__box-left-stars gap-2">
                                  ${Array(5 - course.courseAverageScore)
                         .fill(0)
                         .map(
                              (score) =>
                                   '<img src="images/svgs/star.svg" alt="rating" class="course-box__star">'
                         )
                         .join(" ")}
                                  ${Array(course.courseAverageScore)
                         .fill(0)
                         .map(
                              (score) =>
                                   '<img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">'
                         )
                         .join(" ")}
                                </div>
                            </div>
                            <div class="course__box-left-bottom">
                                <div class="course__box-left-des">
                                    <p>امروزه کتابخانه‌ها کد نویسی را خیلی آسان و لذت بخش تر کرده اند. به قدری
                                        که
                                        حتی امروزه هیچ شرکت برنامه نویسی پروژه های خود را با Vanilla Js پیاده
                                        سازی
                                        نمی کند و همیشه از کتابخانه ها و فریمورک های موجود استفاده می کند. پس
                                        شما هم
                                        اگه میخواید یک برنامه نویس عالی فرانت اند باشید، باید کتابخانه های
                                        کاربردی
                                        که در بازار کار استفاده می شوند را به خوبی بلد باشید</p>
                                </div>
                            </div>
                            <div class="course__box-footer d-flex justify-content-between" style="color: #7d7e7f;">
                                <div class="course__box-footer-right">
                                    <i class="course__box-footer-icon fa fa-users"></i>
                                    <span class="course__box-footer-count">${course.registers}</span>
                                </div>
                                <span class="course__box-footer-left">${course.price === 0
                         ? "رایگان"
                         : course.price.toLocaleString()
                    }</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                    `)
          })
     } else {
          courses.forEach(course => {
               parrent.insertAdjacentHTML('beforeend', `
                    <div div class= "col-4" >
                    <div class="course-box d-flex flex-column rounded-4 mt-5 overflow-hidden">
                         <a href="./course.html?name=${course.shortName}">
                              <img src="http://localhost:4000/courses/covers/${course.cover}" alt="fareelancer-image"
                                   class="course-box__img w-100">
                         </a>
     
                         <div class="course-box__main px-4">
                              <a href="./course.html?name=${course.shortName}" class="course-box__title d-block pt-4">${course.name}</a>
     
                              <div
                                   class="course-box__rating-teacher d-flex justify-content-between align-items-center py-3">
                                   <div class="course-box__teacher d-flex align-items-center gap-2">
                                        <i class="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
                                        <a href="#" class="course-box__teacher-link">${course.creator}</a>
                                   </div>
     
                                   <div class="course-box__rating">
                                        ${Array(5 - course.courseAverageScore)
                         .fill(0)
                         .map(
                              (score) =>
                                   '<img src="images/svgs/star.svg" alt="rating" class="course-box__star">'
                         )
                         .join(" ")}
                                        ${Array(course.courseAverageScore)
                         .fill(0)
                         .map(
                              (score) =>
                                   '<img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">'
                         )
                         .join(" ")}
                                   </div>
                              </div>
     
                              <div class="course-box_status d-flex justify-content-between">
                                   <div class="course-box__user">
                                        <i class="fas fa-users course-box__users-icon"></i>
                                        <span class="course-box__users-text">${course.registers}</span>
                                   </div>
                                   <span class="course-box__price">
                                        ${course.price === 0
                         ? "رایگان"
                         : course.price.toLocaleString()}
                                   </span >
                              </div >
                         </div >
     
                         <div class="course-box__footer mt-3">
                              <a href="#"
                                   class="course-box__footer-link d-flex align-items-center gap-2 justify-content-center py-3">
                                   مشاهده اطلاعات
                                   <i class="fas fa-arrow-left course-box__footer-icon"></i>
                              </a>
                         </div>
                    </div >
                                             </div >
               `)
          })
     }
}

const coursesSorting = (array, fillterMethod) => {
     let outputArray = []

     switch (fillterMethod) {
          case 'free': {
               outputArray = array.filter(course => course.price === 0)
               break
          }
          case 'money': {
               outputArray = array.filter(course => course.price > 0)
               break
          }
          case 'first': {
               outputArray = [...array].reverse()
               break
          }
          case 'last': {
               outputArray = array
               break
          }
          case 'default': {
               outputArray = array
               break
          }

          default: {
               outputArray = array
          }
     }

     return outputArray
}

const getCourseDetails = () => {
     const shortName = getUrlParam('name');
     let sessionsHTime = 0
     let sessionsMTime = 0

     // Select Elems From Dom
     const $ = document
     const courseCatElem = $.querySelector('.course-info__link')
     const courseTitleElem = $.querySelector('.course-info__title')
     const courseDescElem = $.querySelector('.course-info__desc')
     const courseregisterInfoElem = $.querySelector('.course-info__register-title')
     const courseStatusElem = $.querySelector('.course-boxes__box--status')
     const courseSupportElem = $.querySelector('.course-boxes__box--support')
     const courseTimeElem = $.querySelector('.course-boxes__box--time')
     const courseLastUpdataElem = $.querySelector('.course-boxes__box--update')
     const courseStudentsElem = $.querySelector('.course-info__total-sale-number')
     const courseCommentsElem = $.querySelector('.course-info__total-comment-text')

     const accordionContainer = document.querySelector('.accordion-item')

     axios({
          method: 'post',
          url: `http://localhost:4000/v1/courses/${shortName}`,
          headers: {
               Authorization: `Bearer ${getToken()}`
          }
     })
          .then(res => res.data)
          .then(data => {
               courseCatElem.innerHTML = data.categoryID.title
               courseTitleElem.innerHTML = data.name
               courseDescElem.innerHTML = data.description
               courseregisterInfoElem.innerHTML = data.isUserRegisteredToThisCours ? 'مشاهده دوره' : 'ثبت نام در دوره'
               courseStatusElem.innerHTML = data.isComplete ? 'تکمیل شده' : 'در حال برگذاری'
               courseSupportElem.innerHTML = data.support
               courseLastUpdataElem.innerHTML = data.updatedAt.slice(0, 10)
               courseStudentsElem.innerHTML = data.courseStudentsCount
               courseCommentsElem.innerHTML = ` ${data.comments.length} دیدگاه`

               // console.log(data);
               return data
          })
          .then(course => {
               console.log(course);
               let userRegisterInCourse = course.isUserRegisteredToThisCourse
               if (course.sessions.length) {

                    course.sessions.forEach((session, index) => {
                         accordionContainer.insertAdjacentHTML('beforeend', `
                                                       <div id="collapseOne" class="accordion-collapse collapse show"
                                                            data-bs-parent="#accordionExample">
                                                            <div
                                                                 class="accordion-body introduction__accordion-body d-flex justify-content-between align-items-center">
                                                                 <div
                                                                      class="introduction__accordion-right d-flex align-items-center gap-3">
                                                                      <span
                                                                           class="introduction__accordion-count border border-2 rounded-circle d-flex align-items-center justify-content-center fs-4">${index + 1}</span>
                                                                      <i
                                                                           class="fab fa-youtube introduction__accordion-icon"></i>
                                                                      ${(session.free || session.isUserRegisteredToThisCours) ? `
                                                                           <a href=./episode.html?name=${course.shortName}&id=${session._id} class="introduction__accordion-link">
                                                                                ${session.title}
                                                                           </a>                                                                           
                                                                           `: `
                                                                           <span class="introduction__accordion-link">
                                                                                ${session.title}
                                                                           </span>
                                                                           `}
                                                                 </div>
     
                                                                 <div class="introduction__accordion-left">
                                                                      <div class="introduction__accordion-time">
                                                                           ${session.time}
                                                                           ${!(userRegisterInCourse || session.free) ? '<i class="fas fa-lock"></i>' : ''}
                                                                      </div>
                                                                 </div>
                                                            </div>
                                                       </div>
                         `)

                         sessionsMTime += Number(session.time.slice(0, 2))
                    });

               } else {
                    accordionContainer.insertAdjacentHTML('beforeend', `
                         <div id="collapseOne" class="accordion-collapse collapse show"
                              data-bs-parent="#accordionExample">
                              <div
                                   class="accordion-body introduction__accordion-body d-flex justify-content-between align-items-center">
                                   <div
                                        class="introduction__accordion-right d-flex align-items-center gap-3">
                                        <span
                                             class="introduction__accordion-count border border-2 rounded-circle d-flex align-items-center justify-content-center fs-4">1</span>
                                        <i
                                             class="fab fa-youtube introduction__accordion-icon"></i>
                                        <a href="#" class="introduction__accordion-link">
                                             هنوز جلسه ای آپلود نشده                                             
                                        </a>
                                   </div>
                              </div>
                         </div>
             
                    `)
                    courseTimeElem.innerHTML = 0
               }

               if (sessionsMTime > 59) {
                    sessionsHTime += Math.floor(sessionsMTime / 60)

                    sessionsMTime = 0
               } if (sessionsMTime < 9) {
                    sessionsMTime = sessionsMTime + '0'
               }
               if (sessionsHTime < 9) {
                    sessionsHTime = '0' + sessionsHTime
               }

               courseTimeElem.innerHTML = `${sessionsHTime}:${sessionsMTime}`

          })
}

const getAndShowRelatedCourses = () => {
     let shortName = getUrlParam('name')
     const relatedCourseWrapper = document.querySelector('.course-info__courses-list')

     axios({ url: `http://localhost:4000/v1/courses/related/${shortName}`, })
          .then(res => res.data)
          .then(data => {
               if (data.length) {
                    console.log(shortName);

                    data.forEach(course => {
                         relatedCourseWrapper.insertAdjacentHTML('beforeend', `
                                             <li class="course-info__courses-list-item">
                                                  <a href=./course.html?name=${course.shortName} class="course-info__courses-link">
                                                       <img src="./images/courses/js_project.png"
                                                            class="course-info__courses-list-img rounded-3"
                                                            alt="course cover" width="90px">
                                                       <span class="course-info__courses-text fs-5 fw-bold">${course.name}</span>
                                                  </a>
                                             </li>
                              `)
                    })
               }
          })
}

const getSessionDetails = async () => {
     const courseShortName = getUrlParam('name')
     const sessionID = getUrlParam('id')

     const sessionVideoElem = document.querySelector('.episode-content__video')
     const courseSessionListElem = document.querySelector('.sidebar-topics__list')

     console.log(sessionVideoElem);

     const res = await axios(`http://localhost:4000/v1/courses/${courseShortName}/${sessionID}`, {
          headers: {
               Authorization: `Bearer ${getToken()}`
          }
     })

     const result = res.data

     sessionVideoElem.setAttribute('src', `http://localhost:4000/courses/covers/${result.session.video}`)
     sessionVideoElem.setAttribute('poster', `http://localhost:4000/courses/covers/fareelancer.png`)

     result.sessions.forEach(session => {
          console.log(session);
          courseSessionListElem.insertAdjacentHTML('beforeend', `
               <li class="sidebar-topics__list-item">
                <div class="sidebar-topics__list-right">
                  <i class="sidebar-topics__list-item-icon fa fa-play-circle"></i>
                  ${session.free ? 
                    `<a class="sidebar-topics__list-item-link" href="./episode.html?name=${courseShortName}&id=${sessionID}">${session.title}</a>`
                    :
                    `
                    <span class="sidebar-topics__list-item-link">${session.title}</span>
                    `
                  }
                </div>
                <div class="sidebar-topics__list-left">
                  <span class="sidebar-topics__list-item-time">${session.time}</span>
                  ${!(session.free) ? `
                         <i class="fas fa-lock"></i>
                    `: ''}
                </div>
              </li>
               `)
     })

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
     getAndShowCategoryCourses,
     insertCourseBoxTemplate,
     coursesSorting,
     getCourseDetails,
     getAndShowRelatedCourses,
     getSessionDetails,
}