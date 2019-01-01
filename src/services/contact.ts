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
 * Make sure name is less than 50 chars and more than 3
 * @param name - String you want to validate
 */
function validateName(name: string): boolean {
  return name.length > 3 && name.length < 50
}

/**
 * Make sure email fits email regex
 * @param email - String you want to validate
 */
function validateEmail(email: string): boolean {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

/**
 * Make sure message is less than 300 chars and more than 3
 * @param message - String you want to validate
 */
function validateMessage(message: string): boolean {
  return message.length > 3 && message.length < 300
}

/**
 * Submit form to lambda
 * @param body - Form body
 */
export const submitContactForm = async (
  body: Form
): Promise<Array<Repo> | Error> => {
  return new Promise(async (resolve, reject) => {
    const { name, email, message } = body
    if (!validateEmail(email)) reject({ message: 'Invalid email provided.' })
    if (!validateName(name)) reject({ message: 'Invalid name provided.' })
    if (!validateMessage(message))
      reject({ message: 'Invalid message provided.' })

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
