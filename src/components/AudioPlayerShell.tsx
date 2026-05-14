"use client";

import { AudioPlayerProvider } from "@/components/audio/AudioPlayerContext";
import { GlobalAudioDock } from "@/components/GlobalAudioDock";
import type { ReactNode } from "react";

export function AudioPlayerShell({ children }: { children: ReactNode }) {
  return (
    <AudioPlayerProvider>
      {children}
      <GlobalAudioDock />
    </AudioPlayerProvider>
  );
}
