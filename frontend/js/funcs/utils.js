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

const searchInArray = (array, searchProperty, searchValue) => {
     let outputArray = array.filter(item => item[searchProperty].toLowerCase().includes(searchValue.toLowerCase()))

     return outputArray
}

const addParamToUrl = (param, value) => {
     let url = new URL(location.href)
     let searchParams = url.searchParams
     searchParams.set(param, value)
     url.search = searchParams.toString()
     location.href = url

     console.log(url);
}

const paginateItems = (array, itemsPerPage, itemsParent, currentPage) => {
     itemsParent.innerHTML = ''
     let endIndex = currentPage * itemsPerPage
     let startIndex = endIndex - itemsPerPage
     let paginatedCount = Math.ceil(array.length / itemsPerPage);
     let paginatedItems = array.slice(startIndex, endIndex);
     const categoryNameParam = getUrlParam('cat')

     for (let index = 0; index < paginatedCount; index++) {
          itemsParent.insertAdjacentHTML('beforeend', `
                         <li class="courses-pagination-item">
                              ${(index + 1) == currentPage ? `
                                   <a onclick="addParamToUrl('page', ${index + 1})"
                                        class="courses-pagination-link rounded-3 d-flex align-items-center justify-content-center courses__pagintaion-link--active">${index + 1}</a>
                                   `: `
                                   <a onclick="addParamToUrl('page', ${index + 1})"
                                        class="courses-pagination-link rounded-3 d-flex align-items-center justify-content-center">${index + 1}</a>
                              `}
                         </li>
               `)
     }


     return paginatedItems
}

export {
     saveToLocalStorage,
     getFromLocalStorage,
     getToken,
     isLogin,
     getUrlParam,
     searchInArray,
     paginateItems,
     addParamToUrl,
}