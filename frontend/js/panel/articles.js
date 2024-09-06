import { createNewArticle, getAndShowAllArticles, prepareCreateNewArticle, removeArticle } from './funcs/articles.js';

window.removeArticle = removeArticle

window.addEventListener('load', () => {
     const addNewArticleBtn = document.querySelector('#create-article-btn')
     prepareCreateNewArticle()
     getAndShowAllArticles()

     addNewArticleBtn.addEventListener('click', e => {
          e.preventDefault()
          createNewArticle()
     })
})