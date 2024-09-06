const getAndShowAllArticles = async () => {
     const articlesListTable = document.querySelector('.table tbody')
     articlesListTable.innerHTML = ''

     const res = await axios({
          url: `http://localhost:4000/v1/articles`
     })

     const articles = await res.data
     console.log(articles);

     articles.forEach((article, index) => {
          articlesListTable.insertAdjacentHTML('beforeend', `
                    <tr>
                         <td>${index + 1}</td>
                         <td>${article.title}</td>
                         <td>${article.creator.name}</td>
                         <td>${article.publish ? "منتشر شده" : "پیشنویس"}</td>
                         <td>${article.createdAt.slice(0, 10)}</td>
                         <td>
                             <button type="button" class="btn btn-primary" id="edit-btn">ویرایش</button>
                         </td>
                         <td>
                             <button type="button" onclick="removeArticle('${article._id}', '${article.name}')" class="btn btn-danger" id="delete-btn">حذف</button>
                         </td>
                    </tr>
               `)
     });

}

export {
     getAndShowAllArticles,
}