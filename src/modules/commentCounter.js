/* eslint-disable import/no-cycle */
import { ShowComment } from './comments.js';

const commentCounter = async (index) => {
  const showComment = new ShowComment();
  const movieComments = await showComment.getSeverData(
    `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/lA4aY26h8QYvNopssI0V/comments?item_id=${index}`,
  );

  let commentCount;
  if (movieComments.length > 0) {
    commentCount = movieComments.length;
  } else {
    commentCount = 0;
  }

  return commentCount;
};

export default commentCounter;
