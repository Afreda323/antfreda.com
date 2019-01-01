import React from 'react'
import Button from './Button'

const RESUME = '/docs/Resume.pdf'

function ResumeLink() {
  return <Button onClick={() => window.open(RESUME)}>Resume</Button>
}

export default ResumeLink
