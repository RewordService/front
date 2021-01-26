import React, {useState, useEffect} from "react"
import styled from "styled-components"
import Paper from "@material-ui/core/Paper"
import Box from "@material-ui/core/Box"
import Grid from "@material-ui/core/Grid"
import BoldTypography from "../components/BoldTypography"
//scripts
import {UserInfo} from "../Axios/UsersController"
import {Typography} from "@material-ui/core"

export default function UserProfile(props) {
  const [name, setName] = useState("")
  const [created_date, setCreatedDate] = useState("")
  const [total, setTotal] = useState(0)
  const [intro, setIntro] = useState("")
  useEffect(() => {
    UserInfo(props.id)
      .then(res => {
        setName(res.name)
        setCreatedDate(res.created_date)
        setIntro(res.intro)
        setTotal(res.rewords[0].total)
      })
      .catch(err => console.log(err))
  }, [props.id])
  return (
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
            <BoldTypography variant="subtitle1">プロフィール</BoldTypography>
          </Box>
        </Box>
        <Box textAlign="center">
          <Grid container>
            <Grid item xs={4}>
              <Typography variant="body1">ユーザー名</Typography>
              <BoldTypography>{name}</BoldTypography>
            </Grid>

            <Grid item xs={4}>
              <Typography variant="body1">Reword開始日</Typography>
              <BoldTypography>{created_date}</BoldTypography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1">トータルスコア</Typography>
              <BoldTypography>{total}</BoldTypography>
            </Grid>
            <Typography variant="body1">{intro}</Typography>
          </Grid>
        </Box>
      </Box>
    </Paper>
  )
}
