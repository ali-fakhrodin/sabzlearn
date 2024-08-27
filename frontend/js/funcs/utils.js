const saveToLocalStorage = (key, value) => {
     return localStorage.setItem(key, JSON.stringify(value))
}

const getFromLocalStorage = (key) => {
     return JSON.stringify(localStorage.getItem(key))
}

const getToken = () => {
     const userInfos = JSON.parse(localStorage.getItem('user'))
     return userInfos ? userInfos.token : null;
}

const isLogin = () => {
     const userInfos = localStorage.getItem('user')
     return userInfos ? true : false
}

const getUrlParam = key => {
     const urlParams = new URLSearchParams(window.location.search)
     return urlParams.get(key)
}

export { saveToLocalStorage, getFromLocalStorage, getToken, isLogin, getUrlParam }