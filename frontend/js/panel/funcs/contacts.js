import { getToken } from '../../funcs/utils.js';

const getAndShowAllContacts = async () => {
     const contactsListWrapper = document.querySelector('.table tbody')
     const res = await axios({ url: 'http://localhost:4000/v1/contact' })
     const contacts = await res.data

     contactsListWrapper.innerHTML = ''

     contacts.forEach((contact, index) => {
          contactsListWrapper.insertAdjacentHTML('beforeend', `
                    <tr>
                         <td>${index + 1}</td>
                         <td>${contact.name}</td>
                         <td>${contact.email}</td>
                         <td>${contact.phone}</td>
                         <td>${contact.createdAt.slice(0, 10)}</td>
                         <td>
                              <button type="button" class="btn btn-primary" id="show-btn" onclick="showMessage('${contact.name}' ,'${contact.body}')">مشاهده</button>
                         </td>
                         <td>
                              <button type="button" class="btn btn-primary" id="edit-btn" onclick="sendAnswer('${contact.email}')">پاسخ</button>
                         </td>
                         <td>
                              <button type="button" class="btn btn-primary" id="edit-btn">ویرایش</button>
                         </td>
                         <td>
                             <button type="button" onclick="removeCategory('${contact._id}', '${contact.name}')" class="btn btn-danger" id="delete-btn">حذف</button>
                         </td>
                    </tr>
               `)
     });
     console.log(contacts);
}

const showMessage = async (senderName, messageBody) => {
     Swal.fire({
          title: senderName,
          text: `پیغام: ${messageBody}`,
          confirmButtonText: "مشاهده کردم"
     })
}

const sendAnswer = async userEmail => {
     Swal.fire({
          title: "پاسخ خود را ثبت کنید",
          text: `به ایمیل: ${userEmail}`,
          input: "textarea",
          showCancelButton: true,
          cancelButtonText: "لغو",
          confirmButtonText: "ارسال پاسخ",
          showLoaderOnConfirm: true,
     }).then(async (result) => {
          if (result.isConfirmed) {

               const answerBody = {
                    email: userEmail,
                    answer: result.value,
               }

               const res = await axios({
                    url: `http://localhost:4000/v1/contact/answer`,
                    method: 'post',
                    headers: {
                         Authorizaion: `Bearer ${getToken()}`,
                         "Content-Type": "application/json"
                    },
                    data: JSON.stringify(answerBody),
               })

               if (res.status = 200) {
                    Swal({
                         title: 'ایمیل شما ارسال شد!',
                         text: `به: ${userEmail}`,
                         icon: 'success',
                    })
               }
          }
     })
}

export {
     getAndShowAllContacts,
     showMessage,
     sendAnswer,
}