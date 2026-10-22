import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
  type WheelEvent,
} from 'react'
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
import { ProjectDetailOverlay } from '../../components/ProjectDetailOverlay/ProjectDetailOverlay'
import { projects, type ProjectRecord } from '../../data/projects'
import './Home.css'

const projectData = projects

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

type StripKey = 'left' | 'right'
type ProjectWithKey = ProjectRecord & { projectKey: string }

interface StripConfig {
  key: StripKey
  items: ProjectWithKey[]
  offset: number
  width: number
  speed: number
  wheelFactor: number
  setOffset: Dispatch<SetStateAction<number>>
}

function wrapOffset(value: number, width: number): number {
  if (width === 0) return 0
  return ((value % width) + width) % width
}

function getProjectKey(
  project: Pick<ProjectRecord, 'name'>,
  suffix?: number | string
): string {
  const baseName = project.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  const slug = baseName || 'project'
  return suffix === undefined ? slug : `${slug}-${suffix}`
}

function getProjectBackgroundImage(project: ProjectRecord): string {
  if (project.screenshots?.[0]) {
    return `linear-gradient(135deg, rgba(14,14,14,0.35), rgba(8,8,8,0.7)), url(${project.screenshots[0]})`
  }

  return 'linear-gradient(135deg, rgba(189,138,61,0.75), rgba(10,10,10,0.92), rgba(30,24,16,1))'
}

function createDuplicatedProjectList(
  sourceProjects: ProjectRecord[],
  minimumLength = 24
): ProjectWithKey[] {
  if (sourceProjects.length === 0) return []

  const renderLength = Math.max(minimumLength, sourceProjects.length * 3)
  const duplicatedProjects: ProjectWithKey[] = []

  while (duplicatedProjects.length < renderLength) {
    const sourceProject =
      sourceProjects[duplicatedProjects.length % sourceProjects.length]
    duplicatedProjects.push({
      ...sourceProject,
      projectKey: getProjectKey(sourceProject),
    })
  }

  return duplicatedProjects
}

interface ProjectCardProps {
  project: ProjectWithKey
  index: number
  side: StripKey
  isDuplicate: boolean
  selectedKey: string | null
  hoveredKey: string | null
  setSelectedKey: Dispatch<SetStateAction<string | null>>
  setHoveredKey: Dispatch<SetStateAction<string | null>>
  setAutoScroll: Dispatch<SetStateAction<boolean>>
  onOpenProjectDetails: (project: ProjectRecord) => void
}

function ProjectCard({
  project,
  index,
  side,
  isDuplicate,
  selectedKey,
  hoveredKey,
  setSelectedKey,
  setHoveredKey,
  setAutoScroll,
  onOpenProjectDetails,
}: ProjectCardProps) {
  const projectKey = project.projectKey
  const isSelected = selectedKey === projectKey
  const isMuted = selectedKey !== null && !isSelected
  const isHovered = hoveredKey === projectKey

  return (
    <button
      key={`${projectKey}-${index}-${side}-${isDuplicate ? 'duplicate' : 'original'}`}
      type="button"
      className={`project-float ${isSelected ? 'project-float--selected' : ''} ${isMuted ? 'project-float--muted' : ''
        } ${isHovered ? 'project-float--hovered' : ''}`}
      style={{
        backgroundImage: getProjectBackgroundImage(project),
        backgroundPosition: 'center',
        backgroundSize: project.screenshots?.[0] ? 'cover' : '100% 100%',
        backgroundRepeat: 'no-repeat',
        pointerEvents: isMuted ? 'none' : 'auto',
        transform: 'translate3d(0,0,0)',
      }}
      onMouseEnter={() => {
        if (selectedKey !== null && !isSelected) return
        setHoveredKey(projectKey)
      }}
      onMouseLeave={() => {
        if (selectedKey === null) setHoveredKey(null)
      }}
      onClick={() => {
        if (selectedKey === projectKey) {
          onOpenProjectDetails(project)
          return
        }

        setSelectedKey(projectKey)
        setAutoScroll(false)
        setHoveredKey(projectKey)
      }}
      aria-label={`Open ${project.name}`}
      aria-hidden={isDuplicate}
      tabIndex={isDuplicate ? -1 : 0}
    >
      <span className="project-float__label">{project.name}</span>
    </button>
  )
}

interface InfiniteStripProps {
  items: ProjectWithKey[]
  offset: number
  trackRef: React.RefObject<HTMLDivElement | null>
  title: string
  side: StripKey
  selectedKey: string | null
  hoveredKey: string | null
  setSelectedKey: Dispatch<SetStateAction<string | null>>
  setHoveredKey: Dispatch<SetStateAction<string | null>>
  setAutoScroll: Dispatch<SetStateAction<boolean>>
  onPointerEnter: () => void
  onPointerLeave: () => void
  onOpenProjectDetails: (project: ProjectRecord) => void
}

function InfiniteStrip({
  items,
  offset,
  trackRef,
  title,
  side,
  selectedKey,
  hoveredKey,
  setSelectedKey,
  setHoveredKey,
  setAutoScroll,
  onPointerEnter,
  onPointerLeave,
  onOpenProjectDetails,
}: InfiniteStripProps) {
  const doubledItems = [...items, ...items]

  return (
    <div
      className={`home-array home-array--${side}`}
      aria-label={`Project array ${title}`}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
    >
      <div className="home-array__viewport">
        <div
          ref={trackRef}
          className="home-array__track"
          style={{ transform: `translate3d(${-offset}px,0,0)` }}
        >
          {doubledItems.map((project, index) => (
            <ProjectCard
              key={`${project.projectKey}-${index}-${side}-${index >= items.length ? 'duplicate' : 'original'}`}
              project={project}
              index={index}
              side={side}
              isDuplicate={index >= items.length}
              selectedKey={selectedKey}
              hoveredKey={hoveredKey}
              setSelectedKey={setSelectedKey}
              setHoveredKey={setHoveredKey}
              setAutoScroll={setAutoScroll}
              onOpenProjectDetails={onOpenProjectDetails}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

interface PlaybackControlsProps {
  autoScroll: boolean
  currentTrackName: string
  experimentalMode: boolean
  mediaPlaying: boolean
  onNextTrack: () => void
  onTogglePlay: () => void
  setAutoScroll: Dispatch<SetStateAction<boolean>>
  handleExperimentalToggle: () => void
  setVolume: Dispatch<SetStateAction<number>>
  volume: number
}

function PlaybackControls({
  autoScroll,
  currentTrackName,
  experimentalMode,
  mediaPlaying,
  onNextTrack,
  onTogglePlay,
  setAutoScroll,
  handleExperimentalToggle,
  setVolume,
  volume,
}: PlaybackControlsProps) {
  return (
    <div className="home-playback" aria-live="polite">
      <div className="home-playback__group home-playback__group--music">
        <div className="home-playback__row">
          <button
            type="button"
            className="home-playback__toggle"
            onClick={onTogglePlay}
            aria-label={mediaPlaying ? 'Pause audio' : 'Play audio'}
          >
            <span className="home-playback__icon" aria-hidden="true">
              {mediaPlaying ? '❚❚' : '▶'}
            </span>
          </button>
          <button
            type="button"
            className={`home-playback__label ${experimentalMode ? 'home-playback__label--active' : ''}`}
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
            className="home-playback__next"
            onClick={onNextTrack}
            aria-label="Play next song"
          >
            ⏭
          </button>

          <div className="home-playback__meta">
            <div className="home-playback__status">
              Now playing: {currentTrackName || 'Not playing audio'}
            </div>

            <label className="home-playback__volume" aria-label="Volume control">
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

      <div className="home-playback__group home-playback__group--auto">
        <button
          type="button"
          className={`home-playback__label ${autoScroll ? 'home-playback__label--active' : ''}`}
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

interface HomeCaptionProps {
  activeProject: ProjectRecord | null
  captionRef: React.RefObject<HTMLElement | null>
}

function HomeCaption({ activeProject, captionRef }: HomeCaptionProps) {
  return (
    <aside ref={captionRef} className="home-caption" aria-live="polite">
      <div className="home-caption__top">
        <h2>{activeProject ? activeProject.name : 'Select a project'}</h2>
      </div>
      <p className="home-caption__summary">
          {activeProject
            ? activeProject.shortDescription
            : 'Scroll to move. Hover to focus. Click once to pin; click again to open details. Click outside to unpin.'}
        </p>
    </aside>
  )
}

export default function Home(): ReturnType<React.FC> {
  const codingProjects = useMemo(
    () => projectData.filter((p) => p.tags.includes('coding')),
    []
  )
  const audioProjects = useMemo(
    () => projectData.filter((p) => p.tags.includes('audio')),
    []
  )
  const leftProjects = useMemo(
    () => createDuplicatedProjectList(codingProjects),
    [codingProjects]
  )
  const rightProjects = useMemo(
    () => createDuplicatedProjectList(audioProjects),
    [audioProjects]
  )
  const allProjects = useMemo(
    () => [...codingProjects, ...audioProjects],
    [audioProjects, codingProjects]
  )

  const [autoScroll, setAutoScroll] = useState(true)
  const [experimentalMode, setExperimentalMode] = useState(false)
  const [mediaPlaying, setMediaPlaying] = useState(false)
  const [currentTrackName, setCurrentTrackName] = useState('Not playing audio')
  const [volume, setVolume] = useState(0.65)
  const [selectedKey, setSelectedKey] = useState<string | null>(null)
  const [hoveredKey, setHoveredKey] = useState<string | null>(null)
  const [detailProject, setDetailProject] = useState<ProjectRecord | null>(null)
  const [leftOffset, setLeftOffset] = useState(0)
  const [rightOffset, setRightOffset] = useState(0)
  const [leftSequenceWidth, setLeftSequenceWidth] = useState(0)
  const [rightSequenceWidth, setRightSequenceWidth] = useState(0)
  const [isPointerPaused, setIsPointerPaused] = useState(false)
  const [isDocumentVisible, setIsDocumentVisible] = useState(!document.hidden)
  const [reducedMotionEnabled, setReducedMotionEnabled] = useState(false)

  const captionRef = useRef<HTMLElement | null>(null)
  const leftTrackRef = useRef<HTMLDivElement | null>(null)
  const rightTrackRef = useRef<HTMLDivElement | null>(null)
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

  const stripConfig = useMemo<StripConfig[]>(
    () => [
      {
        key: 'left',
        items: leftProjects,
        offset: leftOffset,
        width: leftSequenceWidth,
        speed: 120,
        wheelFactor: 0.22,
        setOffset: setLeftOffset,
      },
      {
        key: 'right',
        items: rightProjects,
        offset: rightOffset,
        width: rightSequenceWidth,
        speed: 110,
        wheelFactor: 0.2,
        setOffset: setRightOffset,
      },
    ],
    [
      leftOffset,
      leftProjects,
      leftSequenceWidth,
      rightOffset,
      rightProjects,
      rightSequenceWidth,
    ]
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleMotionChange = () => setReducedMotionEnabled(mediaQuery.matches)
    handleMotionChange()
    mediaQuery.addEventListener('change', handleMotionChange)
    return () => mediaQuery.removeEventListener('change', handleMotionChange)
  }, [])

  useEffect(() => {
    const handleVisibilityChange = () => setIsDocumentVisible(!document.hidden)
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () =>
      document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])

  useEffect(() => {
    const leftTrack = leftTrackRef.current
    const rightTrack = rightTrackRef.current

    const updateSequenceWidths = () => {
      if (leftTrack) setLeftSequenceWidth(leftTrack.scrollWidth / 2)
      if (rightTrack) setRightSequenceWidth(rightTrack.scrollWidth / 2)
    }

    updateSequenceWidths()

    const resizeObserver = new ResizeObserver(updateSequenceWidths)

    if (leftTrack) resizeObserver.observe(leftTrack)
    if (rightTrack) resizeObserver.observe(rightTrack)

    return () => resizeObserver.disconnect()
  }, [leftProjects, rightProjects])

  useEffect(() => {
    const shouldAnimate =
      autoScroll &&
      !reducedMotionEnabled &&
      !isPointerPaused &&
      isDocumentVisible
    if (!shouldAnimate) return undefined

    let animationFrame = 0
    let previousTime = 0

    const updateOffset = (time: number) => {
      const deltaSeconds = previousTime === 0 ? 0 : (time - previousTime) / 1000
      previousTime = time

      stripConfig.forEach(({ width, speed, setOffset }) => {
        if (width === 0) return
        setOffset((current) =>
          wrapOffset(current - deltaSeconds * speed, width)
        )
      })

      animationFrame = window.requestAnimationFrame(updateOffset)
    }

    animationFrame = window.requestAnimationFrame(updateOffset)
    return () => window.cancelAnimationFrame(animationFrame)
  }, [
    autoScroll,
    isDocumentVisible,
    isPointerPaused,
    reducedMotionEnabled,
    stripConfig,
  ])

  const projectIndex = useMemo(() => {
    const map = new Map<string, ProjectRecord>()
    allProjects.forEach((project) => map.set(getProjectKey(project), project))
    return map
  }, [allProjects])

  const lockedProject = selectedKey
    ? (projectIndex.get(selectedKey) ?? null)
    : null
  const hoveredProject = hoveredKey
    ? (projectIndex.get(hoveredKey) ?? null)
    : null
  const activeProject = lockedProject ?? hoveredProject

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    setAutoScroll(false)
    stripConfig.forEach(({ width, wheelFactor, setOffset }) => {
      if (width === 0) return
      setOffset((current) =>
        wrapOffset(current + event.deltaY * wheelFactor, width)
      )
    })
  }

  const handleOpenProjectDetails = (project: ProjectRecord) =>
    setDetailProject(project)

  useEffect(() => {
    function handlePointerDown(event: MouseEvent | TouchEvent) {
      if (!selectedKey) return
      const target = event.target
      if (!(target instanceof Node)) return
      if (captionRef.current && captionRef.current.contains(target)) return
      const clickedCard = (target as HTMLElement).closest('.project-float')
      if (clickedCard) return
      setSelectedKey(null)
      setHoveredKey(null)
      setAutoScroll(true)
    }

    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [selectedKey])

  return (
    <div className="home-page" onWheel={handleWheel}>
      <div className="home-page__inner">
        <PlaybackControls
          autoScroll={autoScroll}
          currentTrackName={currentTrackName}
          experimentalMode={experimentalMode}
          mediaPlaying={mediaPlaying}
          onNextTrack={handleNextTrack}
          onTogglePlay={handleTogglePlay}
          setAutoScroll={setAutoScroll}
          handleExperimentalToggle={handleExperimentalToggle}
          setVolume={setVolume}
          volume={volume}
        />

        <div className="home-strip">
          <InfiniteStrip
            items={leftProjects}
            offset={leftOffset}
            trackRef={leftTrackRef}
            title="left"
            side="left"
            selectedKey={selectedKey}
            hoveredKey={hoveredKey}
            setSelectedKey={setSelectedKey}
            setHoveredKey={setHoveredKey}
            setAutoScroll={setAutoScroll}
            onPointerEnter={() => setIsPointerPaused(true)}
            onPointerLeave={() => setIsPointerPaused(false)}
            onOpenProjectDetails={handleOpenProjectDetails}
          />

          <InfiniteStrip
            items={rightProjects}
            offset={rightOffset}
            trackRef={rightTrackRef}
            title="right"
            side="right"
            selectedKey={selectedKey}
            hoveredKey={hoveredKey}
            setSelectedKey={setSelectedKey}
            setHoveredKey={setHoveredKey}
            setAutoScroll={setAutoScroll}
            onPointerEnter={() => setIsPointerPaused(true)}
            onPointerLeave={() => setIsPointerPaused(false)}
            onOpenProjectDetails={handleOpenProjectDetails}
          />
        </div>

        <HomeCaption activeProject={activeProject} captionRef={captionRef} />
        <ProjectDetailOverlay
          project={detailProject}
          onClose={() => setDetailProject(null)}
        />
      </div>
    </div>
  )
}
