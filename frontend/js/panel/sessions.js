import { getAndShowAllSessions, prepareCreateNewSession, createNewSession, removeSession } from './funcs/sessions.js';

window.removeSession = removeSession

window.addEventListener("load", () => {
     const createSessionBtn = document.querySelector('#submit')
     prepareCreateNewSession()
     createSessionBtn.addEventListener('click', e => {
          e.preventDefault()
          createNewSession()
     })

     getAndShowAllSessions()
})