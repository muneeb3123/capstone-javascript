/* eslint-disable no-unused-vars */
/* eslint-disable import/no-cycle */

import commentCounter from './commentCounter.js';

const gameKey = 'lA4aY26h8QYvNopssI0V';
const popUpContainer = document.querySelector('.popup-container');
const commentContainer = document.createElement('ul');
commentContainer.classList.add('popup-comments');

class ShowComment {
  // Load comments from API
  getSeverData = async (link) => {
    try {
      const response = await fetch(link, {
        method: 'GET',
      });
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      return error;
    }
  };

  // Load comments from API
  loadComments = async (index) => {
    commentContainer.innerHTML = '';
    const movieComments = await this.getSeverData(
      `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${gameKey}/comments?item_id=${index}`,
    );
    if (movieComments.length > 0) {
      movieComments.forEach((element) => {
        commentContainer.innerHTML += `
    <li class="popup-comment">
    <span>${element.username}: </span> ${element.comment} <br> <span class="comment-date">${element.creation_date}</span>
    </li>`;
      });
    }
    return commentContainer;
  };

  togglePopUp = () => {
    popUpContainer.classList.toggle('hidden');
    document.body.classList.toggle('no-scroll');
  };

  deployComments = async (index) => {
    const counter = await commentCounter(index);
    const comments = await this.loadComments(index);
    const popupCommentsContainer = document.querySelector('.popup-comments-container');
    popupCommentsContainer.innerHTML = `
      <h3>Comments(${counter})</h3>
    `;
    popupCommentsContainer.appendChild(comments);
  };

  deployPopUp = async (show, index) => {
    const comments = await this.loadComments(index);
    const counter = await commentCounter(index);
    const popupCommentsContainer = document.createElement('div');
    popupCommentsContainer.classList.add('popup-comments-container');
    popupCommentsContainer.innerHTML = `
    <h3>Comments (${counter})</h3>
  `;
    popupCommentsContainer.appendChild(comments);
    popUpContainer.innerHTML = `
    <div class="popup">
    <i class="fa fa-times close-popup" aria-hidden="true"></i>
    <span class="close-popup-hit"></span>
      <div class="popup-image">
        <img src="${show.image.medium}" alt="${show.name}">
      </div>
      <div class="popup-details">
        <div class="popup-about-container">
          <h3>Stats this year</h3>
          ${show.summary}
          <ul class="popup-about">
            <li><span class="popup-about-title">Rating</span> <span class="popup-about-value">${show.rating.average}</span></li>
            <li> <span class="popup-about-title">Runtime</span> <span class="popup-about-value">${show.runtime}</span></li>
            <li> <span class="popup-about-title">Genre</span><span class="popup-about-value">${show.genres[0]}</span></li>
          </ul>
        </div>
        <div class="comments-wrapper">${popupCommentsContainer.outerHTML}
          <div class="add-comment-container">
            <h3>Add comment</h3>
            <form action="" class="comment-form" id="${index}">
              <input type="text" maxlength="100" required placeholder="Your name...">
              <textarea name="comment" id="" rows="1" placeholder="Add a comment..." required></textarea>
              <button class="comment-btn">Post</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `;
  };

  // Add data to API
  postComment = async (comment) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: comment,
        redirect: 'follow',
      };

      const response = await fetch(
        `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${gameKey}/comments/`,
        requestOptions,
      );
      const result = await response.text();
      return result;
    } catch (error) {
      return error;
    }
  };
}

const showComment = new ShowComment();

// Event listeners for buttons

const popUpListeners = () => {
  popUpContainer.addEventListener('click', async (event) => {
    if (event.target.classList.contains('close-popup-hit')) {
      showComment.togglePopUp();
    } else if (event.target.classList.contains('comment-btn')) {
      event.preventDefault();
      const userName = document.querySelector('input[type="text"]').value;
      const userComment = document.querySelector('textarea').value;
      const itemId = event.target.parentElement.id;
      if (userName !== '' && userComment !== '') {
        const raw = JSON.stringify({
          item_id: itemId,
          username: userName,
          comment: userComment,
        });
        await showComment.postComment(raw);
        await showComment.deployComments(itemId);
        document.querySelector('input[type="text"]').value = '';
        document.querySelector('textarea').value = '';
      }
    }
  });
};

export { popUpListeners, ShowComment };
