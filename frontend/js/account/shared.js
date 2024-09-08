import { logOut } from '../../js/panel/funcs/utils.js';

window.addEventListener('load', () => {
     const logoutBtn = document.querySelector('#logout-user')

     logoutBtn.addEventListener('click', e => {
          e.preventDefault()

          Swal.fire({
               title: 'آیا از خروج مطمئنی؟',
               confirmButtonText: 'بله',
               showCancelButton: true,
               cancelButtonText: 'خیر'
          }).then(result => {
               if (result.isConfirmed) {
                    logOut()
                    console.log(result);
                    Swal.fire({
                         title: 'خارج شدید!',
                         icon: 'success',
                         toast: true,
                         position: 'top-start',
                         showConfirmButton: false,
                         timer: 1200,
                         timerProgressBar: true,
                    }).then(() => location.href = '../../index.html')
               }
          })
          
     })

})