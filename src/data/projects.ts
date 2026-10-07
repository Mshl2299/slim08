import photoLoopA from '../assets/project-screenshots/e49vOF.png'
import photoLoopB from '../assets/project-screenshots/QYsXh1.png'
import photoLoopC from '../assets/project-screenshots/yu3LkT.png'
import nutreentsA from '../assets/project-screenshots/kJtM64.gif'
import nutreentsB from '../assets/project-screenshots/dQ5QNt.gif'
import pillowA from '../assets/project-screenshots/qVziEp.png'
import pillowB from '../assets/project-screenshots/mkXBgZ.png'
import pillowC from '../assets/project-screenshots/mq2JZo.png'
import pillowD from '../assets/project-screenshots/ncIxRV.png'
import ssTrangeA from '../assets/project-screenshots/o0qgtf.gif'
import ssTrangeB from '../assets/project-screenshots/9Zos0D.gif'
import ssTrangeC from '../assets/project-screenshots/obP3W2.gif'

export type ProjectTag = 'coding' | 'audio' | 'data-science' | 'game-dev' | 'other'

export interface ProjectLink {
    label: string
    url: string
}

export interface ProjectRecord {
    name: string
    shortDescription: string
    description: string
    links?: ProjectLink[]
    screenshots?: string[]
    audioFile?: string
    tags: ProjectTag[]
}

export const projects: ProjectRecord[] = [
    {
        name: 'UBC Course Insights',
        shortDescription: 'Web app for searching and querying courses at UBC',
        description: `Sept. 2025 – Dec. 2025
            A web app that allows users to search for courses at UBC and view course information.
            
            Project highlights:
            - Led a 3-person team in developing a full-stack application that processed 64,000+ course records.
            - Coordinated requirements, timelines, implementation priorities, and follow-up work.
            - Designed 4 REST API endpoints to keep responsibilities clean and maintainable.
            - Built and maintained 38+ Mocha tests and achieved a 100% pass rate before submission.
            
            Completed as part of Introduction to Software Engineering.`,
        screenshots: [],
        tags: ['coding'],
    },
    {
        name: 'Nature Tracker',
        shortDescription: 'Full-stack application for recording and querying plant and animal sightings',
        description: `Sept. 2025 – Dec. 2025
            
            Developed a full-stack application for recording, sharing, and querying plant and animal sightings across 16 attributes
            using React, Node.js, Oracle SQL, and Material UI
            
            Completed on a team of 3 as part of Introduction to Relational Databases.`,
        tags: ['coding'],
    },
    {
        name: 'VeToned',
        shortDescription: 'A meal-planner app for specialized diets',
        description: `Sept 2024 - Dec 2024
            
            Developed a simple meal-planner app for Asian diets, which often involve many dishes that become hard to track ingredients and macronutrients.
            
            Completed solo with Java and JUnit as part of Software Construction.`,
        links: [{ label: 'GitHub', url: 'https://github.com/Mshl2299/VeToned' }],
        tags: ['coding'],
    },
    {
        name: 'Predicting AirBnB Prices in European Cities',
        shortDescription: 'A multiple linear regression model for predicting AirBnB listing prices in European cities',
        description: `July 2025 -- Aug. 2025
            
            Modeled a multiple linear regression model using forward stepwise predictor selection on 23, 042 European Airbnb listings, achieving an R-squared of 0.578 and reducing RMSE by approximately 32% over the baseline mode.
            
            Completed on a team of 4 using R and JupyterLab as part of Statistical Modelling for Data Science.`,
        links: [{ label: 'GitHub', url: 'https://github.com/Mshl2299/Predicting-Airbnb-Price-in-European-Cities' }],
        tags: ['coding', 'data-science'],
    },
    {
        name: 'PhotoLoop',
        shortDescription: 'Soundtrack additions and audio work for a PhotoShop OS-simulator',
        description: `Oct 2025 - Present
            
            What I worked on:
            - 5 soundtrack additions, including Bossa Nova, Lofi, and 3 themes tied to in-game character lore (fishing, donut store, and an off-putting guy…)
            - Miscellaneous sound effects (email notification, end day sound)
            - Music player (WIP)
            - Playtesting
            
            What I learned:
            - Developed better composition techniques and structuring
            - Difficulties in state management for maintaining a list of audio tracks in a music player…`,
        links: [
            { label: 'Steam', url: 'https://store.steampowered.com/app/4246560/PhotoLoop/' },
            { label: 'itch.io', url: 'https://goosemachine.itch.io/photoloop' },
        ],
        screenshots: [photoLoopA, photoLoopB, photoLoopC],
        tags: ['coding', 'game-dev', 'audio'],
    },
    {
        name: 'NuTREEnts',
        shortDescription: 'Regrow your forest in a tower-defense roguelike with trees',
        description: `Oct 2025 - Present
            
            A tower-defense roguelike… with TREEs! Defend your mother tree against waves of voracious and deadly bugs, grow a diverse and sturdy forest, and revitalize the world!
            
            Won “Best Audio” at the UBC Game Development Club Year-end Showcase in 2025-2026 at a panel of industry judges, for tailored sound effects and audio layering system.
            
            What I worked on:
            - Extensions, refactoring and documentation for an existing sound system for sound effects and music
            - Extended functionality to support layered Music resources consisting of 4 separate tracks that get turned on and off with real-time enemy counts
            - Composed 4 biome tracks and updated existing track by porting MIDI files
            - Integrated sound effects for various trees, UI changes, artifacts
            - Created Translation spreadsheet for easier modification and integration of game component names, descriptions and other text
            - Playtesting
            
            What I learned:
            - Soundfont usage
            - How to make Desert, Tundra, Swamp and City/Dystopian sound design
            - Variety SFX design (explosions, projectile shooting, status effects, alerts, movement)
            - Advanced Google Sheets manipulation
            - Godot Debugging with breakpoints, print statements, stack traces and otherwise wild goose chases around the codebase`,
        links: [
            { label: 'Steam', url: 'https://store.steampowered.com/app/3692400/NuTREEnts/' },
            { label: 'itch.io', url: 'https://goosemachine.itch.io/nutreents' },
        ],
        screenshots: [nutreentsA, nutreentsB],
        tags: ['coding', 'game-dev', 'audio'],
    },
    {
        name: 'Mr. Machine\'s Pillow Factory',
        shortDescription: 'A chaotic incremental game about making the largest pile of pillows the world has ever seen.',
        description: `Jul 2026 - Jul 2026
            
            *Mr. President, there’s a nuke coming for us!!! … Is that so… We’re gonna need a powerful pile of pillows!*
            A chaotic feather-filled incremental game about making the largest pile of pillows the world’s ever seen, by counting down (feathers) with clockwork geese workers before the countdown of a nuke counts down to zero. 
            
            Made as part of the 2026 GMTK Game Jam, theme of “Countdown”.
            
            Rankings:
            - Narrative: #62 of 10,534 entries (4.35/5); top 0.6%
            - Enjoyment: #71 of 10,534 entries (4.35/5); top 0.7%
            - Audio: #674 of 10,534 entries (3.69/5); top 6.4%
            
            What I worked on:
            - Game design from start to finish (ideation, mechanics, story, scope management, balancing)
            - Integrated custom Godot sound system for sound effects and music, improving the flexibility from the S.S. Trange sound system
            - 3 themes advancing in energy levels as the countdown decreases
            - All sound effects
            
            What I learned:
            - More resourcefulness, using voice, body (the hand grabbing sound is from actual hand sounds), and various other objects I could find around my house (the pillow sounds are actually just a hoodie)
            - Making UI sounds with synthesizers
            - Incremental games involve a lot of math… and potentially spreadsheets`,
        links: [{ label: 'itch.io', url: 'https://goosemachine.itch.io/mr-machines-pillow-factory' }],
        screenshots: [pillowA, pillowB, pillowC, pillowD],
        tags: ['audio', 'game-dev'],
    },
    {
        name: 'The SS Trange',
        shortDescription: 'A fishing game set in the galactic wilds',
        description: `Feb 2026 - Feb 2026
            
            Welcome aboard the S.S. Trange, your new fishing boat in galactic wilds. Fish from ocean-like planets, sell them to alien locals, and sail the distant strange seas!
            
            Made as part of the 2026 Brackey\’s Game Jam (Pt.1), theme of “Strange Places”.
            
            Rankings:
            - Gameplay: #36 of 1,421 entries (3.9/5); top 2.4%
            - Overall: #94 of 1,421 entries (3.77/5); top 6.2%
            - Audio: #277 of 1,421 entries (3.35/5); top 18%
            
            What I worked on:
            - Integrated custom Godot sound system with sound effect oneshots and globals + music system (inspo: FelixRL)
            - Sound design for all sound effects (footsteps, interactables, npcs)
            - 4 different planet ambient wind/water (and gear) sounds
            - Shop theme and Sailing theme
            
            What I learned:
            - Developed better sound layering skills
            - How to make a shop theme (credit: a bunch of YouTube videos)
            - Building and integrating a sound system from scratch
            - Resourceful Foley sampling around my house
            - Sound effects can get very annoying if they are repetitive and loud… so make sure to balance audio in a final check before shipping`,
        links: [{ label: 'itch.io', url: 'https://goosemachine.itch.io/the-ss-trange' }],
        screenshots: [ssTrangeA, ssTrangeB, ssTrangeC],
        tags: ['coding', 'game-dev', 'audio'],
    },
    {
        name: 'Pacemaker',
        shortDescription: 'A rhythm-based puzzle strategy about revitalization, timing your presses and holds to the pulse of your beating heart',
        description: `Sept 2024 -- Apr 2025
            
            Pacemaker is a rhythm-based puzzle strategy about revitalization. Time your presses and holds to the pulse of your beating heart, as you face and bring color back to scattered worlds.
            
            What I worked on:
            Tile-based movement mechanics (tap, hold to dash)
            UI Feedback on dashes (ECG wave, color with time)
            Battle sequencing (hardcoded)
            
            What I learned:
            Godot is not the best for games involving precise timing (delays are hard!)
            Basics of Godot syntax (GDScript and GDShaders)
            Video game lifecycle & development processes on a team`,
        links: [
            { label: 'GitHub', url: 'https://github.com/wispykey/UBCGD-Team-14' },
            { label: 'itch.io', url: 'https://wispykey.itch.io/pacemaker' },
        ],
        tags: ['coding', 'game-dev'],
    },
    {
        name: 'AST-Emmental',
        shortDescription: 'An arcade-style game inspired by Asteroids and Snake, with original ship sprites and backgrounds.',
        description: `July 2025 – Present
            
            AST-Emmental is an arcade-style game inspired by classics including Asteroids and Snake. This game was coded from scratch in HTML/CSS/JS, with original ship sprites, and backgrounds and (some) audio borrowed online.
            
            Code is maintained long-term, with ongoing refactoring, tweaks, replacements and features.
            
            What I worked on:
            Game Design
            Pixel art Spritesheets & Sprites
            All programmed functionality (rendering, logic, sound effects)
            Documentation
            Refactorings (from *everything global* into object-oriented with separation of responsibilities)
            Deployment, Continuous development
            Soundtrack (in progress)
            
            What I learned:
            Iterative build process of games
            A bit of everything in the game development cycle (design, art, audio, mechanics, maintenance)`,
        links: [{ label: 'GitHub', url: 'https://github.com/Mshl2299/Ast-Emmental' }],
        tags: ['coding', 'game-dev', 'audio'],
    },
    {
        name: 'Pain2Go',
        shortDescription: 'A healthcare-rehabilitation app providing a 2d anatomical mapping to pinpoint muscle locations that may be encountering pain.',
        description: `Jan 2024 - Jan 2024
            
            A healthcare-rehabilitation app providing a 2d anatomical mapping to pinpoint muscle locations that may be encountering pain. Once identified, users can view a set of exercises targeting that specific muscle/muscle group, supporting a range of fitness levels. With good consistency and awareness, eventually we will have all Pain2Go away!
            
            Completed on a team of 4 as part of nwHacks 2024, a 24-hour hackathon.`,
        links: [{ label: 'GitHub', url: 'https://github.com/gordnzhou/Pain2Go' }],
        tags: ['coding'],
    },
]
