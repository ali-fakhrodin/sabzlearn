import { getToken } from '../../funcs/utils.js';
import {
     ClassicEditor,
     AccessibilityHelp,
     Autoformat,
     AutoImage,
     Autosave,
     BalloonToolbar,
     BlockQuote,
     Bold,
     Code,
     Essentials,
     FontBackgroundColor,
     FontColor,
     FontFamily,
     FontSize,
     Heading,
     Highlight,
     ImageBlock,
     ImageCaption,
     ImageInline,
     ImageInsert,
     ImageInsertViaUrl,
     ImageResize,
     ImageStyle,
     ImageTextAlternative,
     ImageToolbar,
     ImageUpload,
     Indent,
     IndentBlock,
     Italic,
     Link,
     LinkImage,
     List,
     ListProperties,
     MediaEmbed,
     Paragraph,
     PasteFromOffice,
     SelectAll,
     SimpleUploadAdapter,
     SpecialCharacters,
     SpecialCharactersArrows,
     SpecialCharactersCurrency,
     SpecialCharactersEssentials,
     SpecialCharactersLatin,
     SpecialCharactersMathematical,
     SpecialCharactersText,
     Strikethrough,
     Table,
     TableCaption,
     TableCellProperties,
     TableColumnResize,
     TableProperties,
     TableToolbar,
     TextTransformation,
     TodoList,
     Underline,
     Undo
} from 'ckeditor5';

const editorConfig = {
     toolbar: {
          items: [
               'undo',
               'redo',
               '|',
               'heading',
               '|',
               'fontSize',
               'fontFamily',
               'fontColor',
               'fontBackgroundColor',
               '|',
               'bold',
               'italic',
               'underline',
               'strikethrough',
               'code',
               '|',
               'specialCharacters',
               'link',
               'insertImage',
               'mediaEmbed',
               'insertTable',
               'highlight',
               'blockQuote',
               '|',
               'bulletedList',
               'numberedList',
               'todoList',
               'outdent',
               'indent'
          ],
          shouldNotGroupWhenFull: false
     },
     plugins: [
          AccessibilityHelp,
          Autoformat,
          AutoImage,
          Autosave,
          BalloonToolbar,
          BlockQuote,
          Bold,
          Code,
          Essentials,
          FontBackgroundColor,
          FontColor,
          FontFamily,
          FontSize,
          Heading,
          Highlight,
          ImageBlock,
          ImageCaption,
          ImageInline,
          ImageInsert,
          ImageInsertViaUrl,
          ImageResize,
          ImageStyle,
          ImageTextAlternative,
          ImageToolbar,
          ImageUpload,
          Indent,
          IndentBlock,
          Italic,
          Link,
          LinkImage,
          List,
          ListProperties,
          MediaEmbed,
          Paragraph,
          PasteFromOffice,
          SelectAll,
          SimpleUploadAdapter,
          SpecialCharacters,
          SpecialCharactersArrows,
          SpecialCharactersCurrency,
          SpecialCharactersEssentials,
          SpecialCharactersLatin,
          SpecialCharactersMathematical,
          SpecialCharactersText,
          Strikethrough,
          Table,
          TableCaption,
          TableCellProperties,
          TableColumnResize,
          TableProperties,
          TableToolbar,
          TextTransformation,
          TodoList,
          Underline,
          Undo
     ],
     balloonToolbar: ['bold', 'italic', '|', 'link', 'insertImage', '|', 'bulletedList', 'numberedList'],
     fontFamily: {
          supportAllValues: true
     },
     fontSize: {
          options: [10, 12, 14, 'default', 18, 20, 22],
          supportAllValues: true
     },
     heading: {
          options: [
               {
                    model: 'paragraph',
                    title: 'Paragraph',
                    class: 'ck-heading_paragraph'
               },
               {
                    model: 'heading1',
                    view: 'h1',
                    title: 'Heading 1',
                    class: 'ck-heading_heading1'
               },
               {
                    model: 'heading2',
                    view: 'h2',
                    title: 'Heading 2',
                    class: 'ck-heading_heading2'
               },
               {
                    model: 'heading3',
                    view: 'h3',
                    title: 'Heading 3',
                    class: 'ck-heading_heading3'
               },
               {
                    model: 'heading4',
                    view: 'h4',
                    title: 'Heading 4',
                    class: 'ck-heading_heading4'
               },
               {
                    model: 'heading5',
                    view: 'h5',
                    title: 'Heading 5',
                    class: 'ck-heading_heading5'
               },
               {
                    model: 'heading6',
                    view: 'h6',
                    title: 'Heading 6',
                    class: 'ck-heading_heading6'
               }
          ]
     },
     image: {
          toolbar: [
               'toggleImageCaption',
               'imageTextAlternative',
               '|',
               'imageStyle:inline',
               'imageStyle:wrapText',
               'imageStyle:breakText',
               '|',
               'resizeImage'
          ]
     },
     link: {
          addTargetToExternalLinks: true,
          defaultProtocol: 'https://',
          decorators: {
               toggleDownloadable: {
                    mode: 'manual',
                    label: 'Downloadable',
                    attributes: {
                         download: 'file'
                    }
               }
          }
     },
     list: {
          properties: {
               styles: true,
               startIndex: true,
               reversed: true
          }
     },
     placeholder: 'Type or paste your content here!',
     table: {
          contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
     },
     language: "fa",
};

let articleBodyEditor = null
let articleCover = null
let articleCatID = -1

const prepareCreateNewArticle = async () => {
     const categoryListElem = document.querySelector('#category-list')
     const articleCoverElem = document.querySelector('#file')

     // Handle Article Body CK Editor
     ClassicEditor.create(document.querySelector('#editor'), editorConfig)
          .then(editor => articleBodyEditor = editor)

     // Handle Category
     const res = await axios({ url: `http://localhost:4000/v1/category` })
     const categories = await res.data

     categories.forEach(category => {
          categoryListElem.insertAdjacentHTML('beforeend', `
                    <option value="${category._id}">${category.title}</option>
               `)
     })

     categoryListElem.addEventListener('change', e => articleCatID = e.target.value)
     articleCoverElem.addEventListener('change', e => articleCover = e.target.files[0])
}

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
                         <td>${article.publish ? "منتشر شده" : "پیش نویس"}</td>
                         <td>${article.createdAt.slice(0, 10)}</td>
                         <td>
                             <button type="button" class="btn btn-primary" id="edit-btn">ویرایش</button>
                         </td>
                         <td>
                             <button type="button" onclick="removeArticle('${article._id}', '${article.title}')" class="btn btn-danger" id="delete-btn">حذف</button>
                         </td>
                    </tr>
               `)
     });
}

const createNewArticle = async () => {
     const articleTitleInp = document.querySelector('#title')
     const articleShortNameInp = document.querySelector('#short-name')
     const articleDescInp = document.querySelector('#article-desc')

     const formData = new FormData()
     formData.append("title", articleTitleInp.value.trim())
     formData.append("description", articleDescInp.value.trim())
     formData.append("body", articleBodyEditor.getData())
     formData.append("shortName", articleShortNameInp.value.trim())
     formData.append("categoryID", articleCatID)
     formData.append("cover", articleCover)

     const res = await axios({
          url: `http://localhost:4000/v1/articles`,
          headers: {
               Authorization: `Bearer ${getToken()}`,
          },
          method: 'post',
          data: formData,
     })

     if (res.status === 201) {
          getAndShowAllArticles()
          Swal.fire({
               title: "مقاله جدید، ساخته شد",
               icon: 'success',
               toast: true,
               position: 'top-start',
               showConfirmButton: false,
               timer: 2000,
               timerProgressBar: true,
          })
     }
}

const removeArticle = async (articleID, articleTitle) => {
     console.log(articleID, articleTitle);

     Swal.fire({
          title: 'از حذف مقاله مطمئنی؟',
          text: `عنوان مقاله: ${articleTitle}`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'بله',
          confirmButtonColor: 'red'
     }).then(res => {
          if (res.isConfirmed) {
               axios({
                    url: `http://localhost:4000/v1/articles/${articleID}`,
                    method: 'delete',
                    headers: {
                         Authorization: `Bearer ${getToken()}`
                    }
               }).then(() => {
                    getAndShowAllArticles()
                    Swal.fire({
                         title: 'مقاله با موفقیت حذف شد!',
                         text: `عنوان مقاله: ${articleTitle}`,
                         icon: 'success',
                         showConfirmButton: false,
                         toast: true,
                         position: 'top-start',
                         timer: 3000,
                         timerProgressBar: true,
                    })
               })

          }
     })

}

export {
     getAndShowAllArticles,
     prepareCreateNewArticle,
     createNewArticle,
     removeArticle,
}