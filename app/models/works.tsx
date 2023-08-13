import PDF from '~/components/PDF'
import { docs, images, videos } from '../assets/assets'
import ViewButton from '~/components/ViewButton'

declare global {
  type RoleType = 'artist' | 'researcher' | 'designer'
  type RoleFilter<T extends RoleType> = T extends 'artist'
    ? 'performance' | 'hypertext'
    : T extends 'researcher'
    ? 'teaching' | 'writing'
    : T extends 'designer'
    ? 'web' | 'multimedia'
    : never

  type Work<T extends RoleType> = {
    filter: RoleFilter<T>
    title: string
    subtitle: string
    route: string
    description: JSX.Element
    content: JSX.Element
    background: JSX.Element
  }
}

export const works: { [T in RoleType]: Work<T>[] } = {
  artist: [
    {
      title: 'Particularities',
      route: 'particularities',
      filter: 'performance',
      subtitle: 'multimedia installation',
      content: (
        <iframe
          className='aspect-video w-full'
          src='https://www.youtube.com/embed/seOUcmpeKhA'
          title='Particularities'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          allowFullScreen
        ></iframe>
      ),
      description: (
        <p>
          <i>Particularities</i> is an experiment in communal interior
          monologue, assisted by technology. The work was produced using a
          sound-processing patch in Max/MSP, which communicates with a webpage
          that processes speech recognition and visuals. Audio is spoken into a
          microphone from a stage covered in reflective curtains, which the
          computer transcribes and records. Fragments of text flash on the
          screen, which also manipulates the computer’s webcam to display a
          pixelated silhouette of the speaker, processed through Javascript. In
          parallel, the computer continually selects random-access recordings,
          mangled through pitch and time manipulations until they sound like
          glitches, ghosts—or inner demons. A series of prompts cycle through
          the screen, alternately asking the participants to speak and
          questioning the nature of what they are actually doing.
        </p>
      ),
      background: (
        <video
          src={videos.particularitiesCover}
          poster={images.particularitiesPlaceholder}
        ></video>
      ),
    },
    {
      title: 'Unfolding',
      route: 'unfolding',
      filter: 'performance',
      subtitle: 'performer, machine-learning, & mylar',
      background: (
        <video
          src={videos.unfoldingCover}
          poster={images.unfoldingPlaceholder}
        ></video>
      ),
      content: (
        <iframe
          className='aspect-video w-full'
          src='https://www.youtube.com/embed/mI9meISxHnQ'
          title='Unfolding'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          allowFullScreen
        ></iframe>
      ),
      description: (
        <>
          "Unfolding" takes inspiration from Cixin Liu's novel "The Three-Body
          Problem," where a society from the planet Trisolaris manages to unfold
          a single proton from 11 dimensions into 2 dimensions. After being
          unfolded, circuits are etched into the proton's surface, transforming
          it into a conscious supercomputer. The piece uses the FluCoMa
          machine-learning library in Max/MSP to separate the sounds of a Mylar
          sheet into subcomponents, routing them into each other and
          transforming them into an 8-channel delay. The voice is used to
          modulate and manipulate the properties of the sound, and as the mylar
          sheet is crumpled, the sound takes on new properties as the
          controlling voice learns to sing in its chaotic language.
        </>
      ),
    },
    {
      title: "What I've Done",
      route: 'what-ive-done',
      filter: 'performance',
      subtitle: 'jazz band & meta-monologue',
      content: (
        <>
          <iframe
            width='100%'
            className='aspect-video'
            src='https://www.youtube.com/embed/lnE9lyYIAZg'
            title="What I've Done"
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          ></iframe>
          <div className='px-8'>
            <PDF src='/assets/doc/what-ive-done.pdf'></PDF>
          </div>
        </>
      ),
      description: (
        <>
          <p>
            <i>What I've Done</i> is equal parts a satirical surrealist
            free-jazz meta-monologue, an existential crisis, and a bit of good
            fun. The musicians play from doodles scrawled around the written
            text, encouraging them to negotiate a semantic, cartoony chaos to
            turn the doodles into sound. The piece folds in on itself in
            multiple levels: the speaker's internal, bottled-up overflowing
            pressure-cooker of meaning, then the competition between the speaker
            as bandleader and the band, and finally the tension between speaker
            and audience. Meanwhile, there's a fourth tension of me, who is
            writing this program note, and me, who was filmed in the video and
            wrote the piece as well as performing it. Oh, what have I done.
          </p>
          <p>
            Sam Blieden produced &amp; directed the video, with support from
            Henry Nelson &amp; Will Curry. The band is the Self-Prescribing
            Doctors Union, comprised of Henry Nelson (guitar), Will Curry
            (saxophone), Owen Frankel (bass), and Jeremy McCabe (drums). Truly,
            this piece is what all of them have done to bring this idea to
            fruition.
          </p>
        </>
      ),
      background: (
        <video
          src={videos.whatIveDoneCover}
          poster={images.whatIveDonePlaceholder}
        ></video>
      ),
    },
    {
      title: 'raining',
      route: 'raining',
      filter: 'hypertext',
      subtitle: 'kinetic digital soundpoem',
      description: (
        <p>
          <i>raining</i> is a kinetic digital poem in which fragments of words
          flitter across the screen in response to user scrolling. It explores
          the capacity for text to speak for itself, using a shifting sound
          background to paint a landscape of unsettled community.
        </p>
      ),
      content: (
        <ViewButton href='/works/raining/index.html'>view work</ViewButton>
      ),
      background: (
        <video
          src={videos.rainingCover}
          poster={images.rainingPlaceholder}
        ></video>
      ),
    },
    {
      title: 'AM',
      route: 'am',
      filter: 'hypertext',
      subtitle: 'juxtaposed sonic & written fragments',
      description: (
        <p>
          <i>AM</i> juxtaposes text fragments with radio interference, creating
          a chaotic nexus of interruption and challenging the reader to navigate
          the boundary between sound and sense.
        </p>
      ),
      content: <ViewButton href={'/works/am/index.html'}>view work</ViewButton>,
      background: (
        <video src={videos.amCover} poster={images.amPlaceholder}></video>
      ),
    },
    {
      title: 'a max patch i made in 2020',
      route: 'a-max-patch',
      filter: 'performance',
      subtitle: 'for live-processed solo zoomer',
      background: (
        <video
          src={videos.aMaxPatchIMadeIn2020Cover}
          poster={images.aMaxPatchPlaceholder}
        ></video>
      ),
      description: (
        <p>
          I produced this piece for a remote music technology class during the
          COVID lockdown. In it, I introduce the piece for the duration of the
          piece, processing the Zoom Audio to progressively glitch and distort
          the voice until it is intelligible. The piece slowly transforms the
          speaking voice into a computer-generated sawtooth wave, and then a
          spasming MIDI electric bass, becoming a cyborg speaker—or maybe it was
          just Zoom glitching out all along—or maybe that's just my voice.
        </p>
      ),
      content: (
        <iframe
          className='aspect-video w-full'
          src='https://www.youtube.com/embed/tmyQ_Gt34fY'
          title='A Max Patch I made in 2020'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          allowFullScreen
        ></iframe>
      ),
    },
  ],
  researcher: [
    {
      title: 'Demons of Analogy',
      route: 'demons-of-analogy',
      filter: 'writing',
      subtitle: 'The Encounter Between Music and Language After Mallarmé',
      background: <img src={images.demonsOfAnalogyCover} />,
      description: (
        <p>
          <i>Demons of Analogy</i> is my undergraduate Honors thesis, and was
          awarded Highest Honors from the Oberlin College Comparative Literature
          department. The thesis explores the overlaps and contradictions
          between poetry and sound using the lens of static and interference. I
          draw from the work of Michel Serres, especially his book "Parasite,"
          to connect French Symbolist Stéphane Mallarmé to the music of Pierre
          Boulez, eventually arriving at contemporary avant-garde artists such
          as Georges Aperghis and O(rphan)d(rift&gt;). I consider how a musical
          poetics can speak to poetic music, and how the two can merge.
        </p>
      ),
      content: <PDF src='/assets/doc/demons-of-analogy.pdf' />,
    },
    {
      title: 'EarCo',
      route: 'ear-co',
      filter: 'teaching',
      subtitle: 'Eavesdropping, Surveillance and the Poetics of Information',
      background: <img src={images.earCoCover} />,
      description: (
        <p>
          The ownership of one's self and body in the present age is under
          siege, since our presence, identity, and experiences are narrated by
          data monitors and intelligent systems. EarCo is a seminar-style class
          that explores the ways technology permeates our lives and how we
          conceive of ourselves, and opens up questions to redefine our
          relationship to technology. We will alternate between creative and
          scholarly investigations into topics such as AI, surveillance, data
          flows, and algorithms, investigating how these issues influence our
          identities and agency.
        </p>
      ),
      content: <PDF src={docs.earCo} />,
    },
    {
      title: 'CyborgCo',
      route: 'cyborg-co',
      filter: 'teaching',
      subtitle: 'Posthumanism, Selves, & the Anthropocene',
      background: <img src={images.cyborgCoCover} />,
      description: (
        <p>
          A human. A post. A duck-sized horse. Is this WestWorld? Maybe. In
          CyborgCo: Posthumanism, Selves, and the Anthropocene, we will explore
          what it means to be human—and potentially whether “human” still has
          any meaning at all. This seminar course will explore posthumanism—a
          word to describe this particular existential territory—through
          philosophy, theory, technology, art, and popular culture, including
          Donna Haraway’s feminist interpretation of the cyborg, popular movies
          and TV shows such as Akira & Black Mirror, and even poetry written by
          artificial intelligence. We will discuss questions such as
          technology’s impact on the self, human hubris & anthropocentrism, and
          whether we ourselves are still human—or whether it might be better to
          forget the word human altogether. Our goal is to enrich our knowledge
          of the current day and even the future, but student need no prior
          knowledge to enjoy the course—only a willingness to question
          everything. This class is in-person and largely discussion based with
          readings and artistic/written projects.
        </p>
      ),
      content: <PDF src={docs.cyborgCo} />,
    },
    {
      title: 'Reclaiming Space',
      route: 'reclaiming-space',
      filter: 'writing',
      subtitle: 'Feminist Psychosis in Cixous & Clément, Gilman, & Ferrante',
      background: <img src={images.reclaimingSpaceCover} />,
      description: (
        <p>
          In this paper, I explore the concept of “hysteria” as it is reclaimed
          by the feminist thinkers/authors Hélène Cixous and Catherine Clément,
          Charlotte Perkins Gilman, and Elena Ferrante. I begin with a brief
          overview of the historical connotations of hysteria, showing how the
          metaphor of hysteria mythologized a patriarchal notion of femininity
          before being re-mythologized for feminism. I then investigate how
          Gilman and Ferrante have situated themselves within this myth, using
          The Newly Born Woman by Cixous and Clément to contextualize Gilman’s
          "The Yellow Wall-Paper” and Ferrante's first two novels, Troubling
          Love and The Days of Abandonment. I identify a similar process used by
          both Gilman and Ferrante in which the female protagonist reinvents
          herself as a “newly born woman,” which I outline in three stages.
          First, the subject somatizes patriarchy, percieving it with spatial
          metaphors and thus representing it in a nonverbal, non-rational way.
          Second, she encodes a hallucination of oppressed femininity within the
          patriarchal space, exploring her oppression and potential liberation
          through a progressively more real “alter ego.” This culminates in the
          protagonist blending her physical self with her hallucinated alter
          ego, claiming a new agency just as she appears to be claimed by
          hysteria. My analysis shows how hysteria has been repurposed by these
          feminist authors/thinkers as a foil for patriarchal, rational, and
          phallogocentric structures of thought.
        </p>
      ),
      content: (
        <ViewButton href='https://mackseyjournal.scholasticahq.com/article/21771-reclaiming-space-feminist-hysteria-in-cixous-and-clement-gilman-and-ferrante'>
          read full article
        </ViewButton>
      ),
    },
    {
      title: 'Finnegans Wake',
      route: 'finnegans-wake',
      filter: 'teaching',
      subtitle: 'Reading Through the Wake',
      background: <img src={images.finnegansWakeCover} />,
      description: (
        <p>
          This course is an intensive reading of James Joyce’s final novel
          Finnegans Wake. A cyclical novel incorporating over fourteen
          intertwined languages, Finnegans Wake is widely regarded as the most
          difficult novel ever written. Indeed, Jacques Derrida once wrote an
          entire lecture on two words in the over 600-page book — he war.
          Nonetheless, the text is not impenetrable; in fact, it can be musical,
          whimsical, and even humorous. Working as a group, we will spend the
          semester working through the entire text as a class. We will not
          understand everything, but we will try to find our own ways into one
          of the most confounding texts of all time. The course is predominantly
          discussion-based, but we will offer a brief lecture once a week
          offering context and summarizing relevant literary criticism. Students
          will have the choice to either lightly read around 50 pages or
          intensively read a shorter excerpt of the text every week. In group,
          we will unpack the text in addition to performing a number of
          exercises, such as accented reading and word-analysis (which is way
          more fun than it sounds).
        </p>
      ),
      content: <PDF src={docs.finnegansWake} />,
    },
  ],
  designer: [
    {
      title: 'Time Ruler',
      route: 'time-ruler',
      filter: 'web',
      subtitle: 'Task management and time-blocking for Obsidian',
      background: <img src={images.timeRulerCover}></img>,
      content: (
        <ViewButton href='https://github.com/joshuatazrein/obsidian-time-ruler'>
          view on GitHub
        </ViewButton>
      ),
      description: (
        <>
          Time Ruler combines the best parts of a nested tasklist and an
          event-based calendar view. Drag-and-drop tasks to time-block and
          reschedule, and view tasks on top of read-only online calendars. The
          Time Ruler plugin also integrates seamlessly with the Tasks and
          FullCalendar plugins for Obsidian.
        </>
      ),
    },
    {
      title: 'Grants at Oberlin',
      route: 'grants-at-oberlin',
      filter: 'multimedia',
      subtitle: 'After Effects animation',
      description: (
        <p>
          I crafted this animation for Oberlin Conservatory Office of
          Professional Development, which offers students grants to support
          creative projects. I wrote the script, recorded voiceover, designed
          the video, animated it in After Effects, chose music, and mixed the
          audio myself.
        </p>
      ),
      content: (
        <iframe
          width='100%'
          className='aspect-video'
          src='https://www.youtube.com/embed/reXPIl8gee8'
          title='YouTube video player'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          allowFullScreen
        ></iframe>
      ),
      background: (
        <video
          src={videos.grantsVideoCover}
          poster={images.grantsVideoPlaceholder}
        />
      ),
    },
    {
      title: 'TIMARA History',
      route: 'timara-history',
      filter: 'web',
      subtitle: 'Interactive animated timeline',
      background: <video src={videos.timaraCover}></video>,
      content: (
        <ViewButton href='https://timara.oberlin.edu/history'>
          View website
        </ViewButton>
      ),
      description: (
        <>
          TIMARA, or Technology in Music and Related Arts, has a rich history at
          Oberlin spanning over 100 years. I adapted an article originally
          published in the Oberlin Conservatory Alumni Magazine, rendering it as
          an interactive webpage in React complete with animations, responsive
          design, and a video grid featuring TIMARA's 50th anniversary festival.
          The archival work encompassed formatting over 6 hours of multicamera
          footage into 1-minute segments.
        </>
      ),
    },
    {
      title: 'RiverBank',
      route: 'riverbank',
      filter: 'web',
      subtitle: 'Google Tasks & Calendar',
      background: <img src={images.riverbankCover} />,
      description: (
        <p>
          RiverBank is a full-stack web application providing a better user
          interface for Google Tasks and Calendars. A simple, three-panel view
          lets you view your unscheduled, current, and future tasks integrated
          with your Calendar events, and drag-and-drop to reschedule. The app is
          coded in React using libraries including React-Dnd, jQuery, Tailwind
          CSS, and Google Apis.
        </p>
      ),
      content: <ViewButton href='https://riverbank.app/'>View app</ViewButton>,
    },
    {
      title: 'Notice',
      route: 'notice',
      filter: 'web',
      subtitle: 'Notion Overviews',
      background: <img src={images.noticeCover} />,
      description: (
        <p>
          Overviews of your Notion databases as tasks, flashcards, or graphs.
          Notice is an extension for Notion that provides Overviews: specialized
          views that can incorporate multiple databases. Currently, Notice
          supports: • Tasks: a day-by-day view of your tasks with grouping,
          Google Calendar integration, and drag-and-drop rescheduling. •
          Flashcards: a front-and-back card stack with spaced repetition, random
          order, and filtering. • Graph: a network visualization that shows
          relations between pages. To add an Overview, simply add a database in
          a similar way to adding a view in Notion: enter what properties you
          want to use, and Notice automatically visualizes your data. Once you
          log in via the extension's popup, Notice is available as a button in
          the Notion sidebar. You can optionally style the Notion app to match
          the Notice style. More Overviews may be added. If you have ideas or
          requests, please contact us via the "Email the developer" button!
        </p>
      ),
      content: (
        <ViewButton href='https://chrome.google.com/webstore/detail/notice-notion-overviews/pjlnaeiildmajccjkdabbchcejpbbhah'>
          View chrome extension
        </ViewButton>
      ),
    },
    {
      title: 'MMG Logo',
      route: 'mmg-logo',
      filter: 'multimedia',
      subtitle: 'Animated logo',
      background: (
        <video src={videos.mmgLogoCover} poster={images.mmgLogoPlaceholder} />
      ),
      description: (
        <p>
          I animated the logo for Modern Music Guild, a club at Oberlin that
          brings experimental artists to campus for concerts and workshops. The
          MMG Logo is evocative of a sound wave. So I used canvas-sketch-util to
          generate noise which ripples the image, and used Canvas getImageData()
          and putImageData() to continually ripple the wave outwards.
        </p>
      ),
      content: (
        <iframe
          src='/works/mmg-logo/index.html'
          className='aspect-square w-full bg-white'
        />
      ),
    },
  ],
}
