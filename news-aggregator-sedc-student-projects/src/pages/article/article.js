import { addComents } from './script/addComents.js';
import { upvoteFunc, downvoteFunc } from './script/feedbackTracker.js';
import { populateArticlePage } from './script/populateArticle.js';

const commentsErrorMsg = document.getElementById('comment-error');
const thumbsUp = document.querySelector('.fa-thumbs-up');
const thumbsDown = document.querySelector('.fa-thumbs-down');
const inputs = document.querySelectorAll('.input');
const submitBtn = document.getElementById('submit-comment');
const stories = '../../data/news.json';

function getData(stories){
   let promise = fetch(stories);

   promise
      .then(function(response){
         return response.json();
      })
      .then(function({ stories }){
         try {
            let params = new window.URLSearchParams(window.location.search);
            let id = params.get('id').replace('/', '');
            let [ article ] = stories.filter((a) => a.id === id);
            populateArticlePage(article);
         } catch (e) {
            window.location.pathname = '/src/pages/home/home.html';
            window.location.href = '/src/pages/home/home.html';
         }
      })
      .catch(function(error){
         console.log(error);
      });
};

getData(stories);

thumbsUp.addEventListener('click', upvoteFunc, { once: true, capture: true });

thumbsDown.addEventListener('click', downvoteFunc, { once: true, capture: true });

submitBtn.addEventListener('click', () => {
   addComents(inputs, commentsErrorMsg);
});