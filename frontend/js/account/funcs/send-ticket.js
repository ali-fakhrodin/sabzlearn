const prepareSendTicket = async () => {
     const ticketDepartmentsWrapper = document.querySelector('.ticket-form__select')
     const res = await axios({url: `http://localhost:4000/v1/tickets/departments`})
     const departments = await res.data

     console.log(res);
}
// backend for departments is empty! 

export {
     prepareSendTicket,
}