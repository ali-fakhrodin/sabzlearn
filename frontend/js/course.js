import { getCourseDetails, getAndShowRelatedCourses, addNewComment } from "./funcs/shared.js";

window.addEventListener('load', () => {
     const submitCommentBtn = document.querySelector('.comments__respond-btn')

     getCourseDetails()
     getAndShowRelatedCourses()

     submitCommentBtn.addEventListener('click', addNewComment)
})