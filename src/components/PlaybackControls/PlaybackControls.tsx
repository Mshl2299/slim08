import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from "react"
import './PlaybackControls.css'

import mainTrackA from '../../assets/audio/main/Aspiral.wav'
import mainTrackB from '../../assets/audio/main/Clinal heart (aug_19).wav'
import mainTrackC from '../../assets/audio/main/Contemplation.wav'
import mainTrackD from '../../assets/audio/main/Nereus.mp3'
import mainTrackE from '../../assets/audio/main/st_ranges_hop_highdef_noloop.wav'
import experimentalTrackA from '../../assets/audio/experimental/Hard and soft-001.wav'
import experimentalTrackB from '../../assets/audio/experimental/photoloop_trailer_v2.mp3'
import experimentalTrackC from '../../assets/audio/experimental/primal_caramel.wav'
import experimentalTrackD from '../../assets/audio/experimental/Rush E but Drum and Bass.wav'
import experimentalTrackE from '../../assets/audio/experimental/the_ss_trange.mp3'

const mainAudioFiles = [
  mainTrackA,
  mainTrackB,
  mainTrackC,
  mainTrackD,
  mainTrackE,
]

const experimentalAudioFiles = [
  experimentalTrackA,
  experimentalTrackB,
  experimentalTrackC,
  experimentalTrackD,
  experimentalTrackE,
]

interface PlaybackControlsProps {
  autoScroll: boolean
  setAutoScroll: Dispatch<SetStateAction<boolean>>
}

export default function PlaybackControls({
  autoScroll,
  setAutoScroll
}: PlaybackControlsProps) {
  const [experimentalMode, setExperimentalMode] = useState(false)
  const [mediaPlaying, setMediaPlaying] = useState(false)
  const [currentTrackName, setCurrentTrackName] = useState('Not playing audio')
  const [volume, setVolume] = useState(0.65)

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const currentTrackIndexRef = useRef(0)

  const getTrackName = (source: string) => {
      const filename = decodeURIComponent(source).split('/').pop() || source || 'unknown track'
      return filename.replace(/%20/g, '_').replace(/\s+/g, '_')
    }
  
    const stopPlayback = () => {
      const audio = audioRef.current
      if (audio) {
        audio.pause()
        audio.src = ''
        audio.load()
      }
  
      setCurrentTrackName('Not playing audio')
      setMediaPlaying(false)
    }
  
    const playTrackAtIndex = (trackIndex: number, trackList: string[]) => {
      const audio = audioRef.current ?? new Audio()
      if (!audioRef.current) {
        audioRef.current = audio
        audio.preload = 'auto'
        audio.volume = volume
      }
  
      const nextSource = trackList[trackIndex % trackList.length]
      if (!nextSource) {
        stopPlayback()
        return
      }
  
      currentTrackIndexRef.current = trackIndex % trackList.length
      setCurrentTrackName(getTrackName(nextSource))
      setMediaPlaying(true)
      audio.src = nextSource
      audio.currentTime = 0
      audio.volume = volume
      audio.play().catch(() => {
        setCurrentTrackName('Not playing audio')
        setMediaPlaying(false)
      })
    }
  
    const handleTogglePlay = () => {
      if (mediaPlaying) {
        stopPlayback()
        return
      }
  
      const currentTrackList = experimentalMode ? experimentalAudioFiles : mainAudioFiles
      if (currentTrackList.length === 0) {
        stopPlayback()
        return
      }
  
      const activeIndex = currentTrackIndexRef.current % currentTrackList.length
      playTrackAtIndex(activeIndex, currentTrackList)
    }
  
    const handleExperimentalToggle = () => {
      const nextMode = !experimentalMode
      setExperimentalMode(nextMode)
      stopPlayback()
      currentTrackIndexRef.current = 0
    }
  
    const handleNextTrack = () => {
      const trackList = experimentalMode ? experimentalAudioFiles : mainAudioFiles
      if (!trackList.length) {
        stopPlayback()
        return
      }
  
      const nextIndex = (currentTrackIndexRef.current + 1) % trackList.length
      playTrackAtIndex(nextIndex, trackList)
    }
  
    useEffect(() => {
      const audio = audioRef.current ?? new Audio()
      if (!audioRef.current) {
        audioRef.current = audio
        audio.preload = 'auto'
        audio.volume = volume
      }
  
      if (audioRef.current) {
        audioRef.current.volume = volume
      }
  
      const handleEnded = () => {
        const trackList = experimentalMode ? experimentalAudioFiles : mainAudioFiles
        if (!trackList.length) {
          stopPlayback()
          return
        }
  
        const nextIndex = (currentTrackIndexRef.current + 1) % trackList.length
        if (mediaPlaying) {
          playTrackAtIndex(nextIndex, trackList)
        }
      }
  
      audio.onended = handleEnded
  
      return () => {
        audio.onended = null
      }
    }, [experimentalMode, mediaPlaying, volume])

  return (
    <div className="playback" aria-live="polite">
      <div className="playback__group playback__group--music">
        <div className="playback__row">
          <button
            type="button"
            className="playback__toggle"
            onClick={handleTogglePlay}
            aria-label={mediaPlaying ? 'Pause audio' : 'Play audio'}
          >
            <span className="playback__icon" aria-hidden="true">
              {mediaPlaying ? '❚❚' : '▶'}
            </span>
          </button>
          <button
            type="button"
            className={`playback__label ${experimentalMode ? 'playback__label--active' : ''}`}
            onClick={handleExperimentalToggle}
            aria-label={
              experimentalMode ? 'Use main audio folder' : 'Use experimental audio folder'
            }
            aria-pressed={experimentalMode}
          >
            EXP
          </button>
          <button
            type="button"
            className="playback__next"
            onClick={handleNextTrack}
            aria-label="Play next song"
          >
            ⏭
          </button>

          <div className="playback__meta">
            <div className="playback__status">
              Now playing: {currentTrackName || 'Not playing audio'}
            </div>

            <label className="playback__volume" aria-label="Volume control">
              <span>Vol</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(event) => setVolume(Number(event.target.value))}
              />
            </label>
          </div>
        </div>
      </div>

      <div className="playback__group playback__group--auto">
        <button
          type="button"
          className={`playback__label ${autoScroll ? 'playback__label--active' : ''}`}
          onClick={() => setAutoScroll((c) => !c)}
          aria-label={autoScroll ? 'Pause auto scroll' : 'Play auto scroll'}
          aria-pressed={autoScroll}
        >
          AUTO
        </button>
      </div>
    </div>
  )
}