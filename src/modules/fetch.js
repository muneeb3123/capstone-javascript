import { ShowComment, popUpListeners } from './comments.js';
import ShowLikes from './likes.js';
import movieCounter from './movies-counter.js';

const showcomment = new ShowComment();
const showlikes = new ShowLikes();

const Cards = document.querySelector('.container');

class TVShowCards {
  constructor() {
    this.collection = [];
  }

  fetchCardsData = async () => {
    const requests = [];

    for (let i = 1; i <= 24; i += 1) {
      requests.push(fetch(`https://api.tvmaze.com/shows/${i}`));
    }

    try {
      const responses = await Promise.all(requests);
      const data = await Promise.all(
        responses.map((response) => response.json()),
      );
      this.collection = data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }

    return this.collection;
  };

  renderCards = (cardsData) => {
    Cards.innerHTML = '';
    cardsData.forEach((data) => {
      if (data.image) {
        Cards.innerHTML += `<div class='cards'>
              <div class='image-div'>
                <img src='${data.image.medium}' alt='#' class='image'>
              </div>
              <div class='name-like'>
                <h2 class='ch-nmae'>${data.name}</h2>
                <span class="likes">
                <span class='heart' data-index="${data.id}">&#9829;</span>
                <span id='likeCount' data-index="${data.id}">(0)</span></span>
              </div>
              <div class="Comment-div">
              <button class='comment-Btn' data-index="${data.id}">Comments</button>
              </div>
            </div>`;
      }
    });
    const commentBtns = document.querySelectorAll('.comment-Btn');
    commentBtns.forEach((commentBtn) => {
      commentBtn.addEventListener('click', (event) => {
        const { index } = event.target.dataset;
        const show = this.collection.find((data) => data.id === parseInt(index, 10));
        showcomment.togglePopUp();
        showcomment.deployPopUp(show, index);
      });
    });

    const likeBtns = document.querySelectorAll('.heart');
    likeBtns.forEach((likeBtn) => {
      likeBtn.addEventListener('click', (event) => {
        const { index } = event.target.dataset;
        showlikes.updateLikes(index);
      });
    });
  };

  Counter = () => {
    const Movie = document.querySelector('#movies');
    const movieCount = movieCounter();
    Movie.innerHTML = `Movies(${movieCount})`;
  }

  async updateCards() {
    const cardsData = await this.fetchCardsData();
    this.renderCards(cardsData);
    showlikes.renderLikes();
    this.Counter();
  }
}
popUpListeners();
export default TVShowCards;
