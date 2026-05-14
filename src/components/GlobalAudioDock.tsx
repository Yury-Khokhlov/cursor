"use client";

import { useAudioPlayer } from "@/components/audio/AudioPlayerContext";

const RATES = [0.75, 1, 1.25, 1.5, 2] as const;

function SkipBackIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <polyline points="14 7 9 12 14 17" />
      <polyline points="20 7 15 12 20 17" />
    </svg>
  );
}

function SkipForwardIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <polyline points="10 7 15 12 10 17" />
      <polyline points="4 7 9 12 4 17" />
    </svg>
  );
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const s = Math.floor(seconds % 60);
  const m = Math.floor(seconds / 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function GlobalAudioDock() {
  const {
    sectionLabel,
    isPlaying,
    currentTime,
    duration,
    volume,
    playbackRate,
    isMuted,
    dockVisible,
    togglePlayPause,
    seekTo,
    skipSeconds,
    setVolumeLevel,
    setPlaybackRateLevel,
    toggleMute,
    closeDock,
  } = useAudioPlayer();

  if (!dockVisible) return null;

  const dur = Number.isFinite(duration) && duration > 0 ? duration : 0;
  const seekValue = dur > 0 ? currentTime : 0;
  const volumeSliderValue = isMuted ? 0 : volume;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-panel/95 px-3 py-3 shadow-[0_-8px_32px_rgb(0_0_0/0.35)] backdrop-blur-md sm:px-4"
      style={{
        paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))",
      }}
      role="region"
      aria-label="Voice-over playback"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4 sm:gap-y-2">
        <div className="min-w-0 flex-1 sm:max-w-[min(100%,20rem)]">
          <p className="truncate font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-muted">
            Voice-over
          </p>
          <p className="truncate text-[14px] font-medium text-foreground">{sectionLabel}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => skipSeconds(-10)}
            aria-label="Back 10 seconds"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border text-muted transition-colors hover:border-white/25 hover:bg-white/[0.06] hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/35"
          >
            <SkipBackIcon />
          </button>
          <button
            type="button"
            onClick={togglePlayPause}
            aria-label={isPlaying ? "Pause" : "Play"}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border-2 border-white/40 bg-white/[0.1] text-foreground transition-colors hover:border-white/55 hover:bg-white/[0.14] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40"
          >
            {isPlaying ? (
              <svg width="16" height="16" viewBox="0 0 14 14" fill="currentColor" aria-hidden>
                <path d="M4 2.5h2.5v9H4v-9zm3.5 0H10v9H7.5v-9z" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 14 14" fill="currentColor" aria-hidden>
                <path d="M3 2.5v9l7-4.5-7-4.5z" />
              </svg>
            )}
          </button>
          <button
            type="button"
            onClick={() => skipSeconds(10)}
            aria-label="Forward 10 seconds"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border text-muted transition-colors hover:border-white/25 hover:bg-white/[0.06] hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/35"
          >
            <SkipForwardIcon />
          </button>

          <div className="flex min-w-0 flex-1 items-center gap-2 sm:min-w-[12rem] sm:flex-initial sm:max-w-md">
            <span className="shrink-0 font-mono text-[11px] tabular-nums text-muted">
              {formatTime(currentTime)}
            </span>
            <label className="sr-only" htmlFor="audio-dock-seek">
              Seek
            </label>
            <input
              id="audio-dock-seek"
              type="range"
              min={0}
              max={dur > 0 ? dur : 1}
              step={0.1}
              value={dur > 0 ? seekValue : 0}
              disabled={dur <= 0}
              onChange={(e) => seekTo(Number(e.target.value))}
              className="h-2 min-w-0 flex-1 cursor-pointer accent-foreground disabled:cursor-not-allowed disabled:opacity-40"
            />
            <span className="shrink-0 font-mono text-[11px] tabular-nums text-muted">
              {formatTime(dur)}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute" : "Mute"}
              aria-pressed={isMuted}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border text-muted transition-colors hover:border-white/25 hover:bg-white/[0.06] hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/35"
            >
              {isMuted ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                  <path d="M11 5L6 9H2v6h4l5 4V5z" />
                  <path d="m22 9-6 6M16 9l6 6" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M11 5L6 9H2v6h4l5 4V5z" />
                  <path d="M15.54 8.46a5 5 0 010 7.07M19.07 4.93a9 9 0 010 14.14" />
                </svg>
              )}
            </button>
            <label className="sr-only" htmlFor="audio-dock-volume">
              Volume
            </label>
            <input
              id="audio-dock-volume"
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={volumeSliderValue}
              onChange={(e) => setVolumeLevel(Number(e.target.value))}
              className="h-2 w-20 cursor-pointer accent-foreground sm:w-24"
            />

            <label className="sr-only" htmlFor="audio-dock-rate">
              Playback speed
            </label>
            <select
              id="audio-dock-rate"
              value={playbackRate}
              onChange={(e) => setPlaybackRateLevel(Number(e.target.value))}
              className="h-9 rounded-md border border-border bg-background px-2 font-mono text-[12px] text-foreground transition-colors hover:border-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/35"
            >
              {RATES.map((r) => (
                <option key={r} value={r}>
                  {r === 1 ? "1×" : `${r}×`}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={closeDock}
              aria-label="Close player"
              className="inline-flex h-9 shrink-0 items-center justify-center rounded-md border border-border px-3 font-mono text-[11px] text-muted transition-colors hover:border-white/25 hover:bg-white/[0.06] hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/35"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
