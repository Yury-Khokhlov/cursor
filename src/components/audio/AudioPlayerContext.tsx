"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

const BODY_DOCK_CLASS = "audio-dock-open";

export type PlaySectionArgs = {
  id: string;
  label: string;
  src: string;
};

type AudioPlayerContextValue = {
  activeSectionId: string | null;
  sectionLabel: string;
  src: string;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  playbackRate: number;
  isMuted: boolean;
  dockVisible: boolean;
  failedSectionIds: ReadonlySet<string>;
  playSection: (args: PlaySectionArgs) => void;
  togglePlayPause: () => void;
  seekTo: (time: number) => void;
  skipSeconds: (delta: number) => void;
  setVolumeLevel: (v: number) => void;
  setPlaybackRateLevel: (r: number) => void;
  toggleMute: () => void;
  closeDock: () => void;
};

const AudioPlayerContext = createContext<AudioPlayerContextValue | null>(null);

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export function useAudioPlayer() {
  const ctx = useContext(AudioPlayerContext);
  if (!ctx) {
    throw new Error("useAudioPlayer must be used within AudioPlayerProvider");
  }
  return ctx;
}

export function AudioPlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const preMuteVolumeRef = useRef(1);

  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const [sectionLabel, setSectionLabel] = useState("");
  const [src, setSrc] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [dockOpen, setDockOpen] = useState(false);
  const [failedSectionIds, setFailedSectionIds] = useState<Set<string>>(() => new Set());
  const activeSectionIdRef = useRef<string | null>(null);
  activeSectionIdRef.current = activeSectionId;

  const dockVisible = dockOpen && activeSectionId !== null;

  useEffect(() => {
    if (dockVisible) {
      document.body.classList.add(BODY_DOCK_CLASS);
    } else {
      document.body.classList.remove(BODY_DOCK_CLASS);
    }
    return () => document.body.classList.remove(BODY_DOCK_CLASS);
  }, [dockVisible]);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => setIsPlaying(false);
    const onLoadedMetadata = () => {
      setDuration(Number.isFinite(el.duration) ? el.duration : 0);
      setCurrentTime(el.currentTime);
    };
    const onDurationChange = () => {
      setDuration(Number.isFinite(el.duration) ? el.duration : 0);
    };
    const onTimeUpdate = () => setCurrentTime(el.currentTime);
    const onError = () => {
      setIsPlaying(false);
      const id = activeSectionIdRef.current;
      if (id) setFailedSectionIds((prev) => new Set(prev).add(id));
    };

    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    el.addEventListener("ended", onEnded);
    el.addEventListener("loadedmetadata", onLoadedMetadata);
    el.addEventListener("durationchange", onDurationChange);
    el.addEventListener("timeupdate", onTimeUpdate);
    el.addEventListener("error", onError);

    return () => {
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("ended", onEnded);
      el.removeEventListener("loadedmetadata", onLoadedMetadata);
      el.removeEventListener("durationchange", onDurationChange);
      el.removeEventListener("timeupdate", onTimeUpdate);
      el.removeEventListener("error", onError);
    };
  }, []);

  const playSection = useCallback(
    ({ id, label, src: nextSrc }: PlaySectionArgs) => {
      const el = audioRef.current;
      if (!el) return;

      if (activeSectionId === id) {
        if (!el.paused) {
          el.pause();
        } else {
          void el.play().catch(() => {
            setFailedSectionIds((prev) => new Set(prev).add(id));
          });
        }
        return;
      }

      setFailedSectionIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      setActiveSectionId(id);
      setSectionLabel(label);
      setSrc(nextSrc);
      setDockOpen(true);
      el.pause();
      el.src = nextSrc;
      el.playbackRate = playbackRate;
      el.volume = isMuted ? 0 : volume;
      void el.play().catch(() => {
        setFailedSectionIds((prev) => new Set(prev).add(id));
      });
    },
    [activeSectionId, isMuted, playbackRate, volume],
  );

  const togglePlayPause = useCallback(() => {
    const el = audioRef.current;
    if (!el || !activeSectionId) return;
    if (!el.paused) el.pause();
    else void el.play().catch(() => {});
  }, [activeSectionId]);

  const seekTo = useCallback(
    (time: number) => {
      const el = audioRef.current;
      if (!el || !activeSectionId) return;
      const d = Number.isFinite(el.duration) ? el.duration : 0;
      el.currentTime = clamp(time, 0, d > 0 ? d : 0);
      setCurrentTime(el.currentTime);
    },
    [activeSectionId],
  );

  const skipSeconds = useCallback(
    (delta: number) => {
      const el = audioRef.current;
      if (!el || !activeSectionId) return;
      const d = Number.isFinite(el.duration) ? el.duration : 0;
      const next = el.currentTime + delta;
      el.currentTime = d > 0 ? clamp(next, 0, d) : Math.max(0, next);
      setCurrentTime(el.currentTime);
    },
    [activeSectionId],
  );

  const setVolumeLevel = useCallback((v: number) => {
    const next = clamp(v, 0, 1);
    setVolume(next);
    setIsMuted(false);
    const el = audioRef.current;
    if (el) el.volume = next;
  }, []);

  const setPlaybackRateLevel = useCallback((r: number) => {
    setPlaybackRate(r);
    const el = audioRef.current;
    if (el) el.playbackRate = r;
  }, []);

  const toggleMute = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;
    if (isMuted) {
      const restore = preMuteVolumeRef.current > 0 ? preMuteVolumeRef.current : 1;
      setIsMuted(false);
      setVolume(restore);
      el.volume = restore;
    } else {
      preMuteVolumeRef.current = el.volume > 0 ? el.volume : volume;
      setIsMuted(true);
      el.volume = 0;
    }
  }, [isMuted, volume]);

  const closeDock = useCallback(() => {
    const el = audioRef.current;
    if (el) {
      el.pause();
      el.removeAttribute("src");
      el.load();
    }
    setDockOpen(false);
    setActiveSectionId(null);
    setSectionLabel("");
    setSrc("");
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
  }, []);

  const value = useMemo<AudioPlayerContextValue>(
    () => ({
      activeSectionId,
      sectionLabel,
      src,
      isPlaying,
      currentTime,
      duration,
      volume,
      playbackRate,
      isMuted,
      dockVisible,
      failedSectionIds,
      playSection,
      togglePlayPause,
      seekTo,
      skipSeconds,
      setVolumeLevel,
      setPlaybackRateLevel,
      toggleMute,
      closeDock,
    }),
    [
      activeSectionId,
      closeDock,
      currentTime,
      dockVisible,
      duration,
      failedSectionIds,
      isMuted,
      isPlaying,
      playSection,
      playbackRate,
      seekTo,
      skipSeconds,
      sectionLabel,
      setPlaybackRateLevel,
      setVolumeLevel,
      src,
      toggleMute,
      togglePlayPause,
      volume,
    ],
  );

  return (
    <AudioPlayerContext.Provider value={value}>
      <div className="pointer-events-none fixed -left-[9999px] top-0 h-px w-px overflow-hidden opacity-0">
        <audio ref={audioRef} preload="metadata" />
      </div>
      {children}
    </AudioPlayerContext.Provider>
  );
}
