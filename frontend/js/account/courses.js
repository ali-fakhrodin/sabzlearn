import { filterCourses, getUserCourses, insertCourseBoxTemplate } from "./funcs/courses.js"

window.addEventListener('load', () => {
     getUserCourses()
          .then(res => {

               const coursesWrapper = document.querySelector('#courses-wrapper')
               const coursesFilterLinks = document.querySelectorAll('.courses-header__link')

               insertCourseBoxTemplate(res, coursesWrapper)

               // Handle Filtering
               coursesFilterLinks.forEach(filterLink => {
                    filterLink.addEventListener('click', e => {
                         e.preventDefault()

                         coursesFilterLinks.forEach(link => link.classList.remove('courses-header__link-active'))
                         e.target.classList.add('courses-header__link-active')

                         let filterMethod = e.target.dataset.filter
                         let filteredCourses = filterCourses([...res], filterMethod)
                         console.log(filteredCourses);
                         
                         insertCourseBoxTemplate([...filteredCourses], coursesWrapper)
                    })
               })
          })
})