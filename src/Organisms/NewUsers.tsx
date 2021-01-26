import React, {useState, useEffect} from "react"
import Box from "@material-ui/core/Box"
import Paper from "@material-ui/core/Paper"
import PersonAddIcon from "@material-ui/icons/PersonAdd"
import BoldTypography from "../components/BoldTypography"
import {newUsers} from "../Axios/UsersController"
import MiniCard from "../Molecules/MiniCard"
interface IUser {
  id: number
  name: string
  image: {url: string}
}
export default function NewUsers() {
  const [users, setUsers] = useState<IUser[]>([])
  useEffect(() => {
    newUsers().then(res => {
      setUsers(res.data)
    })
  }, [])
  return (
    <Box pb={3}>
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
              <PersonAddIcon />
              <BoldTypography variant="h5">新規ユーザー</BoldTypography>
            </Box>
          </Box>
          {users.map(user => {
            return (
              <MiniCard
                className="card"
                key={user.id}
                id={user.id}
                name={user.name}
                url={user.image.url}
              />
            )
          })}
        </Box>
      </Paper>
    </Box>
  )
}
