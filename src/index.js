/* eslint-disable no-unused-expressions */
import './style.css';
import TVShowCards from './modules/fetch.js';
import './modules/menu.js';

const tVShowCards = new TVShowCards();

tVShowCards.updateCards();