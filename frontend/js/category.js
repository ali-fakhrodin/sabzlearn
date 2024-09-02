import {
     getAndShowCategoryCourses,
     insertCourseBoxTemplate,
     coursesSorting
} from "./funcs/shared.js";

import {
     paginateItems,
     searchInArray,
     getUrlParam,
     addParamToUrl,
} from "./funcs/utils.js";

const coursesContainer = document.querySelector('.courses-content .row')

window.addParamToUrl = addParamToUrl

window.addEventListener('load', () => {
     let showCoursesType = 'col'
     const topbarAlignBtns = document.querySelectorAll('.courses-top-bar__align-btn')
     const coursesFilteringSelections = document.querySelectorAll('.courses-top-bar__selection-item')
     const coursesFilteringTitle = document.querySelector('.courses-top-bar__selection-title')
     const coursesSearchBox = document.querySelector('.courses-top-bar__input')

     getAndShowCategoryCourses()
          .then(allCourses => {
               // Get And Show All Courses
               if (allCourses.length) {
                    coursesContainer.innerHTML = ''
                    insertCourseBoxTemplate(allCourses, showCoursesType, coursesContainer)
               } else {
                    coursesContainer.insertAdjacentHTML('beforeend', `< p class="alert alert-danger" > هنوز هیج دوره ای تو این دسته بندی وجود نداره</ > `)
               }

               // Show Category Courses Template
               topbarAlignBtns.forEach(btn => {
                    btn.addEventListener('click', (e) => {
                         coursesContainer.innerHTML = ''

                         topbarAlignBtns.forEach(btn => btn.classList.remove('courses-top-bar__icon--active'))
                         btn.classList.add('courses-top-bar__icon--active')

                         if (btn.classList.contains('courses-top-bar__row-btn')) {
                              showCoursesType = 'col'
                              insertCourseBoxTemplate(allCourses, showCoursesType, coursesContainer)
                         } else {
                              showCoursesType = 'row'
                              insertCourseBoxTemplate(allCourses, showCoursesType, coursesContainer)
                         }
                    })
               })

               // Show Courses By User Filtering
               coursesFilteringSelections.forEach(filterItem => {
                    filterItem.addEventListener('click', (event) => {
                         coursesFilteringSelections.forEach(item => {
                              item.classList.remove('courses-top-bar__selection-item--active')
                         })

                         filterItem.classList.add('courses-top-bar__selection-item--active')

                         coursesFilteringTitle.innerHTML = `${filterItem.innerHTML} <i class="fas fa-angle-down courses-top-bar__icon"></i>`

                         let userCustomFilter = filterItem.dataset.key
                         let shownCourses = coursesSorting([...allCourses], userCustomFilter)

                         insertCourseBoxTemplate(shownCourses, showCoursesType, coursesContainer)
                    })
               })

               // Search In Courses
               coursesSearchBox.addEventListener('input', (event) => {
                    const shownCourses = searchInArray(allCourses, 'name', event.target.value)

                    if (shownCourses.length) {
                         insertCourseBoxTemplate(shownCourses, showCoursesType, coursesContainer)
                    } else {
                         coursesContainer.innerHTML = ''
                         coursesContainer.insertAdjacentHTML('beforeend', `<p class="alert alert-danger">هیچ دوره ای برای نمایش وجود ندارد :/</p>`)
                    }

                    console.log(shownCourses);

               })

               // Handle Pagination
               const currentPage = getUrlParam('page')               
               const coursePaginationWrapper = document.querySelector('.courses-pagination-list')
               const shownCourses = paginateItems([...allCourses], 3, coursePaginationWrapper, currentPage)
               
               insertCourseBoxTemplate([...shownCourses], showCoursesType, coursesContainer)
          })
})

