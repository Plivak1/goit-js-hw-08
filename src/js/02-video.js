import Vimeo from '@vimeo/player';

import throttle from 'lodash.throttle';

const iframeEl = document.querySelector('iframe');
const playerEl = new Vimeo(iframeEl);

const currentTimeEl = localStorage.getItem('videoplayer-current-time');

const onPlayEl = ({ seconds }) => {
  localStorage.setItem('videoplayer-current-time', seconds);
};

// playerEl.setCurrentTime(localStorage.getItem('videoplayer-current-time'));

playerEl
  .setCurrentTime(currentTimeEl)
  .then(function (seconds) {})
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });

playerEl.on('timeupdate', throttle(onPlayEl, 500));
