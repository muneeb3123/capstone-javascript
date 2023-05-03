import movieCounter from '../modules/movies-counter.js';

describe('Todo', () => {
  test('should return 3 when there are 3 movies', () => {
    document.body.innerHTML = `
        <div class='container'>
        <div class='cards'></div>
        <div class='cards'></div>
        <div class='cards'></div></div>`;
    const movieCount = movieCounter();
    expect(movieCount).toBe(3);
  });

  test('should return 0 when they are no movie', () => {
    document.body.innerHTML = `
        <div class='container'></div>`;
    const movieCount = movieCounter();
    expect(movieCount).toBe(0);
  });
});
