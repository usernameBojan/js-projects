const pagNums = document.querySelectorAll('.pagination-numbers');
const stories = '../../data/news.json';
const pageSize = 5;
const mainArticle = document.querySelector('#main-article');
const mainArticleImg = document.querySelector('#main-article-img');
const mainArticleTitle = document.querySelector('#main-article-title');
const mainArticleBtn = document.querySelector('#main-article-btn');
const mainArticleDescription = document.querySelector('#main-article-description');

function populateHomepage(data, page, pageSize, target, mainArticleTarget){
   pagNums.forEach((el) => {
      if (parseInt(el.innerText) > Math.ceil(data.length / pageSize)) {
         el.classList.add('hide');
      }
   });

   target.innerHTML = '';

   const storiesArr = data.reverse();
   const slicedArr = storiesArr.slice(page * pageSize, (page + 1) * pageSize);
   const firstObj = slicedArr.shift();

   if (mainArticleTarget !== null) {
      mainArticleImg.setAttribute('src', firstObj.image);
      mainArticleImg.setAttribute('alt', firstObj.description);
      mainArticleTitle.innerText = firstObj.title;
      mainArticleDescription.innerText = firstObj.description;
      mainArticleBtn.setAttribute('href', `../article/article.html?id=${firstObj.id}/`);
      mainArticleBtn.setAttribute('target', '_blank');
   } else {
      if (document.contains(mainArticle)) {
         mainArticle.style.display = 'none';
         slicedArr.push(firstObj);
      }
   }

   for (let results of slicedArr) {
      target.innerHTML += `
            <section class="news">
                    <img src="${results.image}" alt="${results.description}">
                    <div class="content">
                        <h3 class="article-title">${results.title}</h3>
                        <p>${results.description}</p>
                        <a href="../article/article.html?id=${results.id}/" class="btn-link">Read more</a>
                    </div>
            </section>
        `;
   }
}

function getCurrentPage(){
   const hash = window.location.hash;

   if (!hash) {
      return 0;
   }

   const parts = hash.split('/');
   return parseInt(parts[parts.findIndex((p) => p === 'page') + 1]);
}

function showCurrentPage(data, container, mainArticle){
   const curPage = getCurrentPage();
   mainArticle === null
      ? populateHomepage(data, curPage, 10, container, mainArticle)
      : populateHomepage(data, curPage, pageSize, container, mainArticle);
};

function changePage(targetPage, dataLength){

   let maxPages = 0;
   (window.location.search==='' && window.location.pathname==='/src/pages/home/home.html')? 
      maxPages = Math.ceil(dataLength / pageSize) 
      : maxPages = Math.ceil(dataLength / 10);

   if(targetPage < 0){
      targetPage = maxPages-1;
   } else if(targetPage >= maxPages){
      targetPage = 0;
   };

   document.location = document.location.search + `#/page/${targetPage}`;

   pagNums.forEach((el) => {
      el.classList.toggle('active', (parseInt(el.innerText) === getCurrentPage() + 1));
   });
};

export { showCurrentPage, getCurrentPage, changePage };