import { insertCourseBoxTemplate, showAllCoursesInCoursesPage } from "./funcs/shared.js"
import { addParamToUrl, getUrlParam, paginateItems } from "./funcs/utils.js"

window.addParamToUrl = addParamToUrl

window.addEventListener('load', () => {
     const currentPage = getUrlParam('page')
     const coursesContainer = document.querySelector('.courses-content .row')
     const coursePaginationWrapper = document.querySelector('.courses-pagination-list')

     showAllCoursesInCoursesPage().then(course => {
          console.log(course);
          const shownCourses = paginateItems([...course], 3, coursePaginationWrapper, currentPage)
          insertCourseBoxTemplate([...shownCourses], 'col', coursesContainer)
     })

})
