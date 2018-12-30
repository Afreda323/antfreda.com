import React from 'react'
import styled from 'styled-components'
import { H4, P, Ul, Li } from './Text';

interface State {
  activeIndex: number
}

class Timeline extends React.Component<{}, State> {
  state = {
    activeIndex: 0
  }

  /**
   * Update the timeline card that is currently displayed
   * @param i - The index you want selected
   */
  updateIndex = (i: number) => {
    this.setState({ activeIndex: i })
  }

  render() {
    return <Wrapper>
        {/* <Companies>
            <P>Bank of America</P>
        </Companies>
        <Summary>
            <P>Assistant Vice President; Software Engineer</P>
            <P>Jan 2018 – Now</P>
            <Ul>
            <Li>Developed workflow automation web applications for internal Info-Security teams </Li>
<Li>Worked closely with costumers to ensure timely product delivery </Li>
<Li>Architected front end application scaffold/pipeline and UI component library </Li>
<Li>Led development of Mattermost(Enterprise Slack Alternative) and Email integrations in </Li>
client side applications. 
<Li>Architected application state using React Context, Redux and Redux Saga </Li>
<Li>Developed Backend APIs using Koa and mySQL</Li>
            </Ul>
        </Summary> */}
    </Wrapper>
  }
}

const Wrapper = styled.div``
const Companies = styled.div``
const Company = styled.div``
const Summary = styled.div``

export default Timeline
