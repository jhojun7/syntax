import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
// 1. next-translate의 useTranslation 함수 임포트
import useTranslation from 'next-translate/useTranslation'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  // 2. useTranslation 함수를 이용해 t 함수 취득
  const { t } = useTranslation()

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <main className={styles.main}>
          {/* 
            3. t 함수를 사용해서 화면상에 다국어 문구 대응 
              t함수를 사용할 때에는 어떤 언어 파일(common)의 어떤 단어(Japanese)를 사용할지 전달해야 한다.        
          */}
          <h2>{t('common:Japanese')}</h2>
          <h2>{t('common:English')}</h2>
          <h2>{t('common:Korean')}</h2>
        </main>
      </div>
    </>
  )
}
