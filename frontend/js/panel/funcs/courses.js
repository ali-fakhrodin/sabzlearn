const getAllCourses = async () => {

     const courseTableElem = document.querySelector('.table tbody')

     const res = await axios({ url: `http://localhost:4000/v1/courses` })
     const courses = await res.data
     console.log(courses);

     courses.forEach((course, index) => {
          courseTableElem.insertAdjacentHTML('beforeend', `
                    <tr>
                         <td id="id">${index+1}</td>
                         
                         <td id="name">
                           <a href="#">${course.name}</a>
                         </td>
                         <td id="price">${(course.price) ? course.price : 'رایگان'}</td>
                         <td id="number">${course.registers}</td>
                         <td id="condition">${course.support}</td>
                         <td id="condition">${course.categoryID}</td>
                         <td id="condition">${course.courseAverageScore}</td>
                         <td id="condition">${(course.isComplete) ? 'تکمیل شده' : 'درحال برگذاری' }</td>
                         <td>
                             <button type="button" class="btn btn-primary" id="edit-btn">ویرایش</button>
                         </td>
                         <td>
                             <button type="button" class="btn btn-danger" id="delete-btn">حذف</button>
                         </td>
                     </tr>
               `)
     });
     return courses
}

export {
     getAllCourses,
}