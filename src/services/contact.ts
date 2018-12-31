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

export interface Form {
  name: string
  email: string
  message: string
}

/**
 * Submit form to lambda
 * @param body - Form body
 */
export const submitContactForm = async (
  body: Form
): Promise<Array<Repo> | Error> => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch(
        'https://gjv3pd3kck.execute-api.us-east-1.amazonaws.com/dev/sendMail',
        { method: 'POST', body: JSON.stringify(body) }
      )

      if (!res.ok) {
        const json = await res.json()
        reject(json)
      }

      const json = await res.json()
      resolve(json)
    } catch (e) {
      reject({ message: 'Something went wrong, please try again later.' })
    }
  })
}
