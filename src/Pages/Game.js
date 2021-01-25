import React from "react"
import ReactDOM from "react-dom"
import styled from "styled-components"
import {withRouter} from "react-router-dom"
//script
import {GamePost} from "../Axios/GamePost"
import {IsSignedIn} from "../Axios/UsersController"
//partials
import {Content} from "../Atom/Content"
import {FlexJustify} from "../Atom/FlexJustify"
import {Section} from "../Atom/Section"
import SlideBar from "../Organisms/SlideBar"

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      preview: "Push Start",
      answer: "",
      resolve: "",
      count: 2,
    }
  }

  randomJPString = async num => {
    document.getElementById("startbtn").style.display = "none"
    document.getElementById("count").style.display = "none"
    let string = "_total"
    if (IsSignedIn()) GamePost(num, string)
    const str =
      "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよわをん"
    let preview = "",
      resolve = ""

    const wait = sec => {
      return new Promise((resolve, reject) => {
        setTimeout(resolve, sec * 1000)
      })
    }

    for (let i = 0; i < num; i++) {
      preview = str.charAt(Math.floor(Math.random() * str.length))
      resolve += preview
      this.setState({preview: preview, resolve: resolve})
      await wait(0.8)
    }

    this.setState({preview: ""})

    const element = (
      <AnswerForm>
        <AnswerInput
          type="text"
          onChange={e => this.setState({answer: e.target.value})}
        />
        <AnswerBtn
          type="button"
          value="answer"
          onClick={() => this.AnswerCheck(this.state.count)}
        />
      </AnswerForm>
    )
    try {
      ReactDOM.render(element, document.getElementById("answer"))
    } catch {
      console.log("途中で投げ出すなよ....")
    }
  }

  reverseString = str => {
    return str.split("").reverse().join("")
  }

  AnswerCheck = num => {
    let element = null
    if (this.state.answer === this.reverseString(this.state.resolve)) {
      const string = "_success"
      if (localStorage.Reword) GamePost(num, string)
      element = <p>success</p>
    } else {
      element = <p>fail</p>
    }
    ReactDOM.render(element, document.getElementById("answer"))
    document.getElementById("startbtn").style.display = "inline"
    document.getElementById("count").style.display = "block"
  }

  calcInclement = () => {
    let sum = this.state.count
    if (this.state.count < 10) sum += +1
    this.setState({count: sum})
  }
  calcDeclement = () => {
    let sum = this.state.count
    if (this.state.count > 2) sum += -1
    this.setState({count: sum})
  }

  render() {
    return (
      <>
        <div>
          <SlideBar />
        </div>
        <Container>
          <ContentEx>
            <h3>Reword</h3>

            <Screen>
              <h2>{this.state.preview}</h2>
            </Screen>
            <div id="answer"></div>

            <CountUI id="count">
              <CalcBtn
                type="button"
                value="+"
                id="increment"
                onClick={this.calcInclement}
              />
              <CountNum>{this.state.count}</CountNum>
              <CalcBtn
                type="button"
                value="-"
                id="decrement"
                onClick={this.calcDeclement}
              />
            </CountUI>
            <StartBtn
              id="startbtn"
              type="button"
              value="START"
              onClick={() => this.randomJPString(this.state.count)}
            />
          </ContentEx>
        </Container>
        <Content>
          <Section className="margin-none">
            <h2>遊び方</h2>
            <p>
              1. ランダムな文字列が提示されます。その文字列を記憶しましょう。
            </p>
            <p>例) リワード</p>
            <p>
              2.
              記憶した文字列を、反対から読み返しましょう。(メモなどはしないでください)
            </p>
            <p>例) ドーワリ</p>
            <p>
              提示された文字列を逆から読み返したものをAnswerの中に回答しましょう。
            </p>
            <p>例) 回答はドーワリ</p>
          </Section>
        </Content>
      </>
    )
  }
}
const Container = styled(FlexJustify)`
  @media screen and (max-width: 750px) {
    .pc {
      display: none;
    }
  }
`
const ContentEx = styled(Content)`
  text-align: center;
  width: 300px;
`
const Screen = styled.div`
  padding: 100px;
`
const CountUI = styled.div`
  jusity-content: center;
  input {
    display: inline;
  }
  p {
    display: inline;
  }
`
const CalcBtn = styled.input`
  padding: 5px 10px;
  font-size: 18px;
  font-weight: bold;
  color: #bababa;
  border: solid 1px #bababa;
`
const CountNum = styled.p`
  font-size: 18px;
  padding: 5px 10px;
  border-top: solid 1px #bababa;
  border-bottom: solid 1px #bababa;
`
const AnswerBtn = styled.input`
  font-size: 18px;
  background: #ff6161;
  border: solid 1px #ff6161;
  color: white;
  padding: 5px 10px;
  cursor: pointer;
`
const AnswerInput = styled.input`
  font-size: 18px;
  border: solid 1px #ff6161;
  padding: 5px 10px;
`
const AnswerForm = styled.div`
  margin: 10px auto;
`
const StartBtn = styled.input`
  font-size: 18px;
  padding: 5px 10px;
  margin: 10px;
  cursor: pointer;
  border: solid 1px #79bac1;
  color: #79bac1;
`

export default withRouter(Game)
