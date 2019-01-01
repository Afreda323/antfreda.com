export interface Repo {
  id: string
  html_url: string
  description: string
  name: string
  language: string,
  homepage: string,
}

/**
 * Fetch my profile from github
 */
export const fetchGithubProfile = async (): Promise<Array<Repo>> => {
  try {
    const res = await fetch(
      'https://api.github.com/users/Afreda323/repos?sort=created&direction=desc'
    )
    const json = await await res.json()
    return json.slice(0, 21)
  } catch (e) {
    throw Error(e)
  }
}
