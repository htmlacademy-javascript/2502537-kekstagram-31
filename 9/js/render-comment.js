import { commentTemplate, commentsList } from './render-big-picture.js';

const renderComments = (avatar, username, message) => {
  const commentsListFragment = document.createDocumentFragment();
  const commentItem = commentTemplate.cloneNode(true);

  const avatarMember = commentItem.querySelector('.social__picture');
  avatarMember.src = avatar;
  const commentTextElement = commentItem.querySelector('.social__text');
  avatarMember.alt = username;
  commentTextElement.textContent = message;

  commentsListFragment.append(commentItem);
  commentsList.append(commentsListFragment);
};

export { renderComments };
