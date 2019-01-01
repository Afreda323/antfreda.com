interface Color {
  color: string
}

interface Colors {
  [key: string]: Color
}
const colors: Colors = {
  'Jupyter Notebook': {
    color: '#DA5B0B'
  },

  JavaScript: {
    color: '#f1e05a'
  },

  TypeScript: {
    color: '#2b7489'
  },

  'C#': {
    color: '#178600'
  },
  'C++': {
    color: '#f34b7d'
  },

  Go: {
    color: '#375eab'
  },

  Vue: {
    color: '#2c3e50'
  },
  Elm: {
    color: '#60B5CC'
  },
  Dart: {
    color: '#00B4AB'
  }
}

/**
 * Get the github language color for language
 * @param lang - language string to get color for
 */
export function getColor(lang: string): string {
  return colors[lang] ? colors[lang].color : '#fff'
}
