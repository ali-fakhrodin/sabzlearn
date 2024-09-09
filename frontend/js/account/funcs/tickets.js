import { getToken } from '../../funcs/utils.js'

const getAndShowAllTickets = async () => {
     const ticketListWrapper = document.querySelector('.ticket-content')
     const ticketCountTitle = document.querySelector('.ticket-content__title')

     const res = await axios({
          url: `http://localhost:4000/v1/tickets/user`,
          headers: {
               Authorization: `Bearer ${getToken()}`
          }
     })

     const tickets = await res.data

     ticketCountTitle.innerHTML = ''
     ticketCountTitle.innerHTML = `نمایش ${tickets.length} تیکت`

     if (tickets.length) {
          tickets.forEach(ticket => {
               ticketListWrapper.insertAdjacentHTML('beforeend', `
                    <div class="ticket-content__box">
                        <div class="ticket-content__right">
                            <div class="ticket-content__right-right">
                                <a class="ticket-content__link" href="#">
                                ${ticket.title}
                                </a>
                                <span class="ticket-content__category">
                                    <i class="fa fa-ellipsis-v ticket-content__icon"></i>
                                    پشتیبانی دوره ها</span>
                            </div>
                            <div class="ticket-content__right-left">
                                <span class="ticket-content__name">محمدامین سعیدی راد</span>
                            </div>
                        </div>
                        <div class="ticket-content__left">
                            <div class="ticket-content__left-right">
                                <div class="ticket-content__condition">
                                    <span class="ticket-content__condition-text">پاسخ داده شده</span>
                                </div>
                            </div>
                            <div class="ticket-content__left-left">
                                <span class="ticket-content__time">2022/04/08</span>
                                <span class="ticket-content__time-month">8 ماه قبل</span>
                            </div>
                        </div>
                    </div>
                    `)
          });
     } else {
          ticketListWrapper.insertAdjacentHTML('beforeend', `
                    <p class="alert alert-danger">هیچ تیکتی از شما ارسال نشده!</p>
               `)
     }
}

export {
     getAndShowAllTickets
}