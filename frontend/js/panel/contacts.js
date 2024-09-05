import { getAndShowAllContacts, sendAnswer, showMessage } from "./funcs/contacts.js";

window.sendAnswer = sendAnswer
window.showMessage = showMessage

window.addEventListener('load', () => {

     getAndShowAllContacts()
})
