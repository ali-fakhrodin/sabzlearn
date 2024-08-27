import { getCourseDetails, getSessions } from "./funcs/shared.js";

window.addEventListener('load', () => {
     getCourseDetails()
     
     getSessions().then(sessions => {
          sessions.data.forEach(session => {
               console.log(session);
               
          });

     })


})