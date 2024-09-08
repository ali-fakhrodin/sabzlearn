import { getToken } from "../../funcs/utils.js"

const getAndShowUsersOrders = async () => {
     const ordersListWrapper = document.querySelector('.order__table-body')
     ordersListWrapper.innerHTML = ''

     const res = await axios({
          url: `http://localhost:4000/v1/orders`,
          headers: {
               Authorization: `Bearer ${getToken()}`
          }
     })
     const orders = await res.data
     
     if (orders.length) {
          orders.forEach((order, index) => {
               ordersListWrapper.insertAdjacentHTML('beforeend', `
                         <tr class="order__table-body-list">
                              <td class="order__table-body-item">${index + 1}- ${order.course.name}</td>
                              <td class="order__table-body-item">${order.createdAt.slice(0, 10)}</td>
                              <td class="order__table-body-item">${order.price ? order.price : 'رایگان'}</td>
                              <td class="order__table-body-btn" ><a href="#">جزئیات</a></td>
                         </tr>
                    `)
          });
     } else {
          ordersListWrapper.innerHTML = `
               <tr class="order__table-body-list">
                    <div class="text-danger p-4">سفارشی وجود ندارد!</div>
               </tr>
          `
          console.log('s');
          
     }

}

export {
     getAndShowUsersOrders,
}