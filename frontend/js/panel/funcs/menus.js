import { getToken } from '../../funcs/utils.js'

const getAndShowAllMenus = async () => {
     const menusWrapperElem = document.querySelector('.table tbody')

     menusWrapperElem.innerHTML = ''

     const menus = await axios({ url: `http://localhost:4000/v1/menus/all` })
     menus.data.forEach((menu, index) => {
          menusWrapperElem.insertAdjacentHTML('beforeend', `
                    <tr>
                         <td>${index + 1}</td>
                         <td>${menu.title}</td>
                         <td><a href="#">${menu.href}</a></td>
                         <td>${menu.parent ? menu.parent.title : '--'}</td>
                         <td>
                         <button type='button' class='btn btn-primary edit-btn'>ویرایش</button>
                         </td>
                         <td>
                         <button type='button' class='btn btn-danger delete-btn' onclick="removeMenu('${menu._id}', '${menu.title}')">حذف</button>
                         </td>
                    </tr>
               `)
     });
     return menus.data
}

let parentMenuID = undefined

const prepareCreateNewMenu = async () => {
     const selectParentMenu = document.querySelector('#parent-menu-inp')

     selectParentMenu.innerHTML = '<option value="undifind">پرنت را انتخاب کن (اختیاری)</option>'

     const res = await axios({ url: `http://localhost:4000/v1/menus` })
     const menus = res.data

     console.log(menus);

     menus.forEach(menu => {
          selectParentMenu.insertAdjacentHTML('beforeend', `
               <option value="${menu._id}">${menu.title}</option>   
               `)
     })
     selectParentMenu.addEventListener('change', event => parentMenuID = event.target.value)
}

const createNewMenu = async () => {
     const titleInpElem = document.querySelector('#title')
     const hrefInpElem = document.querySelector('#href')
     const newMenuInfos = {
          title: titleInpElem.value.trim(),
          href: hrefInpElem.value.trim(),
          parent: parentMenuID,
     }

     const res = await axios({
          url: `http://localhost:4000/v1/menus`,
          method: 'post',
          headers: {
               Authorization: `Bearer ${getToken()}`,
               "Content-Type": "application/json"
          },
          data: JSON.stringify(newMenuInfos)
     })

     if (res.status === 201) {
          Swal.fire({
               title: 'منوی جدید با موفقیت اضافه شد',
               icon: 'success',
               confirmButtonText: 'حله',

          })
     } else {
          Swal.fire({
               title: 'با خطا مواجه شدید',
               icon: 'error',
               confirmButtonText: 'حله',
          })
     }

     console.log(res);
}

const removeMenu = async (menuID, menuTitle) => {
     console.log(menuID, menuTitle);

     Swal.fire({
          title: 'از حذف منو مطمئنی؟',
          text: `عنوان منو: ${menuTitle}`,
          confirmButtonColor: 'red',
          showCancelButton: true,
     }).then(res => {
          if (res.isConfirmed) {
               const res = axios({
                    url: `http://localhost:4000/v1/menus/${menuID}`,
                    method: 'delete',
                    headers: {
                         Authorization: `Bearer ${getToken()}`
                    }
               }).then(() => {
                    getAndShowAllMenus()
                    
                    Swal.fire({
                         title: 'منوی مورد نظر حذف شد!',
                         text: `عنوان منو: ${menuTitle}`,
                         icon: 'success',
                         showConfirmButton: false,
                         toast: true,
                         position: 'top-start',
                         timer: 2000,
                         timerProgressBar: true,
                    })
               })
          }
     })
     // if (res.status === 200) {
     //      Swal.fire({
     //           title:
     //      })
     // }

}

export {
     getAndShowAllMenus,
     prepareCreateNewMenu,
     createNewMenu,
     removeMenu,
}