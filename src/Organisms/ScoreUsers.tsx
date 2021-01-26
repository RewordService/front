import React, {useState, useEffect} from "react"
import Box from "@material-ui/core/Box"
import Paper from "@material-ui/core/Paper"
import EqualizerIcon from "@material-ui/icons/Equalizer"
import BoldTypography from "../components/BoldTypography"
import {totalUsers} from "../Axios/UsersController"
import MiniCard from "../Molecules/MiniCard"

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
