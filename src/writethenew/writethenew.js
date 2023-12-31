import "./writethenew.css";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";

function Writethenew() {
  const navigate = useNavigate();

  let [title, setTitle] = useState("");
  let [write, setWrite] = useState("");
  // 쿠키사용할 때
  // const cookieInfo = Cookies.get("email");
  function writeTheNewSubmit() {
    // console.log("쿠키쿠키", cookieInfo);
    axios
      .post(
        "http://localhost:8000/writethenew",
        {
          title: title,
          write: write,
          // authorEmail: cookieInfo, // 쿠키용
        },
        {
          withCredentials: true,
        }
      ) //
      .then(async (data) => {
        console.log("작성된 글 저장완료", data);
        await navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      <h1 className="title">Text</h1>
      <div className="container">
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>제목</Form.Label>
            <Form.Control
              type="title"
              placeholder=""
              onChange={function (e) {
                setTitle(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>내용</Form.Label>
            <Form.Control
              as="textarea"
              rows={10}
              onChange={function (e) {
                setWrite(e.target.value);
              }}
            />
          </Form.Group>
        </Form>
        <Button
          onClick={writeTheNewSubmit}
          variant="outline-dark"
          className="btn1"
        >
          Submit
        </Button>
        <Link to="/">
          <Button variant="outline-dark" className="btn2">
            Back
          </Button>
        </Link>
      </div>
    </>
  );
}

export default Writethenew;
