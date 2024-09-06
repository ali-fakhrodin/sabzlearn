import { createNewArticle, getAndShowAllArticles, prepareCreateNewArticle } from './funcs/articles.js';


window.addEventListener('load', () => {
     const addNewArticleBtn = document.querySelector('#create-article-btn')
     prepareCreateNewArticle()
     getAndShowAllArticles()

     addNewArticleBtn.addEventListener('click', e => {
          e.preventDefault()
          createNewArticle()
     })
})