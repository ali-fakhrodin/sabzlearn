import { saveToLocalStorage, getToken } from "./utils.js"

const $ = document

const register = () => {
     const nameInp = $.querySelector('.login-form__name-input')
     const usernameInp = $.querySelector('.login-form__username-input')
     const emailInp = $.querySelector('.login-form__email-input')
     const phoneNumberInp = $.querySelector('.login-form__tel-input')
     const passwordInp = $.querySelector('.login-form__password-input')

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
               if (res.status === 201) {
                    Swal.fire({
                         title: 'شما با موفقیت ثبت نام شدید',
                         text: 'به سایت ما خوش اومدی',
                         icon: 'success',
                         showConfirmButton: false,
                         confirmButtonText: 'حله',
                         position: "top-end",
                         timer: 1200,
                         timerProgressBar: true,
                    }).then(() => {
                         location.href = 'index.html'
                    })
               }
               return res
          })
          .then(result => {
               saveToLocalStorage('user', { token: result.data.accessToken })
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
               }
          })
}

const login = () => {
     const identifierInput = $.querySelector('.login-form__username-input')
     const passwordInput = $.querySelector('.login-form__password-input')

     const userInfos = {
          identifier: identifierInput.value.trim(),
          password: passwordInput.value.trim()
     }

     axios({
          method: 'post',
          url: 'http://localhost:4000/v1/auth/login',
          data: userInfos,
     })
          .then(res => {
               console.log(res)

               if (res.status === 200) {
                    Swal.fire({
                         title: 'شما با موفقیت وارد شدید',
                         text: 'به سایت ما خوش اومدی',
                         icon: 'success',
                         showConfirmButton: false,
                         confirmButtonText: 'حله',
                         position: "top-end",
                         timer: 1200,
                         timerProgressBar: true,
                    }).then(() => {
                         location.href = 'index.html'
                    })
               }

               return res
          })
          .then(result => {
               saveToLocalStorage('user', { token: result.data.accessToken })
          })
          .catch(err => {
               console.log(err.response.data)

               if (err.status === 401) {
                    Swal.fire({
                         title: 'کاربری با این اطلاعات یافت نشد',
                         icon: 'error',
                         showConfirmButton: false,
                         confirmButtonText: 'حله',
                         position: "top-end",
                         timer: 1500,
                         timerProgressBar: true,
                    })
               }
          })
}

const getMe = async () => {
     const token = getToken()

     if (!token) {
          return false
     }
     const res = await axios({
          method: 'get',
          url: `http://localhost:4000/v1/auth/me`,
          headers: { Authorization: `Bearer ${token}` }
     })

     const data = await res.data

     return data
}

export { register, login, getMe };