import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
  type WheelEvent,
} from 'react'
import { ProjectDetailOverlay } from '../../components/ProjectDetailOverlay/ProjectDetailOverlay'
import { projects, type ProjectRecord } from '../../data/projects'
import './Home.css'

const projectData = projects

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
  if (width === 0) {
    return 0
  }

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
    return `linear-gradient(135deg, rgba(14, 14, 14, 0.35), rgba(8, 8, 8, 0.7)), url(${project.screenshots[0]})`
  }

  return 'linear-gradient(135deg, rgba(189, 138, 61, 0.75), rgba(10, 10, 10, 0.92), rgba(30, 24, 16, 1))'
}

function createDuplicatedProjectList(
  sourceProjects: ProjectRecord[],
  minimumLength = 24
): ProjectWithKey[] {
  if (sourceProjects.length === 0) {
    return []
  }

  const renderLength = Math.max(minimumLength, sourceProjects.length * 3)
  const duplicatedProjects: ProjectWithKey[] = []

  while (duplicatedProjects.length < renderLength) {
    const sourceProject =
      sourceProjects[duplicatedProjects.length % sourceProjects.length]
    const sourceIndex = sourceProjects.indexOf(sourceProject)

    duplicatedProjects.push({
      ...sourceProject,
      projectKey: getProjectKey(sourceProject, sourceIndex),
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
      className={`project-float ${isSelected ? 'project-float--selected' : ''} ${
        isMuted ? 'project-float--muted' : ''
      } ${isHovered ? 'project-float--hovered' : ''}`}
      style={{
        backgroundImage: getProjectBackgroundImage(project),
        backgroundPosition: 'center',
        backgroundSize: project.screenshots?.[0] ? 'cover' : '100% 100%',
        backgroundRepeat: 'no-repeat',
        pointerEvents: isMuted ? 'none' : 'auto',
        transform: 'translate3d(0, 0, 0)',
      }}
      onMouseEnter={() => {
        if (selectedKey !== null && !isSelected) {
          return
        }

        setHoveredKey(projectKey)
      }}
      onMouseLeave={() => {
        if (selectedKey === null) {
          setHoveredKey(null)
        }
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
          style={{ transform: `translate3d(${-offset}px, 0, 0)` }}
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
  mediaPlaying: boolean
  setAutoScroll: Dispatch<SetStateAction<boolean>>
  setMediaPlaying: Dispatch<SetStateAction<boolean>>
}

function PlaybackControls({
  autoScroll,
  mediaPlaying,
  setAutoScroll,
  setMediaPlaying,
}: PlaybackControlsProps) {
  return (
    <div className="home-playback" aria-live="polite">
      <button
        type="button"
        className="home-playback__toggle"
        onClick={() => setMediaPlaying((current) => !current)}
        aria-label={mediaPlaying ? 'Pause audio' : 'Play audio'}
      >
        <span className="home-playback__icon" aria-hidden="true">
          {mediaPlaying ? '❚❚' : '▶'}
        </span>
      </button>
      <button
        type="button"
        className="home-playback__label"
        onClick={() => setAutoScroll((current) => !current)}
        aria-label={autoScroll ? 'Pause auto scroll' : 'Play auto scroll'}
      >
        AUTO
      </button>
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
        <p className="home-caption__summary">
          {activeProject
            ? activeProject.shortDescription
            : 'Hover a cover to preview its focus, or click to pin it in place.'}
        </p>
      </div>
      <div className="home-caption__bottom">
        <p>
          Scroll to move. Click once to pin. Click again to open details. Click
          outside to unpin.
        </p>
      </div>
    </aside>
  )
}

function Home() {
  const codingProjects = useMemo(
    () => projectData.filter((project) => project.tags.includes('coding')),
    []
  )
  const audioProjects = useMemo(
    () => projectData.filter((project) => project.tags.includes('audio')),
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
  const [mediaPlaying, setMediaPlaying] = useState(false)
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

    const handleMotionChange = () => {
      setReducedMotionEnabled(mediaQuery.matches)
    }

    handleMotionChange()
    mediaQuery.addEventListener('change', handleMotionChange)

    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange)
    }
  }, [])

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsDocumentVisible(!document.hidden)
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  useEffect(() => {
    const leftTrack = leftTrackRef.current
    const rightTrack = rightTrackRef.current

    const updateSequenceWidths = () => {
      if (leftTrack) {
        setLeftSequenceWidth(leftTrack.scrollWidth / 2)
      }
      if (rightTrack) {
        setRightSequenceWidth(rightTrack.scrollWidth / 2)
      }
    }

    updateSequenceWidths()

    if (!leftTrack && !rightTrack) {
      return undefined
    }

    const resizeObserver = new ResizeObserver(() => {
      updateSequenceWidths()
    })

    if (leftTrack) {
      resizeObserver.observe(leftTrack)
    }

    if (rightTrack) {
      resizeObserver.observe(rightTrack)
    }

    return () => {
      resizeObserver.disconnect()
    }
  }, [leftProjects, rightProjects])

  useEffect(() => {
    const shouldAnimate =
      autoScroll &&
      !reducedMotionEnabled &&
      !isPointerPaused &&
      isDocumentVisible

    if (!shouldAnimate) {
      return undefined
    }

    let animationFrame = 0
    let previousTime = 0

    const updateOffset = (time: number) => {
      const deltaSeconds = previousTime === 0 ? 0 : (time - previousTime) / 1000
      previousTime = time

      stripConfig.forEach(({ width, speed, setOffset }) => {
        if (width === 0) {
          return
        }

        setOffset((current) =>
          wrapOffset(current - deltaSeconds * speed, width)
        )
      })

      animationFrame = window.requestAnimationFrame(updateOffset)
    }

    animationFrame = window.requestAnimationFrame(updateOffset)

    return () => {
      window.cancelAnimationFrame(animationFrame)
    }
  }, [
    autoScroll,
    isDocumentVisible,
    isPointerPaused,
    reducedMotionEnabled,
    stripConfig,
  ])

  const projectIndex = useMemo(() => {
    const map = new Map<string, ProjectRecord>()

    allProjects.forEach((project, index) => {
      map.set(getProjectKey(project, index), project)
    })

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
      if (width === 0) {
        return
      }

      setOffset((current) =>
        wrapOffset(current + event.deltaY * wheelFactor, width)
      )
    })
  }

  const handleOpenProjectDetails = (project: ProjectRecord) => {
    setDetailProject(project)
  }

  useEffect(() => {
    function handlePointerDown(event: MouseEvent | TouchEvent) {
      if (!selectedKey) {
        return
      }

      const target = event.target

      if (!(target instanceof Node)) {
        return
      }

      if (captionRef.current && captionRef.current.contains(target)) {
        return
      }

      const clickedCard = (target as HTMLElement).closest('.project-float')
      if (clickedCard) {
        return
      }

      setSelectedKey(null)
      setHoveredKey(null)
      setAutoScroll(true)
    }

    document.addEventListener('pointerdown', handlePointerDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
    }
  }, [selectedKey])

  return (
    <div className="home-page" onWheel={handleWheel}>
      <div className="home-page__inner">
        <PlaybackControls
          autoScroll={autoScroll}
          mediaPlaying={mediaPlaying}
          setAutoScroll={setAutoScroll}
          setMediaPlaying={setMediaPlaying}
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

export default Home
