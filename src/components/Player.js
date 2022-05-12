import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay, faForwardFast, faBackwardFast, faVolumeHigh, faVolumeXmark, faVolumeLow } from '@fortawesome/free-solid-svg-icons'

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

function VolumeIcon({ volume }) {
  if (volume === 0) {
    return (<FontAwesomeIcon icon={faVolumeXmark} />)
  }
  else if (volume < 0.50) {
    return (<FontAwesomeIcon icon={faVolumeLow} />)
  }
  else {
    return (<FontAwesomeIcon icon={faVolumeHigh} />)
  }
}

function Player({ playlist = null }) {
  const [playing, setPlaying] = useState(false);
  const [trackProgress, setTrackProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [currentTrack, setCurrentTrack] = useState(0)
  const [trackTitle, setTrackTitle] = useState("Track #" + (currentTrack + 1));
  const [audio] = useState(
    new Audio(
      playlist === undefined ? "https://stat3.deti-online.com/a/YYHWK6O1qLG-oxHSFd4kwQ/1652216400/files/audioskazki/sarra-anson-10-luntik-pesenka-pro-otvagu.mp3" : playlist[currentTrack]
    )
  );
  audio.preload = "metadata";
  const [duration, setDuration] = useState(audio.duration);
  audio.onloadedmetadata = () => {
    setDuration(audio.duration);
  };
  const play = () => {
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play();
      setPlaying(true);
    }
  };
  const rewind = (event) => {
    audio.currentTime = event.target.value;
    setTrackProgress(audio.currentTime);
  }
  const changeVolume = (event) => {
    audio.volume = event.target.value;
    setVolume(event.target.value)
  }
  const next = () => {
    if (playlist == null) {
      return
    }
    if (playlist.length > currentTrack+1) {
      audio.src = playlist[currentTrack+1]
      audio.play()
      setTrackTitle("Track #" + (currentTrack + 2))
      setCurrentTrack(currentTrack + 1)
    }

  }
  const prev = () => {
    if (playlist == null) {
      return
    }
    if (currentTrack > 0) {
      audio.src = playlist[currentTrack-1]
      audio.play()
      setTrackTitle("Track #" + (currentTrack))
      setCurrentTrack(currentTrack - 1)
    }
  }
  useEffect(() => {
    const interval = setInterval(() => {
      setTrackProgress(audio.currentTime);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="player">
      <h3 className="title">{trackTitle}</h3>
      <div className="control">
        <Button onClick={prev} variant="primary"><FontAwesomeIcon icon={faBackwardFast} /></Button>
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
        <Button variant="primary" onClick={next}><FontAwesomeIcon icon={faForwardFast} /></Button>
        <VolumeIcon volume={volume} />
        <input
          min="0"
          max="1"
          value={volume}
          step="0.01"
          className="volume"
          type="range"
          onChange={changeVolume}
        ></input>
      </div>
    </div>
  );
}

export default Player;
