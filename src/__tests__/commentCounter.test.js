import { ShowComment } from '../modules/comments.js';
import commentCounter from '../modules/commentCounter.js';

jest.mock('../modules/comments.js', () => ({
  ShowComment: jest.fn(),
}));

describe('commentCounter', () => {
  test('returns the correct comment count when comments exist', async () => {
    const movieComments = [
      { username: 'user1', comment: 'comment1', creation_date: '2022-01-01' },
      { username: 'user2', comment: 'comment2', creation_date: '2022-01-02' },
      { username: 'user3', comment: 'comment3', creation_date: '2023-01-02' },
    ];
    const getSeverDataMock = jest.fn().mockResolvedValue(movieComments);
    ShowComment.prototype.getSeverData = getSeverDataMock;

    const commentCount = await commentCounter(123);

    expect(ShowComment).toHaveBeenCalledWith();

    expect(getSeverDataMock).toHaveBeenCalledWith(
      'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/lA4aY26h8QYvNopssI0V/comments?item_id=123',
    );

    expect(commentCount).toBe(3);
  });

  test('returns zero when no comments exist', async () => {
    const movieComments = [];
    const getSeverDataMock = jest.fn().mockResolvedValue(movieComments);
    ShowComment.prototype.getSeverData = getSeverDataMock;
    const commentCount = await commentCounter(456);

    expect(ShowComment).toHaveBeenCalledWith();

    expect(getSeverDataMock).toHaveBeenCalledWith(
      'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/lA4aY26h8QYvNopssI0V/comments?item_id=456',
    );

    expect(commentCount).toBe(0);
  });
});