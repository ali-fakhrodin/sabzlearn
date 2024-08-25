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
          .then((res) => console.log(res.data))
}

export { register };