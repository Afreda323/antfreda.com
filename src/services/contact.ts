export interface Repo {
  id: string
  html_url: string
  description: string
  name: string
  language: string
  homepage: string
}

export interface Error {
  status: number
  message: string
}

export const submitContactForm = async (): Promise<Array<Repo> | Error> => {
  try {
    const res = await fetch(
      'https://gjv3pd3kck.execute-api.us-east-1.amazonaws.com/dev/sendMail',
      { method: 'POST' }
    )
    const json = await await res.json()
    return json
  } catch (e) {
    console.log(e)
    return e
  }
}
