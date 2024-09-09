import { getToken } from "../../funcs/utils.js"

const getUserCourses = async () => {
     const res = await axios({
          url: `http://localhost:4000/v1/users/courses`,
          headers: {
               Authorization: `Bearer ${getToken()}`,
          },
     })
     const courses = await res.data

     return courses
}

const insertCourseBoxTemplate = (array, wrapper) => {
     if (array.length) {
          wrapper.innerHTML = ''
          array.forEach(courses => {
               wrapper.insertAdjacentHTML('beforeend', `
                         <div class="main__box">
                             <div class="main__box-right">
                                 <a class="main__box-img-link" href="../../course.html?name=${courses.course.shortName}">
                                     <img class="main__box-img img-fluid"
                                         src="http://localhost:4000/courses/covers/${courses.course.cover}">
                                 </a>
                             </div>
                             <div class="main__box-left">
                                 <a href="../../course.html" class="main__box-title">${courses.course.name}</a>
                                 <div class="main__box-bottom">
                                     <div class="main__box-all">
                                         <span class="main__box-all-text">مبلغ:</span>
                                         <span class="main__box-all-value">${courses.course.price === 0 ? 'رایگان' : (courses.course.price).toLocaleString()}</span>
                                     </div>
                                     <div class="main__box-completed">
                                         <span class="main__box-completed-text">وضعیت:</span>
                                         <span class="main__box-completed-value">${courses.course.isComplete ? 'تمام شده' : 'در حال برگذاری'}</span>
                                     </div>
                                 </div>
                             </div>
                         </div>
               `)
          })
     } else {
          wrapper.innerHTML = '<span class="text-danger">هنوز دوره ای تهیه نشده!</span>'
     }
}

const filterCourses = (array, filtMethod) => {
     let filteredCourses = null
     
     switch (filtMethod) {
          case 'free': {
               filteredCourses = [...array].filter(course => course.price === 0)
          }
               break;
          case 'money': {
               filteredCourses = [...array].filter(course => course.price)
          }
               break;
          case 'complete': {
               filteredCourses = [...array].filter(course => course.course.isComplete === 1)
          }
               break;
          case 'active': {
               filteredCourses = [...array].filter(course => course.course.isComplete === 0)
          }
               break;
          default: {
               return array
          }
     }
     return filteredCourses
}

export {
     getUserCourses,
     insertCourseBoxTemplate,
     filterCourses,
}