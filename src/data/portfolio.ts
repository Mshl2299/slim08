/**
 * Portfolio types + runtime decode helpers.
 *
 * Workflow (plaintext never goes to GitHub):
 *   1. Edit portfolio.private.json  (gitignored)
 *   2. npm run encode:portfolio
 *   3. Commit src/data/portfolio.generated.ts
 *
 * Template: portfolio.private.example.json
 */

import { deobfuscate, type Obfuscated } from './obfuscate'
import {
  codingProjects as generatedCoding,
  musicProjects as generatedMusic,
} from './portfolio.generated'

export type Achievement = {
  built: Obfuscated
  because: Obfuscated
}

export type DesignChoice = {
  choice: Obfuscated
  because: Obfuscated
}

export type CodingProject = {
  id: string
  kind: 'coding'
  name: Obfuscated
  description: Obfuscated
  achievements: Achievement[]
  screenshots: Obfuscated[]
}

export type MusicProject = {
  id: string
  kind: 'music'
  name: Obfuscated
  description: Obfuscated
  designChoices: DesignChoice[]
  audioFile: Obfuscated
}

export type PortfolioProject = CodingProject | MusicProject

export type ResolvedAchievement = { built: string; because: string }
export type ResolvedDesignChoice = { choice: string; because: string }

export type ResolvedCodingProject = {
  id: string
  kind: 'coding'
  name: string
  description: string
  achievements: ResolvedAchievement[]
  screenshots: string[]
}

export type ResolvedMusicProject = {
  id: string
  kind: 'music'
  name: string
  description: string
  designChoices: ResolvedDesignChoice[]
  audioFile: string
}

export const codingProjects: CodingProject[] = generatedCoding as CodingProject[]
export const musicProjects: MusicProject[] = generatedMusic as MusicProject[]

export function resolveCodingProject(project: CodingProject): ResolvedCodingProject {
  return {
    id: project.id,
    kind: 'coding',
    name: deobfuscate(project.name),
    description: deobfuscate(project.description),
    achievements: project.achievements.map((a) => ({
      built: deobfuscate(a.built),
      because: deobfuscate(a.because),
    })),
    screenshots: project.screenshots.map((s) => deobfuscate(s)),
  }
}

export function resolveMusicProject(project: MusicProject): ResolvedMusicProject {
  return {
    id: project.id,
    kind: 'music',
    name: deobfuscate(project.name),
    description: deobfuscate(project.description),
    designChoices: project.designChoices.map((d) => ({
      choice: deobfuscate(d.choice),
      because: deobfuscate(d.because),
    })),
    audioFile: deobfuscate(project.audioFile),
  }
}

export function getResolvedCodingProjects(): ResolvedCodingProject[] {
  return codingProjects.map(resolveCodingProject)
}

export function getResolvedMusicProjects(): ResolvedMusicProject[] {
  return musicProjects.map(resolveMusicProject)
}
