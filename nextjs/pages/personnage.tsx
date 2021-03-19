import Head from 'next/head'
import { promises as fs } from 'fs'
import { CharacterForm } from '@components/character-form'
import styles from '../styles/Home.module.css'

export async function getStaticProps(context) {
  const content = await fs.readFile(`${process.env['DATA_DIR']}/world.json`, 'utf8')
  const world = JSON.parse(content);

  const races = [];
  for (const key in world) {
    if (world[key].type === 'race') {
      races.push(world[key]);
    }
  }

  const factions = [];
  for (const key in world) {
    if (world[key].type === 'faction') {
      factions.push(world[key]);
    }
  }

  const characterClasses = [];
  for (const key in world) {
    if (world[key].type === 'character-class') {
      characterClasses.push(world[key]);
    }
  }

  return {
    props: { races, factions, characterClasses }
  }
}

export default function Home(props) {
  return (
    <div className={styles.container}>
      <Head>
        <link href="https://fonts.googleapis.com/css?family=Spectral:400,500" rel="stylesheet" />
      </Head>
      <main className='container'>
        <CharacterForm traitsPoints={7} {...props} />
      </main>
    </div>
  )
}
