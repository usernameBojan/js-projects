import { showCurrentPage, getCurrentPage, changePage } from '../../../../src/pages/home/script/pagination.js';

const articles = document.querySelector('#articles');
const prev = document.querySelector('#btn-previous');
const next = document.querySelector('#btn-next');
const stories = '../../data/news.json';
let dataLength = 0;

async function getData(storiesObj) {
   
   let promise = await fetch(storiesObj);
   const { stories } = await promise.json();

   let allStories = [...stories];
   let data = allStories.slice(0, allStories.length-50);
   showCurrentPage(data, articles, null);
   dataLength = data.length;
};
 
next.addEventListener('click', () => {
    changePage(getCurrentPage() + 1, dataLength);
});
  
prev.addEventListener('click', () => {
    changePage(getCurrentPage() - 1, dataLength);
});

getData(stories);

window.addEventListener('hashchange', () => {
   getData(stories);
});