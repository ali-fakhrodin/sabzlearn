import { acceptComment, answerComment, getAndShowAllComments, rejectComment, removeComment, showComment } from "./funcs/comments.js"

window.acceptComment = acceptComment
window.showComment = showComment
window.rejectComment = rejectComment
window.answerComment = answerComment
window.removeComment = removeComment


window.addEventListener('load', () => {
     getAndShowAllComments()
})