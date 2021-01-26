import React, {useState, useEffect} from "react"
import styled from "styled-components"
import Box from "@material-ui/core/Box"
import Paper from "@material-ui/core/Paper"
import EqualizerIcon from "@material-ui/icons/Equalizer"
import BoldTypography from "../components/BoldTypography"
import Color from "../Assets/Color"
//scripts
import {totalUsers} from "../Axios/UsersController"
//partials
import MiniCard from "../Molecules/MiniCard"
import {FlexJustify} from "../Atom/FlexJustify"

interface IUser {
  id: number
  name: string
  image: {url: string}
}
export default function TotalUsers() {
  const [users, setUsers] = useState<IUser[]>([])
  useEffect(() => {
    totalUsers().then(res => {
      setUsers(res.data)
    })
  }, [])

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
            <EqualizerIcon />
            <BoldTypography variant="h5">スコアランキング</BoldTypography>
          </Box>
        </Box>
        {users.map((user, i) => {
          return (
            <div key={user.id} style={{margin: "0", textAlign: "center"}}>
              {i < 3 ? (
                <i className="fas fa-crown" />
              ) : (
                <i className="fas fa-thumbs-up" />
              )}
              <h3 style={{margin: "0"}}>{i + 1}位</h3>
              <MiniCard id={user.id} name={user.name} url={user.image.url} />
            </div>
          )
        })}
      </Box>
    </Paper>
  )
}

const Container = styled(FlexJustify)`
  justify-content: start;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    height: 10px;
  }
  ::-webkit-scrollbar-track {
    　　background: #eee;
    　　border-left: solid 1px #ececec;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    　　background: ${Color.blue};
    　　border-radius: 10px;
    　　box-shadow: inset 0 0 0 2px #fff;
  }
  div:first-child > i {
    color: ${Color.gold};
  }
  div:nth-child(2) > i {
    color: ${Color.silver};
  }
  div:nth-child(3) > i {
    color: ${Color.bronze};
  }
  i {
    color: ${Color.blue};
  }
`
