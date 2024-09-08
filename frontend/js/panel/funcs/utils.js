import { getToken } from "../../../js/funcs/utils.js"

const getAdminInfos = async () => {
     const admin = await axios({
          url: `http://localhost:4000/v1/auth/me`,
          headers: {
               Authorization: `Bearer ${getToken()}`
          }
     })

     return admin.data
}

const logOut = async () => {
     localStorage.removeItem('user')
     return true
}

export {
     getAdminInfos,
     logOut,
}