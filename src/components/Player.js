import React, { useState, useRef, useEffect } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay, faForwardFast, faBackwardFast } from '@fortawesome/free-solid-svg-icons'

function PlayPauseButton({ isPlaying, onClick }) {
  if (isPlaying) {
    return (
      <Button onClick={onClick} variant="primary">
        <FontAwesomeIcon icon={faPause} />
      </Button>
    );
  } else {
    return (
      <Button onClick={onClick} variant="primary">
        <FontAwesomeIcon icon={faPlay} />
      </Button>
    );
  }
}

function Player() {
  const [playing, setPlaying] = useState(false);
  const [trackTitle, setTrackTitle] = useState("Track #1");
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
    } else {
      audio.current.play();
      setPlaying(true);
    }
  };
  const rewind = (event) => {
    audio.current.currentTime = event.target.value;
  }
  useEffect(() => {
    const interval = setInterval(() => {
      setTrackProgress(audio.current.currentTime);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="player">
      <h3 className="title">{trackTitle}</h3>
      <div className="control">
        <Button variant="primary"><FontAwesomeIcon icon={faBackwardFast} /></Button>
        <PlayPauseButton onClick={play} isPlaying={playing} />
        <input
          min="0"
          max={duration}
          value={trackProgress}
          step="1"
          className="duration"
          type="range"
          onChange={rewind}
        ></input>
        <Button variant="primary"><FontAwesomeIcon icon={faForwardFast} /></Button>
      </div>
    </div>
  );
}

export default Player;
