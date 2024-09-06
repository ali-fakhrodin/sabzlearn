import { getAndShowAllContacts, removeContact, sendAnswer, showMessage } from "./funcs/contacts.js";

window.sendAnswer = sendAnswer
window.showMessage = showMessage
window.removeContact = removeContact

window.addEventListener('load', () => {

     getAndShowAllContacts()
})
