import React, { useState, KeyboardEvent, ChangeEvent } from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import TextField from '@material-ui/core/TextField';
import BoldTypography from '../components/BoldTypography';
// script
// import { GamePost } from '../Axios/GamePost';
// import { IsSignedIn } from '../Axios/UsersController';
import SlideBar from '../Organisms/SlideBar';

const Game = () => (
  <>
    <SlideBar />
    <Container maxWidth="xs">
      <Box mt={5}>
        <Paper>
          <Box height={500} p={2}>
            <Box
              border={5}
              borderTop={0}
              borderRight={0}
              borderBottom={0}
              borderColor="primary.main"
            >
              <Box
                display="flex"
                alignItems="center"
                border={1}
                borderTop={0}
                borderLeft={0}
                borderRight={0}
                borderColor="text.disabled"
                pl={4}
              >
                <BoldTypography variant="h6">Reword</BoldTypography>
              </Box>
            </Box>
            <Screen />
          </Box>
        </Paper>
      </Box>
    </Container>
    <Container>
      <Box my={5}>
        <Paper>
          <Box p={2}>
            <Box
              border={5}
              borderTop={0}
              borderRight={0}
              borderBottom={0}
              borderColor="primary.main"
            >
              <Box
                display="flex"
                alignItems="center"
                border={1}
                borderTop={0}
                borderLeft={0}
                borderRight={0}
                borderColor="text.disabled"
                pl={4}
              >
                <BoldTypography variant="h5">遊び方</BoldTypography>
              </Box>
            </Box>
            <Typography>
              1. ランダムな文字列が提示されます。その文字列を記憶しましょう。
              <br />
              <br />
              例) リワード
              <br />
              <br />
              2.
              記憶した文字列を、反対から読み返しましょう。(メモなどはしないでください)
              <br />
              <br />
              例) ドーワリ
              <br />
              <br />
              3.
              提示された文字列を逆から読み返したものをAnswerの中に回答しましょう。
              <br />
              <br />
              例) 回答はドーワリ
            </Typography>
            <p />
          </Box>
        </Paper>
      </Box>
    </Container>
  </>
);

const randomJPString = (wordCount: number) => {
  const ary: string[] = [];
  const str = 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよわをん';
  for (let i = 0; i < wordCount; i + 1) {
    ary.push(str.charAt(Math.floor(Math.random() * str.length)));
  }
  return ary;
};

const wait = (sec: number) => new Promise((resolve) => {
  setTimeout(resolve, sec * 1000);
});

const Screen = () => {
  const SUCESS = 'Success!';
  const FAIL = 'Fail...';
  const [screenState, setScreenState] = useState<
    'start' | 'question' | 'answer' | 'end'
  >('start');
  const [wordCount, setWordCount] = useState(2);
  const [screenString, setScreenString] = useState('PushStart');
  const [answerString, setAnswerString] = useState('');
  const [submitString, setSubmitString] = useState('');
  const handleIncrement = () => setWordCount(wordCount + 1);
  const handleDecrement = () => setWordCount(wordCount - 1);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setSubmitString(e.target.value);
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (submitString === answerString) {
        setScreenString(SUCESS);
      } else {
        setScreenString(FAIL);
      }
      setScreenState('end');
    }
  };
  const handleQuestion = async () => {
    setScreenState('question');
    const string = randomJPString(wordCount);
    for (let i = 0; i < string.length; i + 1) {
      setScreenString(string[i]);
      // eslint-disable-next-line no-await-in-loop
      await wait(0.8);
    }
    setAnswerString(string.reverse().join(''));
    setScreenString('');
    setScreenState('answer');
  };

  return (
    <Box position="relative">
      <Box
        height={350}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <BoldTypography
          color={
            // eslint-disable-next-line no-nested-ternary
            screenString === SUCESS
              ? 'primary'
              : screenString === FAIL
                ? 'secondary'
                : 'initial'
          }
          variant="h3"
        >
          {screenString}
        </BoldTypography>
      </Box>
      {(screenState === 'start' || screenState === 'end') && (
        <Box textAlign="center">
          <Box mb={2}>
            <ButtonGroup>
              <Button
                disabled={wordCount >= 10}
                onClick={handleIncrement}
                startIcon={<AddIcon />}
              />
              <Button>
                <BoldTypography variant="h5">{wordCount}</BoldTypography>
              </Button>
              <Button
                disabled={wordCount <= 2}
                onClick={handleDecrement}
                endIcon={<RemoveIcon />}
              />
            </ButtonGroup>
          </Box>
          <Button color="primary" variant="outlined" onClick={handleQuestion}>
            <BoldTypography variant="h5">START</BoldTypography>
          </Button>
        </Box>
      )}
      {screenState === 'answer' && (
        <TextField
          color="secondary"
          variant="outlined"
          label="Answer"
          fullWidth
          onChange={handleChange}
          onKeyDown={handleKeyPress}
        />
      )}
    </Box>
  );
};
// class Game extends React.Component {
// constructor(props) {
// super(props)
// this.state = {
// preview: "Push Start",
// answer: "",
// resolve: "",
// count: 2,
// }
// }

// randomJPString = async num => {
// document.getElementById("startbtn").style.display = "none"
// document.getElementById("count").style.display = "none"
// let string = "_total"
// if (IsSignedIn()) GamePost(num, string)
// const str =
// "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよわをん"
// let preview = "",
// resolve = ""

// const wait = sec => {
// return new Promise((resolve, reject) => {
// setTimeout(resolve, sec * 1000)
// })
// }

// for (let i = 0; i < num; i++) {
// preview = str.charAt(Math.floor(Math.random() * str.length))
// resolve += preview
// this.setState({preview: preview, resolve: resolve})
// await wait(0.8)
// }

// this.setState({preview: ""})

// const element = (
// <AnswerForm>
// <AnswerInput
// type="text"
// onChange={e => this.setState({answer: e.target.value})}
/// >
// <AnswerBtn
// type="button"
// value="answer"
// onClick={() => this.AnswerCheck(this.state.count)}
/// >
// </AnswerForm>
// )
// try {
// ReactDOM.render(element, document.getElementById("answer"))
// } catch {
// console.log("途中で投げ出すなよ....")
// }
// }

// reverseString = str => {
// return str.split("").reverse().join("")
// }

// AnswerCheck = num => {
// let element = null
// if (this.state.answer === this.reverseString(this.state.resolve)) {
// const string = "_success"
// if (localStorage.Reword) GamePost(num, string)
// element = <p>success</p>
// } else {
// element = <p>fail</p>
// }
// ReactDOM.render(element, document.getElementById("answer"))
// document.getElementById("startbtn").style.display = "inline"
// document.getElementById("count").style.display = "block"
// }

// calcInclement = () => {
// let sum = this.state.count
// if (this.state.count < 10) sum += +1
// this.setState({count: sum})
// }
// calcDeclement = () => {
// let sum = this.state.count
// if (this.state.count > 2) sum += -1
// this.setState({count: sum})
// }

// render() {
// return (
// <>
// <div>
// <SlideBar />
// </div>
// <Container>
// <ContentEx>
// <h3>Reword</h3>

// <Screen>
// <h2>{this.state.preview}</h2>
// </Screen>
// <div id="answer"></div>

// <CountUI id="count">
// <CalcBtn
// type="button"
// value="+"
// id="increment"
// onClick={this.calcInclement}
/// >
// <CountNum>{this.state.count}</CountNum>
// <CalcBtn
// type="button"
// value="-"
// id="decrement"
// onClick={this.calcDeclement}
/// >
// </CountUI>
// <StartBtn
// id="startbtn"
// type="button"
// value="START"
// onClick={() => this.randomJPString(this.state.count)}
/// >
// </ContentEx>
// </Container>
// <Content>
// <Section className="margin-none">
// <h2>遊び方</h2>
// <p>
// 1. ランダムな文字列が提示されます。その文字列を記憶しましょう。
// </p>
// <p>例) リワード</p>
// <p>
// 2.
// 記憶した文字列を、反対から読み返しましょう。(メモなどはしないでください)
// </p>
// <p>例) ドーワリ</p>
// <p>
// 提示された文字列を逆から読み返したものをAnswerの中に回答しましょう。
// </p>
// <p>例) 回答はドーワリ</p>
// </Section>
// </Content>
// </>
// )
// }
// }
export default Game;
