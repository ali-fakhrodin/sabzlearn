import { createNewCourses, getAllCourses, prepareCreateNewCourse, removeCourse } from "./funcs/courses.js";

window.removeCourse = removeCourse

window.addEventListener('load', () => {
     getAllCourses()
     const createCourseBtn = document.querySelector('#create-course-btn')

     prepareCreateNewCourse()

     createCourseBtn.addEventListener('click', e => {
          e.preventDefault()
          createNewCourses()
     })
})