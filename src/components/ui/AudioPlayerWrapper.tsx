"use client"; // This is the most important part!

import { useState, useEffect } from "react";
import Player from "./MediaPlayer"; // Make sure the path is correct

export default function AudioPlayerWrapper({ src }: { src: string }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Conditionally render the Player only on the client-side
  // If we won't do this we will run into issue with hydration not updating
  // the meta data from the audio, e.g. correctly displaying podcast duration
  return <>{isClient && <Player src={src} />}</>;
}
