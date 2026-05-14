"use client";

import { useCallback } from "react";
import { useAudioPlayer } from "@/components/audio/AudioPlayerContext";

/** Static voice files shipped with the app under `public/audio/` (served as `/audio/{id}.mp3` on the deployed host). */
const SECTION_AUDIO_BASE = "/audio";

type SectionVoiceOverProps = {
  sectionId: string;
  /** Visible section title for aria-label */
  label: string;
  /** Full URL to the MP3 */
  src: string;
  className?: string;
};

function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 14 14" fill="currentColor" aria-hidden>
      <path d="M3 2.5v9l7-4.5-7-4.5z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 14 14" fill="currentColor" aria-hidden>
      <path d="M4 2.5h2.5v9H4v-9zm3.5 0H10v9H7.5v-9z" />
    </svg>
  );
}

export function SectionVoiceOver({
  sectionId,
  label,
  src,
  className = "",
}: SectionVoiceOverProps) {
  const { activeSectionId, isPlaying, failedSectionIds, playSection } =
    useAudioPlayer();

  const togglePlayback = useCallback(() => {
    playSection({ id: sectionId, label, src });
  }, [label, playSection, sectionId, src]);

  if (failedSectionIds.has(sectionId)) {
    return null;
  }

  const playing = activeSectionId === sectionId && isPlaying;
  const ariaLabel = playing ? `Pause voice-over: ${label}` : `Play voice-over: ${label}`;

  return (
    <div className={className}>
      <button
        type="button"
        onClick={togglePlayback}
        aria-label={ariaLabel}
        aria-pressed={playing}
        className={
          playing
            ? "inline-flex h-10 shrink-0 items-center gap-2 rounded-md border-2 border-white/35 bg-white/[0.14] px-3 text-[13px] font-semibold text-foreground shadow-[0_0_0_1px_rgb(255_255_255/0.08)] transition-colors hover:border-white/45 hover:bg-white/[0.18] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/45"
            : "voice-cta-pulse inline-flex h-10 shrink-0 items-center gap-2 rounded-md border-2 border-white/45 bg-white/[0.12] px-3 text-[13px] font-semibold text-foreground shadow-[0_0_0_1px_rgb(255_255_255/0.1)] transition-colors hover:border-white/60 hover:bg-white/[0.16] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/45"
        }
      >
        {playing ? <PauseIcon /> : <PlayIcon />}
        <span className="whitespace-nowrap">{playing ? "Pause" : "Listen"}</span>
      </button>
    </div>
  );
}

export function sectionAudioSrc(sectionId: string) {
  return `${SECTION_AUDIO_BASE}/${sectionId}.mp3`;
}
