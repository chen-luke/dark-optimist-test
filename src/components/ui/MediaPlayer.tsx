"use client";
import { useRef, useState, ReactElement } from "react";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import {
  TbMultiplier05X,
  TbMultiplier1X,
  TbMultiplier15X,
  TbMultiplier2X,
  TbRewindBackward10,
  TbRewindForward10,
} from "react-icons/tb";

import "react-h5-audio-player/lib/styles.css";
import "./media-player-styles.css";

// 1. Define the order of speeds manually in an array. This is the source of truth for the order.
const speeds = [0.5, 1, 1.5, 2];

// 2. Define the map for looking up icons based on the speed.
const speedIcons: { [key: number]: ReactElement } = {
  0.5: <TbMultiplier05X />,
  1: <TbMultiplier1X />,
  1.5: <TbMultiplier15X />,
  2: <TbMultiplier2X />,
};

const MediaPlayer = ({ src }: { src: string }) => {
  const playerRef = useRef<AudioPlayer>(null);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  const togglePlaybackSpeed = () => {
    // The rest of this logic is now correct because `speeds` has a guaranteed order.
    const currentSpeedIndex = speeds.indexOf(playbackSpeed);
    const nextSpeedIndex = (currentSpeedIndex + 1) % speeds.length;
    const nextSpeed = speeds[nextSpeedIndex];

    if (playerRef.current?.audio.current) {
      playerRef.current.audio.current.playbackRate = nextSpeed;
      setPlaybackSpeed(nextSpeed);
    }
  };

  return (
    <AudioPlayer
      ref={playerRef}
      src={src}
      layout="stacked"
      preload="metadata"
      showJumpControls={true}
      progressJumpSteps={{ forward: 10000, backward: 10000 }}
      customProgressBarSection={[RHAP_UI.MAIN_CONTROLS, RHAP_UI.PROGRESS_BAR]}
      customVolumeControls={[RHAP_UI.VOLUME]}
      customControlsSection={[
        RHAP_UI.ADDITIONAL_CONTROLS,
        RHAP_UI.CURRENT_TIME,
        <div key={"vinh"}>/</div>,
        RHAP_UI.DURATION,
        RHAP_UI.VOLUME_CONTROLS,
      ]}
      customAdditionalControls={[
        <button
          aria-label="speed-control"
          key="speed-control"
          onClick={togglePlaybackSpeed}
          className="speed-control text-4xl"
        >
          {speedIcons[playbackSpeed]}
        </button>,
      ]}
      customIcons={{
        rewind: <TbRewindBackward10 />,
        forward: <TbRewindForward10 />,
      }}
    />
  );
};

export default MediaPlayer;
