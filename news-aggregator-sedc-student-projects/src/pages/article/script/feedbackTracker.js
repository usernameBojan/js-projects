const thumbsUpCount = document.getElementById('up-votes');
const thumbsDownCount = document.getElementById('down-votes');
const thumbsUp = document.querySelector('.fa-thumbs-up');
const thumbsDown = document.querySelector('.fa-thumbs-down');
let counterUp = 0;
let counterDown = 0;

function changeThumbsStyle(el, value){
   el.style.color = value ? '#4caf50' : '#f50057';
   el.classList.replace('fa-3x', 'fa-4x');
   el.style.opacity = '1';
}

let upvoteFunc = () => {
   counterUp++;
   changeThumbsStyle(thumbsUp, true);
   thumbsDown.addEventListener('mouseover', () => {
      thumbsDown.removeEventListener('click', downvoteFunc, { once: true, capture: true });
   });
   thumbsUpCount.innerText = counterUp;
};

let downvoteFunc = () => {
   counterDown++;
   changeThumbsStyle(thumbsDown, false);
   thumbsUp.addEventListener('mouseover', () => {
      thumbsUp.removeEventListener('click', upvoteFunc, { once: true, capture: true });
   });
   thumbsDownCount.innerText = counterDown;
};

export { changeThumbsStyle, upvoteFunc, downvoteFunc };
