import { getToken } from '../../funcs/utils.js'

let courseID = null

const prepareCreateDiscount = async () => {
     const coursesListSelect = document.querySelector('#courses-select')

     const res = await axios({
          url: `http://localhost:4000/v1/courses`,
          headers: {
               Authorization: `Bearer ${getToken()}`,
               "Content-Type": "application/json"
          }
     })

     const courses = res.data

     courses.filter(course => course.price !== 0).forEach(course => {
          coursesListSelect.insertAdjacentHTML('beforeend', `
                    <option value="${course._id}">${course.name}</option>
               `)
     })

     coursesListSelect.addEventListener('change', e => courseID = e.target.value)
}

const createDiscountCode = async () => {
     console.log(courseID);
}

const getAndShowAllDiscounts = async () => {
     const discountsWrapper = document.querySelector('.table tbody')

     const res = await axios({
          url: `http://localhost:4000/v1/offs`,
          headers: {
               Authorization: `Bearer ${getToken()}`
          }
     })

     const discountCodes = await res.data
     console.log(discountCodes);

     discountCodes.forEach((disData, index) => {
          discountsWrapper.insertAdjacentHTML('beforeend', `
               <tr>
                    <td>${index + 1}</td>
                    <td>${disData.code}</td>
                    <td>${disData.creator}</td>
                    <td>${disData.percent}</td>
                    <td>${disData.max}</td>
                    <td>${disData.uses}</td>
                    <td>${disData.createdAt.slice(0, 10)}</td>
                    <td>
                        <button type="button" class="btn btn-primary" id="edit-btn">ویرایش</button>
                    </td>
                    <td>
                        <button type="button" onclick="removeCourse('${disData._id}', '${disData.name}')" class="btn btn-danger" id="delete-btn">حذف</button>
                    </td>
               </tr>
          `)
     });
}

export {
     getAndShowAllDiscounts,
     prepareCreateDiscount,
     createDiscountCode,
}