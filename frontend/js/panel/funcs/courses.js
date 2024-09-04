import { getToken } from '../../funcs/utils.js'

const getAllCourses = async () => {
     const courseTableElem = document.querySelector('.table tbody')
     const res = await axios({ url: `http://localhost:4000/v1/courses` })
     const courses = await res.data

     courseTableElem.innerHTML = ''

     courses.forEach((course, index) => {
          courseTableElem.insertAdjacentHTML('beforeend', `
                    <tr>
                         <td id="id">${index + 1}</td>
                         
                         <td id="name">
                           <a href="#">${course.name}</a>
                         </td>
                         <td id="price">${(course.price) ? course.price : 'رایگان'}</td>
                         <td id="number">${course.registers}</td>
                         <td id="condition">${course.support}</td>
                         <td id="condition">${course.categoryID}</td>
                         <td id="condition">${course.courseAverageScore}</td>
                         <td id="condition">${(course.isComplete) ? 'تکمیل شده' : 'درحال برگذاری'}</td>
                         <td>
                             <button type="button" class="btn btn-primary" id="edit-btn">ویرایش</button>
                         </td>
                         <td>
                             <button type="button" onclick="removeCourse('${course._id}', '${course.name}')" class="btn btn-danger" id="delete-btn">حذف</button>
                         </td>
                     </tr>
               `)
     });

     return courses
}

let catID = null
let status = 'start'
let courseCover = null

const prepareCreateNewCourse = async () => {
     const categoryList = document.querySelector('.category-list')
     const courseStatusPresell = document.querySelector('#presell')
     const courseStatusStart = document.querySelector('#start')
     const courseCoverElem = document.querySelector('#course-pic')

     const res = await axios({ url: `http://localhost:4000/v1/category` })
     const cats = await res.data

     cats.forEach(cat => {
          categoryList.insertAdjacentHTML('beforeend', `
                         <option value="${cat._id}">${cat.title}</option>
               `)
     })

     categoryList.addEventListener('change', event => {
          catID = event.target.value
     })

     courseStatusStart.addEventListener('change', e => status = e.target.value)
     courseStatusPresell.addEventListener('change', e => status = e.target.value)

     courseCoverElem.addEventListener('change', e => courseCover = e.target.files[0])
}

const createNewCourses = async () => {
     const courseNameElem = document.querySelector('#course-name')
     const coursePriceElem = document.querySelector('#course-price')
     const courseDescElem = document.querySelector('#course-desc')
     const courseShortnameElem = document.querySelector('#course-Shortname')
     const courseSupportElem = document.querySelector('#course-support')

     const formData = new FormData()
     formData.append('name', courseNameElem.value.trim())
     formData.append('price', coursePriceElem.value.trim())
     formData.append('description', courseDescElem.value.trim())
     formData.append('shortName', courseShortnameElem.value.trim())
     formData.append('support', courseSupportElem.value.trim())
     formData.append('categoryID', catID)
     formData.append('status', status)
     formData.append('cover', courseCover)

     const res = await axios({
          url: `http://localhost:4000/v1/courses`,
          method: 'post',
          headers: {
               Authorization: `Bearer ${getToken()}`
          },
          data: formData
     });

     console.log(res);

     if (res.status === 201) {
          Swal.fire({
               title: 'با موفقیت اضافه شد',
               icon: 'success',
               position: "top-end",
               timer: 1500,
               timerProgressBar: true,
               showConfirmButton: false,
               toast: true,
          }).then(() => {
               getAllCourses()
          })
     } else {
          Swal.fire({
               title: 'اضافه نشد',
               icon: 'error',
               position: "top-end",
               timer: 1500,
               timerProgressBar: true,
               showConfirmButton: false,
               toast: true,
          })
     }

}

const removeCourse = async (courseID, courseName) => {
     console.log(courseID);

     Swal.fire({
          title: 'برای حذف دوره مطمئنی؟',
          text: `نام دوره: ${courseName}`,
          confirmButtonColor: "#dc3545",
          confirmButtonText: 'بله، دوره حذف شود!',
          showCancelButton: true,
          cancelButtonText: 'لغو',
     }).then(result => {
          if (result.isConfirmed) {
               axios({
                    url: `http://localhost:4000/v1/courses/${courseID}`,
                    method: 'delete',
                    headers: {
                         Authorization: `Bearer ${getToken()}`
                    }
               }).then(res => {
                    if (res.status === 200) {
                         Swal.fire({
                              title: 'دوره با موفقیت حذف شد!',
                              text: `نام دوره: ${courseName}`,
                              confirmButtonColor: "#dc3545",
                              timer: 2000,
                              showConfirmButton: false,
                              timerProgressBar: true,
                              toast: true,
                              icon: 'success',
                              position: 'top-start'
                         })
                         getAllCourses()
                    }
               })
          }
     })
}

export {
     getAllCourses,
     prepareCreateNewCourse,
     createNewCourses,
     removeCourse,
}