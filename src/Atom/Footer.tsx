import React from "react"
import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import {Link} from "react-router-dom"
import styled from "styled-components"
import Color from "../Assets/Color"
import routes from "../constants/routes.json"

export default function Footer() {
  return (
    <Box
      width="100%"
      bgcolor="primary.main"
      color="primary.contrastText"
      py={4}
      textAlign="center"
    >
      <Button color="inherit" component={Link} to={routes.POLICY}>
        プライバシーポリシー
      </Button>
      <Button color="inherit" component={Link} to={routes.CONTACT}>
        お問い合わせ
      </Button>
      <Typography variant="body1" color="inherit">
        © 2020 Reword
      </Typography>
    </Box>
  )
}

const Container = styled.footer`
	width: 100%;
	background: ${Color.blue};
	margin: 0;
	padding 40px 0;
	text-align: center;
	p{
		color: white;
		font-size: 12px;
	}
	a{
		display: inline;
		margin:0 20px;
		font-size: 12px;
		color: white;
		&:hover{
			text-decoration: underline;
		}
	}
`
