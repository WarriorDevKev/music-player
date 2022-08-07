// ES6 Destructuring
import { songsList } from '../data/songs.js';
import PlayInfo from './play-info.js';
import TrackBar from './track-bar.js';

const Playlist = (_ => {
  // data or state
  let songs = songsList;
  let currentlyPlayingIndex = 0;
  let currentSong = new Audio(songs[currentlyPlayingIndex].url) // initiate a new audio w/ url
  // cache the DOM
  const playlistEl = document.querySelector(".playlist");
  
  const init = _ => {
    render();
    listeners();
    PlayInfo.setState({
      songsLength: songs.length,
      isPlaying: !currentSong.paused
    })
  }

  const flip = _ => {
    togglePlayPause();
    render();
  }

  const changeAudioSrc = _ => {
    currentSong.src = songs[currentlyPlayingIndex].url;
  }

  const togglePlayPause = _ => {
    return currentSong.paused ? currentSong.play() : currentSong.pause();
  }

  const mainPlay = clickedIndex => {
    if (currentlyPlayingIndex === clickedIndex) {
      // toggle play or pause
      console.log("same")
      togglePlayPause();
    } else {
      console.log("new")
      currentlyPlayingIndex = clickedIndex;
      changeAudioSrc();
      togglePlayPause();
    }

    PlayInfo.setState({
      songsLength: songs.length,
      isPlaying: !currentSong.paused
    })
  }
  // if next song available playNext
  const playNext = _ => {
    if (songs[currentlyPlayingIndex + 1]) {
      currentlyPlayingIndex++;
      currentSong.src = songs[currentlyPlayingIndex].url;
      togglePlayPause();
      render();
    }
  }
  // The ACTION Happens here 💥
  const listeners = _ => {
      // 1. get the index of the li tag
      // 2. change the currentlyPlayingIndex to lindex of the li tag
      // 3. if not the same song, then change source to new song after changing currentplaying index
    playlistEl.addEventListener("click", event => {
      if (event.target && event.target.matches(".fa")) {
        const listElem = event.target.parentNode.parentNode;
        const listElemIndex = [...listElem.parentElement.children].indexOf(listElem);
        mainPlay(listElemIndex)
        render();
      }
    })

    currentSong.addEventListener("timeupdate", _ => {
      TrackBar.setState(currentSong);
    })
    // check is song has ended
    currentSong.addEventListener("ended", _ => {
      playNext();
    })
  }
  // render list items insted using HTML
  const render = _ => {
    let markup = '';

    const toggleIcon = itemIndex => {
      if (currentlyPlayingIndex === itemIndex) {
        return currentSong.paused ? 'fa-play' : 'fa-pause';
      } else {
        return 'fa-play';
      }
    }

    songs.forEach((songObj, index) => {
      markup += `
        <li class="playlist__song ${index === currentlyPlayingIndex ? 'playlist__song--active' : ''}">
          <div class="play-pause">
            <i class="fa ${toggleIcon(index)} pp-icon"></i>
          </div>
          <div class="playlist__song-details">
            <span class="playlist__song-name">${songObj.title}</span>
            <br>
            <span class="playlist__song-artist">${songObj.artist}</span>
          </div>
          <div class="playlist__song-duration">
            ${songObj.time}
          </div>
        </li>
      `;
    })

    playlistEl.innerHTML = markup;
  }

  return {
    init,
    flip
  }
})();

export default Playlist;  // can default when its only 1