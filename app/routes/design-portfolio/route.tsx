import parse from 'style-to-object'
import Card from '~/components/Card'
import ImageGrid from '~/components/ImageGrid'
import Section from '~/components/Section'
import img from './assets/img'

export default function DesignStory() {
  return (
    <div className='bg-white p-4 text-black child:max-w-none'>
      <div className='w-full text-center'>
        <h2 className='text-5xl font-bold'>Joshua Tazman Reinier</h2>
        <h3 className='text-xl'>digital designer</h3>
      </div>
      <Section title='Video Production'>
        <ImageGrid
          className='justify-center child:aspect-video child:flex-none'
          srcs={[
            <iframe
              className='aspect-video h-full'
              src='https://www.youtube.com/embed/reXPIl8gee8'
              title='YouTube video player'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              allowFullScreen
            ></iframe>,

            <iframe
              src='https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Foberlincon%2Fvideos%2F945376743272285%2F&show_text=true&width=560&t=0'
              className='h-full w-full'
              style={parse('border:none;overflow:hidden')}
              allow='autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share'
              allowFullScreen
            ></iframe>,

            <iframe
              className='h-full w-full'
              src='https://www.youtube.com/embed/d7bWs6AA8lw'
              title='YouTube video player'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              allowFullScreen
            ></iframe>,
          ]}
        />
      </Section>
      <Section title='Graphics & Social Media'>
        <ImageGrid
          childClassName='child:child:object-contain'
          srcs={[
            img.auroraNealand,
            img.kojiroUmezaki,
            img.luisPerdomo,
            img.nicoleMitchell,
            img.day1,
            img.day2,
            img.studentShowcase,
            img.andMore,
            img.candideBannerImg,
            img.candidePosterImg,
          ]}
        />
      </Section>
      <Section title='Documentation & Promotion'>
        <ImageGrid
          srcs={[
            img.mitchellTalk,
            img.panelAll,
            img.panel1,
            img.panel2,
            img.panel3,
          ]}
        />
      </Section>
      <Section
        title='articles & journalism'
        columns
        innerClassName='flex flex-wrap child:h-[300px] child:my-2 child:grow'
      >
        <Card
          className='h-full'
          bg={img.conPro}
          href='https://www.oberlin.edu/news/take-it-granted'
          title='Take It For Granted'
          caption='Internal funding opportunities—along with the practiced guidance of professional development faculty and staff—help Oberlin Conservatory students bring their projects and ambitions to life.'
        />
        <Card
          bg={img.cohn}
          title='Conducting at Oberlin'
          caption="Oberlin's conducting program has produced distinguished alumni as well as up-and-coming names including Maurice Cohn '17."
          href='https://www.oberlin.edu/news/conducting-oberlin'
        />
        <Card
          bg={img.aliceTierney}
          title='Oberlin Opera Theater Presents World Premiere of "Alice Tierney" Jan. 27-29'
          caption='"Alice Tierney" excavates the stories we tell about the past, and gives students a unique Winter Term opportunity to develop an opera from the ground up, as well as the opportunity to take the show on the road.'
          href='https://www.oberlin.edu/news/oberlin-opera-theater-presents-world-premiere-alice-tierney-jan-27-29-0'
        />
        <Card
          className='aspect-square h-full'
          bg={img.candide}
          title='Oberlin Opera Theater Presents "Candide" March 9-12'
          caption='This production marks the final main stage performances at Oberlin by retiring director Jonathon Field.'
          href='https://www.oberlin.edu/news/oberlin-opera-theater-presents-candide-march-9-12'
        />
        <Card
          bg={img.djembe}
          title='A New Kind of Orchestra at Oberlin'
          caption='This fall, Weedie Braimah started a new Djembe Orchestra, in which students learn the history and music of the Djembe from the 12th century to the present day.'
          href='https://www.oberlin.edu/news/new-kind-orchestra-oberlin'
        />
        <iframe
          height='300'
          allow='autoplay'
          src='https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1580653939&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true'
        ></iframe>
      </Section>
      <Section
        fullWidth
        title='Window Into Oberlin'
        innerClassName='flex overflow-x-auto space-x-2 child:flex-none justify-center'
      >
        {[
          'https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Foberlincon%2Fvideos%2F794079705479631%2F&show_text=false&width=267&t=0',
          'https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Foberlincon%2Fvideos%2F406293638383073%2F&show_text=false&width=264&t=0',
          'https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Foberlincon%2Fvideos%2F6187315761282772%2F&show_text=false&width=267&t=0',
          'https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Foberlincon%2Fvideos%2F654623079547833%2F&show_text=false&width=267&t=0',
          'https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Foberlincon%2Fvideos%2F1038335536835166%2F&show_text=false&width=265&t=0',
          'https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Foberlincon%2Fvideos%2F659438095901794%2F&show_text=false&width=264&t=0',
          'https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Foberlincon%2Fvideos%2F643783310592856%2F&show_text=false&width=265&t=0',
          'https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Foberlincon%2Fvideos%2F682994749816760%2F&show_text=false&width=476&t=0',
          'https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Foberlincon%2Fvideos%2F162657396363154%2F&show_text=false&width=267&t=0',
        ].map((src) => (
          <iframe
            key={src}
            src={src}
            width='267'
            height='476'
            style={parse('border:none;overflow:hidden')}
            allow='autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share'
            allowFullScreen
          ></iframe>
        ))}
      </Section>
    </div>
  )
}
