const getAndShowAllMenus = async () => {
     const menusWrapperElem = document.querySelector('.table tbody')
     // menusWrapperElem.innerHTML = ''
     const menus = await axios({ url: `http://localhost:4000/v1/menus/all` })
     console.log(menus);

     menus.data.forEach((menu, index) => {
          // console.log(menu);

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
                              <button type='button' class='btn btn-danger delete-btn'>حذف</button>
                              </td>
                         </tr>
               `)


     });
     return menus.data
}

export {
     getAndShowAllMenus,
}