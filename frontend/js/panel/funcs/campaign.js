import { getToken } from '../../funcs/utils.js'

const setCampaign = async () => {
     const campaignPercentInp = document.querySelector('#campaign-percent-input')

     const newCampaignInfos = {
          discount: campaignPercentInp.value
     }

     const res = await axios({
          url: `http://localhost:4000/v1/offs/all`,
          method: 'post',
          headers: {
               Authorization: `Bearer ${getToken()}`,
               "Content-Type": "application/json"
          },
          data: JSON.stringify(newCampaignInfos)
     })

     const result = await res.data

     if (res.status === 200) {
          Swal.fire({
               title: 'کمپین با موفقیت برگزار شد',
               confirmButtonColor: "#dc3545",
               timer: 2000,
               showConfirmButton: false,
               timerProgressBar: true,
               toast: true,
               icon: 'success',
               position: 'top-start'
          })
     }
     console.log(res);
     console.log(result);

}

export {
     setCampaign
}