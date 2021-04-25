import Head from 'next/head'
import { promises as fs } from 'fs'
import { ProfileForm } from '@components/profile-form'
import styles from '../styles/Home.module.css'

export default function Home(props) {
  return (
    <div className={styles.container}>
      <Head>
        <link href="https://fonts.googleapis.com/css?family=Spectral:400,500" rel="stylesheet" />
      </Head>
      <main className='container'>
        <ProfileForm {...props} />
      </main>
    </div>
  )
}
