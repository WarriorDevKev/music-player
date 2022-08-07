const TrackBar = (_ => {

    const state = {
        currentTracktime: 0,	//keep track 
        fullTrackTime: 0,
        fillWidth: 0
     }
     // cache DOM
     const trackBarEl = document.querySelector(".track-bar");
     const trackBarFillEl = document.querySelector(".track-bar__fill");
     
     const init = _ => {

     }
     
     const setState = _ => {
        state.currentTracktime = obj.currenTime;
        state.fullTrackTime = obj.duration;
        state.fillWidth = 0;
     }

     return {
        init,
        setState
     }
})();

export default TrackBar;