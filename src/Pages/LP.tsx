import React from "react"
import {Link} from "react-router-dom"
import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"
import Container from "@material-ui/core/Container"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import ForumIcon from "@material-ui/icons/Forum"
import BarChartIcon from "@material-ui/icons/BarChart"
import StorageIcon from "@material-ui/icons/Storage"
import styled from "styled-components"
import Color from "../Assets/Color"
import routes from "../constants/routes.json"

export default function LP() {
  return (
    <>
      <FirstBox display="flex" alignItems="center" height="100vh">
        <Container>
          <BoldTypography variant="h2" color="inherit">
            Reword
          </BoldTypography>
          <BoldTypography variant="h3" color="inherit">
            -ワーキングメモリーを鍛える-
          </BoldTypography>
          <BoldTypography variant="body1" color="inherit" gutterBottom>
            逆唱を行うことでワーキングメモリーを鍛えます。
            <br />
            会員登録を行うことで、試行回数、正答率などを記録し
            <br />
            グラフで確認することができます
          </BoldTypography>
          <AuthBtns />
        </Container>
      </FirstBox>

      <Box height="100vh" display="flex" alignItems="center">
        <Container>
          <Box mb={8}>
            <BoldTypography variant="h3" align="center">
              ワーキングメモリーとは?
            </BoldTypography>
          </Box>
          <BoldTypography variant="body1" align="center" gutterBottom>
            ワーキングメモリーとは
            <span style={{color: "red"}}>
              「短期記憶に存在する情報に対して処理を行う能力」
            </span>
            を指します。
          </BoldTypography>
          <BoldTypography variant="body1" align="center" gutterBottom>
            <br /> Rewordでは、
            <span style={{color: "blue"}}>
              「短期記憶に保持した文字列を逆から読み返すという処理」
            </span>
            を行います。
          </BoldTypography>
        </Container>
      </Box>

      <Box
        style={{background: "#2b2b2b", color: "white"}}
        display="flex"
        alignItems="center"
        height="100vh"
      >
        <Container>
          <Box mb={5}>
            <BoldTypography variant="h3" color="inherit" align="center">
              Reword
            </BoldTypography>
            <BoldTypography variant="body1" color="inherit" align="center">
              Rewordではワーキングメモリーを鍛えるサービスを提供します。
            </BoldTypography>
          </Box>
          <Grid container spacing={5}>
            <Grid item xs={12} lg={4}>
              <Box fontSize="60px" textAlign="center">
                <ForumIcon fontSize="inherit" />
              </Box>
              <BoldTypography variant="h5" align="center" gutterBottom>
                - 逆唱で鍛える -
              </BoldTypography>
              <Typography variant="body1" color="inherit">
                逆唱とは、ある文字列を提示された際、その文字列を反対から読み返すことを指します。
                <br />
                この処理を少しづつ負荷をかけながら継続をすることで鍛えることができます。
              </Typography>
            </Grid>

            <Grid item xs={12} lg={4}>
              <Box fontSize="60px" textAlign="center">
                <BarChartIcon fontSize="inherit" />
              </Box>
              <BoldTypography variant="h5" align="center" gutterBottom>
                - 成績をグラフ化 -
              </BoldTypography>
              <Typography variant="body1" color="inherit">
                会員登録を行うことで、成績をグラフ化し自分の成長を可視化することができます。
              </Typography>
            </Grid>

            <Grid item xs={12} lg={4}>
              <Box fontSize="60px" textAlign="center">
                <StorageIcon fontSize="inherit" />
              </Box>
              <BoldTypography variant="h5" align="center" gutterBottom>
                - データの蓄積 -
              </BoldTypography>
              <Typography variant="body1" color="inherit">
                正答数や正答率、試行回数、の他に生年月日や性別を入力することで。良質なデータを蓄積し皆様にお届けすることができます。
              </Typography>
            </Grid>
          </Grid>
          <AuthBtns />
        </Container>
      </Box>
    </>
  )
}
const AuthBtns = () => {
  return (
    <Box mt={5}>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={6}>
          <Button
            variant="contained"
            size="large"
            color="primary"
            fullWidth
            component={Link}
            to={routes.SIGNUP}
          >
            <BoldTypography variant="h4" color="inherit">
              会員登録
            </BoldTypography>
          </Button>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Button
            variant="outlined"
            size="large"
            color="inherit"
            fullWidth
            component={Link}
            to={routes.SIGNIN}
          >
            <BoldTypography variant="h4">ログイン</BoldTypography>
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

const FirstBox = styled(Box)`
  color: white;
  background: linear-gradient(90deg, ${Color.blue} 60%, ${Color.blue2});
`
const BoldTypography = styled(Typography)`
  font-weight: bold !important;
  letter-spacing: 5px !important;
`

const aaaaasContainer = styled.div`
  .fade-false {
    opacity: 0;
  }
  .fade-true {
    opacity: 1;
    transition: 2s ease;
  }
  span {
    &.red {
      color: ${Color.red};
    }
    &.blue {
      color: ${Color.blue};
    }
  }
  article {
    padding: 200px 10%;
    span,
    p,
    h1 {
      margin: 0;
      font-weight: bold;
      letter-spacing: 3px;
    }
  }
  article:first-child {
    background: linear-gradient(90deg, ${Color.blue} 60%, ${Color.blue2});
    section {
      padding: 30px;
      margin-bottom: 30px;
    }
    p,
    h1 {
      color: white;
    }
    h1 {
      font-size: 50px;
    }
  }
  article:nth-child(2) {
    padding: 300px 0;
    text-align: center;
    section {
      h1 {
        margin-bottom: 50px;
        text-align: center;
        font-size: 50px;
        color: #2b2b2b;
      }
      p {
        margin-bottom: 15px;
      }
      span {
        font-size: 17px;
      }
    }
  }
  article:last-child {
    position: relative;
    background: #2b2b2b;
    text-align: center;
    margin-bottom: -30px;
    section {
      padding: 30px;
      p,
      h1 {
        color: white;
      }
      h1 {
        margin-bottom: 50px;
        text-align: center;
        font-size: 50px;
      }
      .row {
        display: flex;
        justify-content: space-around;
      }
    }
  }
  @media screen and (max-width: 1000px) {
    .subtitle {
      font-size: 22px;
    }
    .row {
      flex-direction: column;
      align-items: center;
    }
  }
`
