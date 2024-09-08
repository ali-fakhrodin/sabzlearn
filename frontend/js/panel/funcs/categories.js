import { getToken } from "../../funcs/utils.js";

const getAndShowAllCategories = async () => {
     const categoryItemsWrapper = document.querySelector('.table tbody')

     categoryItemsWrapper.innerHTML = ''

     const res = await axios({ url: `http://localhost:4000/v1/category` })
     const categories = await res.data

     categories.forEach((cat, index) => {
          categoryItemsWrapper.insertAdjacentHTML('beforeend', `
                    <tr>
                         <td>${index + 1}</td>
                         <td>${cat.title}</td>
                         <td>${cat.name}</td>
                         <td>
                              <button type="button" class="btn btn-primary" id="edit-btn">ویرایش</button>
                         </td>
                         <td>
                             <button type="button" onclick="removeCategory('${cat._id}', '${cat.title}')" class="btn btn-danger" id="delete-btn">حذف</button>
                         </td>
                    </tr>
               `)
     });

     console.log(categories);

}

const removeCategory = async (catID, catTitle) => {
     console.log(catID, catTitle);

     Swal.fire({
          title: 'از حذف دسته بندی مطمئنی؟',
          text: `نام دسته بندی: ${catTitle}`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'بله',
          confirmButtonColor: 'red'
     }).then(res => {
          if (res.isConfirmed) {
               axios({
                    url: `http://localhost:4000/v1/category/${catID}`,
                    method: 'delete',
                    headers: {
                         Authorization: `Bearer ${getToken()}`
                    }
               }).then (() => {
                    getAndShowAllCategories()
                    Swal.fire({
                         title: 'دسته بندی با موفقیت حذف شد!',
                         text: `نام دسته بندی: ${catTitle}`,
                         icon: 'success',
                         showConfirmButton: false,
                         toast: true,
                         position: 'top-start',
                         timer: 2000,
                    })             
               })

          }
     })
}

const createNewCategory = async () => {
     const titleInpElem = document.querySelector('#title')
     const nameInpElem = document.querySelector('#href')

     const newCatInfos = {
          title: titleInpElem.value.trim(),
          name: nameInpElem.value.trim(),
     }

     const res = await axios({
          url: `http://localhost:4000/v1/category`,
          method: 'post',
          headers: {
               Authorization: `Bearer ${getToken()}`,
               "Content-Type": "Application/json"
          },
          data: JSON.stringify(newCatInfos),
     })

     if (res.status === 201) {
          getAndShowAllCategories()
          Swal.fire({
               title: 'دسته بندی جدید با موفقیت اضافه شد!',
               icon: 'success',
               toast: true,
               position: 'top-start',
               showConfirmButton: false,
               timer: 1500,
          })
     }
}

export {
     getAndShowAllCategories,
     removeCategory,
     createNewCategory,
}