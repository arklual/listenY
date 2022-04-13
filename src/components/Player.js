import React, { useState, useRef, useEffect } from "react";
import { Button } from "react-bootstrap";
function Player() {
  const [playing, setPlaying] = useState(false);
  const [trackTitle, setTrackTitle] = useState("Title of track");
  const [playButtonText, setPlayButtonText] = useState("Pause");
  const [trackProgress, setTrackProgress] = useState(0);
  const audio = useRef(
    new Audio(
      "https://stat3.deti-online.com/a/YYHWK6O1qLG-oxHSFd4kwQ/1652216400/files/audioskazki/sarra-anson-10-luntik-pesenka-pro-otvagu.mp3"
    )
  );
  audio.current.preload = "metadata";
  const [duration, setDuration] = useState(audio.current.duration);
  audio.current.onloadedmetadata = () => {
    setDuration(audio.current.duration);
  };
  const play = () => {
    if (playing) {
      audio.current.pause();
      setPlaying(false);
      setPlayButtonText("Play");
    } else {
      audio.current.play();
      setPlaying(true);
      setPlayButtonText("Pause");
    }
  };
  const open = () => {
    setPlaying(true);
    setTrackTitle("Track #1");
    audio.current.play();
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setTrackProgress(audio.current.currentTime);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="player">
      <h1>{trackTitle}</h1>
      <Button onClick={open} variant="primary">
        Load
      </Button>
      <div className="control">
        <Button variant="primary">Previous</Button>
        <Button onClick={play} variant="primary">
          {playButtonText}
        </Button>
        <Button variant="primary">Next</Button>
      </div>
      <input
        min="0"
        max={duration}
        value={trackProgress}
        step="1"
        className="duration"
        type="range"
      ></input>
    </div>
  );
}

export default Player;
