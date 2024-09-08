import { getToken } from '../../funcs/utils.js'

const $ = document

const getAndShowAllUsers = async () => {
     const usersListWrapperElem = document.querySelector('.table tbody')

     usersListWrapperElem.innerHTML = ''

     const res = await axios({
          url: `http://localhost:4000/v1/users`,
          headers: {
               Authorization: `Bearer ${getToken()}`
          }
     })
     const users = await res.data

     users.forEach((user, index) => {
          usersListWrapperElem.insertAdjacentHTML('beforeend', `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${user.name}</td>
                        <td>${user.username}</td>
                        <td>${user.phone}</td>
                        <td>${user.email}</td>
                        <td>${user.role === "ADMIN" ? "مدیر سایت" : "کاربر عادی"}</td>
                        <td>
                            <button type='button' class='btn btn-primary edit-btn'>ویرایش</button>
                        </td>
                        <td>
                            <button type='button' class='btn btn-primary edit-btn' onclick="changeRole('${user._id}', '${user.name}')">تغییر</button>
                        </td>
                        <td>
                            <button type='button' class='btn btn-danger delete-btn' onclick="removeUser('${user._id}', '${user.name}')">حذف</button>
                        </td>
                        <td>
                            <button type='button' class='btn btn-danger delete-btn' onclick="banUser('${user._id}', '${user.name}')">بن</button>
                        </td>
                    </tr>
               `)
     });
}

const removeUser = (userID, userName) => {
     console.log(userID, userName);

     Swal.fire({
          title: 'آیا از حذف کاربر مطمئنی؟',
          text: `نام کاربر: ${userName}`,
          icon: 'warning',
          confirmButtonColor: 'red',
          showCancelButton: true,
     }).then(res => {
          if (res.isConfirmed) {
               axios({
                    url: `http://localhost:4000/v1/users/${userID}`,
                    headers: {
                         Authorization: `Bearer ${getToken()}`
                    },
                    method: 'delete'
               }).then((res) => {
                    if (res.status === 200) {
                         getAndShowAllUsers()
                         Swal.fire({
                              title: 'کاربر با موفقیت حذف شد!',
                              text: `نام کاربر: ${userName}`,
                              icon: 'success',
                              showConfirmButton: false,
                              toast: true,
                              position: 'top-start',
                              timer: 2500,
                              timerProgressBar: true,
                         })

                    }
               })
          }

     })

}

const banUser = (userID, userName) => {
     console.log(userID, userName);

     Swal.fire({
          title: 'آیا از بن کاربر مطمئنی؟',
          text: `نام کاربر: ${userName}`,
          icon: 'warning',
          confirmButtonColor: 'red',
          showCancelButton: true,
     }).then(res => {
          if (res.isConfirmed) {
               axios({
                    url: `http://localhost:4000/v1/users/ban/${userID}`,
                    headers: {
                         Authorization: `Bearer ${getToken()}`
                    },
                    method: 'put'
               }).then((res) => {
                    console.log(res);

                    if (res.status === 200) {
                         getAndShowAllUsers()
                         Swal.fire({
                              title: 'کاربر با موفقیت بن شد!',
                              text: `نام کاربر: ${userName}`,
                              icon: 'success',
                              showConfirmButton: false,
                              toast: true,
                              position: 'top-start',
                              timer: 2500,
                              timerProgressBar: true,
                         })
                    }
               })
          }

     })

}

const createNewUsers = () => {
     const nameInp = $.querySelector('#login-form__name-input')
     const usernameInp = $.querySelector('#login-form__username-input')
     const emailInp = $.querySelector('#login-form__email-input')
     const phoneNumberInp = $.querySelector('#login-form__tel-input')
     const passwordInp = $.querySelector('#login-form__password-input')

     const newUserInfos = {
          name: nameInp.value.trim(),
          username: usernameInp.value.trim(),
          email: emailInp.value.trim(),
          phone: phoneNumberInp.value.trim(),
          password: passwordInp.value.trim(),
          confirmPassword: passwordInp.value.trim(),
     }

     axios({
          method: 'post',
          url: 'http://localhost:4000/v1/auth/register',
          data: newUserInfos
     })
          .then((res) => {
               console.log(res.data)
               getAndShowAllUsers()
               if (res.status === 201) {
                    Swal.fire({
                         title: 'کاربر جدید با موفقیت ایجاد شد!',
                         text: `نام کاربری: ${res.data.user.username}`,
                         icon: 'success',
                         showConfirmButton: false,
                         confirmButtonText: 'حله',
                         position: "top-start",
                         toast: true,
                         timer: 1500,
                         timerProgressBar: true,
                    })
               }
               return res
          })
          .catch(err => {
               console.log(err);
               if (err.status === 409) {
                    Swal.fire({
                         title: 'نام کاربری یا ایمیل، قبلا استفاده شده',
                         icon: 'error',
                         confirmButtonText: 'اصلاح کن',
                         position: "top-end",
                    })
               } else if (err.status === 403) {
                    Swal.fire({
                         title: 'این شماره تماس بن شده!',
                         icon: 'error',
                         showConfirmButton: false,
                    })
               }
          })

}

const changeRole = async (userID, userName) => {
     Swal.fire({
          title: `از تغییر رول ${userName} مطمئنی؟`,
          text: `رول مورد نظر را بنویس (ADMIN | USER)`,
          icon: 'warning',
          input: 'text',
          showCancelButton: true,
          cancelButtonText: 'خیر',
          confirmButtonText: 'بله'
     }).then(async result => {
          if (result.isConfirmed) {
               const newRole = result.value

               const userNewRoleInfos = {
                    role: newRole,
                    id: userID,
               }
               const res = await axios({
                    url: `http://localhost:4000/v1/users/role`,
                    method: "put",
                    headers: {
                         Authorization: `Bearer ${getToken()}`,
                         "Content-Type": "application/json"
                    },
                    data: JSON.stringify(userNewRoleInfos)
               })

               if (res.status === 200) {
                    getAndShowAllUsers()
                    Swal.fire({
                         title: `رول ${userName} به ${newRole} تغییر کرد`,
                         icon: 'success',
                         toast: true,
                         position: 'top-start',
                         showConfirmButton: false,
                         timer: 1500,
                    })
               }

          }
     })
}

const updateUser = async () => {
     const nameInp = document.querySelector('#name')
     const usernameInp = document.querySelector('#username')
     const emailInp = document.querySelector('#email')
     const telInp = document.querySelector('#tel')
     const passwordInp = document.querySelector('#password')

     const userNewInfos = {
          name: nameInp.value.trim(),
          username: usernameInp.value.trim(),
          email: emailInp.value.trim(),
          phone: telInp.value.trim(),
          password: passwordInp.value.trim(),
     }

     const res = await axios({
          url: `http://localhost:4000/v1/users`,
          method: 'put',
          headers: {
               Authorization: `Bearer ${getToken()}`,
               "Content-Type": "application/json"
          },
          data: JSON.stringify(userNewInfos)
     })

     if (res.status === 200) {
          Swal.fire({
               title: "ویرایش شد",
               showConfirmButton: false,
               icon: "success",
               timer: 1000,
          }).then(() => location.reload())
     }
}

export {
     getAndShowAllUsers,
     removeUser,
     banUser,
     createNewUsers,
     changeRole,
     updateUser,
}