import { getToken } from '../../funcs/utils.js';

const getAndShowAllComments = async () => {
     const commentsContainer = document.querySelector('.table tbody')
     commentsContainer.innerHTML = ''

     const res = await axios({ url: `http://localhost:4000/v1/comments` })
     const comments = await res.data

     console.log(comments);

     comments.forEach((comment, index) => {
          commentsContainer.insertAdjacentHTML('beforeend', `
               <tr>
                    <td class="${comment.answer ? "answer-contact" : "no-answer-contact"}">${index + 1}</td>
                    <td>${comment.creator.name}</td>
                    <td>${comment.course.name}</td>
                    <td>${comment.createdAt.slice(0, 10)}</td>
                    <td>${comment.score}</td>
                    <td>
                         <button type="button" class="btn btn-primary" id="show-btn" onclick="showComment('${comment.creator.name}',\`${(comment.body)}\`)">مشاهده</button>
                    </td>
                    <td>
                        <button type="button" class="btn btn-primary" id="edit-btn" onclick="answerComment('${comment._id}')">پاسخ</button>
                    </td>
                    <td>
                        <button type="button" class="btn btn-primary" id="accept-btn" onclick="acceptComment('${comment._id}')">تایید</button>
                    </td>
                    <td>
                        <button type="button" class="btn btn-warning text-white" id="reject-btn" onclick="rejectComment('${comment._id}')">رد</button>
                    </td>
                    <td>
                        <button type="button" onclick="removeComment('${comment._id}')" class="btn btn-danger" id="delete-btn">حذف</button>
                    </td>
               </tr>
          `)
     });
}

const showComment = (userName, commentBody) => {
     Swal.fire({
          title: `فرستنده: ${userName}`,
          text: commentBody,
          confirmButtonText: "مشاهده کردم"
     })
}

const acceptComment = (commentID) => {
     console.log(commentID);

     axios({
          url: `http://localhost:4000/v1/comments/accept/${commentID}`,
          method: 'put',
          headers: {
               Authorization: `Bearer ${getToken()}`
          }
     }).then(getAndShowAllComments)

}

const rejectComment = (commentID) => {
     console.log(commentID);

     axios({
          url: `http://localhost:4000/v1/comments/reject/${commentID}`,
          method: 'put',
          headers: {
               Authorization: `Bearer ${getToken()}`
          }
     }).then(getAndShowAllComments)
}

const answerComment = async (commentID) => {
     Swal.fire({
          title: "پاسخ:",
          input: 'textarea',
          showCancelButton: true,
          cancelButtonText: "لغو",
     }).then(res => {
          if (res.isConfirmed) {
               const data = { body: res.value, score: Number(5) }

               axios({
                    url: `http://localhost:4000/v1/comments/answer/${commentID}`,
                    method: 'post',
                    headers: {
                         Authorization: `Bearer ${getToken()}`,
                         "Content-Type": "application/json"
                    },
                    data: JSON.stringify(data)
               })

               console.log(res.value);
          }
     })
}

const removeComment = async (commentID) => {
     console.log(commentID);

     Swal.fire({
          title: "آیا از حذف کامنت مطمئنی؟",
          icon: "warning",
          confirmButtonText: "بله",
          confirmButtonColor: "red",
          showCancelButton: "red",
          cancelButtonText: "برگشت",
     }).then(res => {
          if (res.isConfirmed) {
               axios({
                    url: `http://localhost:4000/v1/comments/${commentID}`,
                    method: "delete",
                    headers: {
                         Authorization: `Bearer ${getToken()}`
                    }
               }).then(res => {
                    if (res.status === 200) {
                         getAndShowAllComments()
                         Swal.fire({
                              title: "کامنت مورد نظر، حذف شد",
                              icon: 'success',
                              toast: true,
                              showConfirmButton: false,
                              position: 'top-start',
                              timer: 1500,
                              timerProgress: true,
                         })
                    }
               })
          }
     })

}

export {
     getAndShowAllComments,
     showComment,
     acceptComment,
     rejectComment,
     answerComment,
     removeComment,
}