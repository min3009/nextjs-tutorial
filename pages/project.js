import Layout from '@/components/layout'
import Head from 'next/head'
import { TOKEN, DATABASE_ID } from '@/config'

export default function Project({ projectNames, projects }) {
  console.log(projectNames)
  return (
    <Layout>
      <Head>
        <title>코딩 포트폴리오</title>
        <meta name="description" content="빡코딩"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>총 프로젝트: {projects.results.length}</h1>
      {projectNames.map((names) => (
        <h1>{names}</h1>
      )
    )}
    </Layout>
  )
}

export async function getStaticProps() {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Notion-Version': '2022-06-28',
      'content-type': 'application/json',
      Authorization: `${TOKEN}`
    },
    body: JSON.stringify({ page_size: 100 })
  }

  const res = await fetch(
    `
    https://api.notion.com/v1/databases/${DATABASE_ID}/query`,
    options
  )
  const projects = await res.json()

  const projectNames = projects.results.map(
    aProject => aProject.properties.이름.title[0].plain_text
  )

  return {
    props: { projectNames,projects }
  }
}
