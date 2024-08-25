const saveToLocalStorage = (key, value) => {
     return localStorage.setItem(key, JSON.stringify(value))     
}

const getFromLocalStorage = (key) => {
     return JSON.stringify(localStorage.getItem(key))
}

const getToken = () => {
     return JSON.parse(localStorage.getItem('user')).token
}

export { saveToLocalStorage, getFromLocalStorage, getToken }