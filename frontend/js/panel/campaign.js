import { setCampaign } from "./funcs/campaign.js";

window.addEventListener('load', () => {
     const addCampagnBtn = document.querySelector('#campaign-percent-btn')

     addCampagnBtn.addEventListener('click', e => {
          e.preventDefault()
          setCampaign()
     })
})