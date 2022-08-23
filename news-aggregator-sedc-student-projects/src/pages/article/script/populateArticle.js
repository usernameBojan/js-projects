const articleImg = document.querySelector('#article-img');
const articleTitle = document.querySelector('#article-title');
const articleDate = document.querySelector('#article-date');
const articleSource = document.querySelector('#article-src');
const articleText = document.querySelector('#article-txt');
const headTitle = document.querySelector('title');
const fbShare = document.querySelector('#fb-share');
const twitterShare = document.querySelector('#twitter-share');
const liShare = document.querySelector('#li-share');

function populateArticlePage(data){
   headTitle.innerText = data.title;
   articleImg.setAttribute('src', data.image);
   articleTitle.innerText = data.title;
   articleDate.innerText = data.published_at;
   articleSource.innerText = data.source;
   articleSource.setAttribute('href', data.url);
   articleText.innerHTML = data.content;
   fbShare.setAttribute('href', `https://www.facebook.com/sharer.php?u=${window.location.href}`);
   twitterShare.setAttribute('href', `https://twitter.com/intent/tweet?url=${window.location.href}`);
   liShare.setAttribute('href', `https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`);
};

export { populateArticlePage };