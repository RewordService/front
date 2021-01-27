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
import { GamePost } from '../Axios/GamePost';
import { IsSignedIn } from '../Axios/UsersController';
import SlideBar from '../Organisms/SlideBar';

const Game: React.FC = () => (
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
  const ary = [];
  const str =
    'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよわをん';
  for (let i = 0; i < wordCount; i + 1) {
    ary.push(str.charAt(Math.floor(Math.random() * str.length)));
  }
  return ary;
};

const wait = (sec: number) =>
  new Promise((resolve) => {
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
  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setSubmitString(e.target.value);
  const handleAnswer = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      let status = '';
      if (submitString === answerString) {
        setScreenString(SUCESS);
        status = '_success';
      } else {
        setScreenString(FAIL);
      }
      if (IsSignedIn()) GamePost(wordCount, status);
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
          onKeyDown={handleAnswer}
        />
      )}
    </Box>
  );
};

export default Game;
