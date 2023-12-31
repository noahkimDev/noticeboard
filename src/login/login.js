import "./login.css";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [writtenEmail, setWrittenEmail] = useState("");
  const [writtenPw, setWrittenPw] = useState("");

  async function jwtLoginSubmit() {
    await axios
      .post(
        "http://localhost:8000/auth/jwtLogin",
        {
          email: writtenEmail,
          pw: writtenPw,
        },
        {
          withCredentials: true,
        }
      ) //
      .then((data) => {
        console.log(data);
        if (data.data !== "실패") navigate("/");
        else {
          alert(`로그인 실패`);
        }
      }) //
      .catch((err) => {
        console.error(err);
        alert("Invalid information");
      });
  }

  async function sessionLoginSubmit() {
    await axios
      .post(
        "http://localhost:8000/auth/sessionLogin",
        {
          email: writtenEmail,
          pw: writtenPw,
        },
        {
          withCredentials: true,
        }
      ) //
      .then((data) => {
        console.log("로그인직후", data);
        navigate("/");
      })
      .catch((err) => {
        alert("Invalid information");
        console.error(err);
      });
  }

  async function cookieLoginSubmit() {
    await axios
      .post(
        "http://localhost:8000/auth/cookieLogin",
        { email: writtenEmail, pw: writtenPw },
        {
          withCredentials: true,
        }
      ) //
      .then((data) => {
        if (data.data === "success") {
          navigate("/");
        }
        if (data.data === "fail") {
          console.log(data.data);
          alert("wrong login information");
        }

        // navigate("/");
      }) //
      .catch((err) => console.log(err));
  }

  return (
    <>
      <h1 className="title">Log-In</h1>

      <div className="container2">
        <Form noValidate>
          <div className="uppersideBtns">
            <Link to="/">
              <Button type="submit" variant="outline-success" className="btn1">
                Home
              </Button>
            </Link>
            <Link to="/signup">
              <Button type="submit" variant="outline-success" className="btn2">
                Sign-up
              </Button>
            </Link>
          </div>
          <Row className="mb-3 ">
            <Form.Group as={Col} md="14">
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                required
                type="text"
                onChange={function (e) {
                  setWrittenEmail(e.target.value);
                }}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3 ">
            <Form.Group as={Col} md="14">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                required
                onChange={function (e) {
                  setWrittenPw(e.target.value);
                }}
              />
            </Form.Group>
          </Row>
          <div className="lowersideBtn">
            {/* <Button
              type="submit"
              onClick={function (e) {
                e.preventDefault();
                cookieLoginSubmit();
              }}
              variant="warning"
              className="btn3"
              md="14"
            >
              Submit form(cookie version)
            </Button>
            <Button
              type="submit"
              onClick={function (e) {
                e.preventDefault();
                sessionLoginSubmit();
              }}
              variant="success"
              className="btn3"
              md="14"
            >
              Submit form(session version)
            </Button> */}
            <Button
              type="submit"
              onClick={function (e) {
                e.preventDefault();
                jwtLoginSubmit();
              }}
              variant="info"
              className="btn3"
              md="14"
            >
              Submit form(jwt version)
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}

export default Login;
