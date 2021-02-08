import React, { useState, KeyboardEvent, ChangeEvent, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import BoldTypography from '../components/BoldTypography';
import Section from '../components/Section';
import SlideBar from '../Organisms/SlideBar';
import { selectCurrentUser, selectHeaders } from '../slices/currentUser';

const randomJPString = (wordCount: number) => {
  const JP =
    'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよわをん';
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  return [...Array(wordCount)].map(
    () => JP[Math.floor(Math.random() * JP.length)]
  );
};

const wait = (sec: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, sec * 1000);
  });

const Game: React.FC = () => (
  <>
    <SlideBar />
    <Screen />
    <Description />
  </>
);
interface IGameInfo {
  gameInfo: {
    ranking: number;
    score: number;
  };
}
const GameInfo: React.FC<IGameInfo> = ({
  gameInfo: { ranking, score },
}: IGameInfo) => (
  <Container>
    <Box mb={5}>
      <Section title={<BoldTypography variant="h5">ゲーム情報</BoldTypography>}>
        <Grid container>
          <Grid item xs={6}>
            <Box
              border={1}
              borderTop={0}
              borderLeft={0}
              borderBottom={0}
              borderColor="text.disabled"
              textAlign="center"
              py={5}
            >
              <Typography variant="body1">順位</Typography>
              <BoldTypography variant="h4">{ranking}</BoldTypography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box textAlign="center" py={5}>
              <Typography variant="body1">スコア</Typography>
              <BoldTypography variant="h4">{score}</BoldTypography>
            </Box>
          </Grid>
        </Grid>
      </Section>
    </Box>
  </Container>
);
const Description = () => (
  <Container>
    <Box mb={5}>
      <Section title={<BoldTypography variant="h5">遊び方</BoldTypography>}>
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
      </Section>
    </Box>
  </Container>
);

const Screen = () => {
  const SUCESS = 'Success!';
  const FAIL = 'Fail...';
  const [screenState, setScreenState] = useState<
    'start' | 'question' | 'answer' | 'end'
  >('start');
  const [gameInfo, setGameInfo] = useState({ ranking: 0, score: 0 });
  const [wordCount, setWordCount] = useState(2);
  const [screenString, setScreenString] = useState('PushStart');
  const [answerString, setAnswerString] = useState('');
  const [submitString, setSubmitString] = useState('');
  const currentUser = useSelector(selectCurrentUser);
  const headers = useSelector(selectHeaders);
  const handleIncrement = () => setWordCount(wordCount + 1);
  const handleDecrement = () => setWordCount(wordCount - 1);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setSubmitString(e.target.value);
  const handleAnswer = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      let result;
      if (submitString === answerString) {
        result = 'success';
        setScreenString(SUCESS);
      } else {
        result = 'fail';
        setScreenString(FAIL);
      }
      if (currentUser && headers) {
        axios
          .put('/user/reword', { count: wordCount, result }, headers)
          .then((res) => setGameInfo(res.data))
          .catch((err: AxiosError) => err);
      }
      setScreenState('end');
    }
  };
  const handleQuestion = async () => {
    setScreenState('question');
    const JPString = randomJPString(wordCount);
    for (let i = 0; i < JPString.length; i += 1) {
      setScreenString(JPString[i]);
      // eslint-disable-next-line no-await-in-loop
      await wait(0.8);
    }
    setScreenString('');
    setAnswerString(JPString.reverse().join(''));
    setScreenState('answer');
  };
  useEffect(() => {
    if (!headers) return;
    axios
      .get('/user/reword', headers)
      .then((res) => setGameInfo(res.data))
      .catch((err: AxiosError) => err);
  }, [headers]);

  return (
    <>
      {currentUser?.id && <GameInfo gameInfo={gameInfo} />}
      <Container maxWidth="xs">
        <Section title={<BoldTypography variant="h6">Reword</BoldTypography>}>
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
                <Button
                  color="primary"
                  variant="outlined"
                  onClick={handleQuestion}
                >
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
        </Section>
      </Container>
    </>
  );
};

export default Game;
