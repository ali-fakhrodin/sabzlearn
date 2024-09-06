import { getToken } from "../../funcs/utils.js"

let courseID = null
let sessionvideo = null
let isFree = null

const prepareCreateNewSession = async () => {
     const coursesSelectElem = document.querySelector('#courses-select')
     const fileInp = document.querySelector('#file')
     const sessionFreeRadioInp = document.querySelector('#free')
     const sessionNotFreeRadioInp = document.querySelector('#not-free')

     coursesSelectElem.innerHTML = `<option value="undefined">انتخاب کن</option>`;
     const res = await axios({ url: `http://localhost:4000/v1/courses` })
     const courses = await res.data

     courses.forEach(course => {
          coursesSelectElem.insertAdjacentHTML('beforeend', `
                    <option value="${course._id}">${course.name}</option>
               `)
     })

     coursesSelectElem.addEventListener('change', e => courseID = e.target.value)
     fileInp.addEventListener('change', e => sessionvideo = e.target.files[0])
     sessionFreeRadioInp.addEventListener('change', e => isFree = e.target.value)
     sessionNotFreeRadioInp.addEventListener('change', e => isFree = e.target.value)
}

const getAndShowAllSessions = async () => {
     const sessionsTable = document.querySelector('.table tbody')

     sessionsTable.innerHTML = ''

     const res = await axios({ url: `http://localhost:4000/v1/courses/sessions` })
     const sessions = res.data

     sessions.forEach((session, index) => {
          sessionsTable.insertAdjacentHTML('beforeend', `
                    <tr>
                         <td>${index + 1}</td>
                         <td>${session.title}</td>
                         <td>${session.time}</td>
                         <td>${session.createdAt.slice(0, 10)}</td>
                         <td>${session.course.name}</td>
                         <td>
                              <button type="button" class="btn btn-primary" id="edit-btn" onclick="sendAnswer('${session.email}')">ویرایش</button>
                         </td>
                         <td>
                             <button type="button" onclick="removeSession('${session._id}', '${session.title}')" class="btn btn-danger" id="delete-btn">حذف</button>
                         </td>
                    </tr>
               `)
     });
     console.log(sessions);

}

const createNewSession = async () => {
     const nameInp = document.querySelector('#name')
     const timeInp = document.querySelector('#time')

     const formData = new FormData()
     formData.append("title", nameInp.value.trim())
     formData.append("time", timeInp.value.trim())
     formData.append("free", isFree)
     formData.append("video", sessionvideo)

     const res = await axios({
          method: 'post',
          url: `http://localhost:4000/v1/courses/${courseID}/sessions`,
          headers: {
               Authorization: `Bearer ${getToken()}`
          },
          data: formData,
     })

     if (res.status === 201) {
          getAndShowAllSessions()
          Swal.fire({
               title: 'جلسه جدید، اضافه شد',
               icon: 'success',
               toast: true,
               position: 'top-start',
               timer: 1800,
               showConfirmButton: false,
               timerProgressBar: true,
          })
     }
     console.log(res);


}

const removeSession = async (sessionID, sessionName) => {
     console.log(sessionID, sessionName);

     Swal.fire({
          title: 'برای حذف جلسه مطمئنی؟',
          text: `نام جلسه: ${sessionName}`,
          confirmButtonColor: "#dc3545",
          confirmButtonText: 'بله، جلسه حذف شود!',
          showCancelButton: true,
          cancelButtonText: 'لغو',
     }).then(result => {
          if (result.isConfirmed) {
               axios({
                    url: `http://localhost:4000/v1/courses/sessions/${sessionID}`,
                    method: 'delete',
                    headers: {
                         Authorization: `Bearer ${getToken()}`
                    }
               }).then(res => {
                    if (res.status === 200) {
                         getAndShowAllSessions()
                         Swal.fire({
                              title: 'جلسه با موفقیت حذف شد!',
                              text: `نام جلسه: ${sessionName}`,
                              confirmButtonColor: "#dc3545",
                              timer: 2000,
                              showConfirmButton: false,
                              timerProgressBar: true,
                              toast: true,
                              icon: 'success',
                              position: 'top-start'
                         })
                    }
               })
          }
     })
}

export {
     getAndShowAllSessions,
     prepareCreateNewSession,
     createNewSession,
     removeSession,
}