import { getToken } from '../../funcs/utils.js';

const getAndShowUserInfosInEdit = async () => {
     const phoneInp = document.querySelector('#tel')
     const nameInp = document.querySelector('#name')
     const usernameInp = document.querySelector('#username')
     const emailInp = document.querySelector('#email')

     const res = await axios({
          url: `http://localhost:4000/v1/auth/me`,
          headers: {
               Authorization: `Bearer ${getToken()}`
          }
     })

     const user = await res.data

     phoneInp.value = user.phone
     nameInp.value = user.name
     usernameInp.value = user.username
     emailInp.value = user.email
}

export {
     getAndShowUserInfosInEdit,
}