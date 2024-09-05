import { getToken } from '../../funcs/utils.js'

const getAndShowAllUsers = async () => {
     const usersListWrapperElem = document.querySelector('.table tbody')

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
                        <td>${index}</td>
                        <td>${user.name}</td>
                        <td>${user.username}</td>
                        <td>${user.phone}</td>
                        <td>${user.email}</td>
                        <td>${user.role === "ADMIN" ? "مدیر سایت" : "کاربر عادی"}</td>
                        <td>
                            <button type='button' class='btn btn-primary edit-btn'>ویرایش</button>
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

export {
     getAndShowAllUsers,
     removeUser,
     banUser,
}