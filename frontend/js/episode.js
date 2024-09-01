import { getSessionDetails } from "./funcs/shared.js"


window.addEventListener('load', () => {
     getSessionDetails().then(res => console.log(res.data))
})