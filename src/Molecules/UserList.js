import React from "react"
import styled from "styled-components"
import img from "../Assets/Img/defaultimg.png"
import {withRouter} from "react-router-dom"

function UserList(props) {
  function onClick() {
    props.history.push({
      pathname: "Account/" + props.id,
    })
  }
  return (
    <Container onClick={onClick}>
      <img
        src={"https://rewordbackend.herokuapp.com/" + props.url}
        alt=""
        height="60"
        width="60"
        onError={e => (e.target.src = img)}
      />
      <p>{props.name}</p>
    </Container>
  )
}

const Container = styled.div`
  width: 300px;
  margin: 2px auto;
  padding: 3px;

  border: solid 1px #bababa;
  background: white;

  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
  p {
    text-align: center;
  }
`

export default withRouter(UserList)
