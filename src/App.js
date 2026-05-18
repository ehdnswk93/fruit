import {
  Button,
  Navbar,
  Container,
  Nav,
  Form,
  Carousel,
} from "react-bootstrap";
import { useState } from "react";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import axios from "axios";
import "./App.css";

import Slider from "./components/Slider";
import data from "./db/fruit";
import Products from "./components/Products";
import Detail from "./components/Detail";
import About from "./components/About";
import Member from "./components/Member";
import Location from "./components/Location";
import Title from "./components/Title";
import Title2 from "./components/Title2";
import data2 from "./db/veggie";
import ComVeggie from "./components/ComVeggie";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import Board from "./components/Board";

function App() {
  let navigate = useNavigate();
  let [fruit, setFruit] = useState(data);
  let [veggie, setVeggie] = useState(data2);
  let [count, setCount] = useState(1);
  let [input, setInput] = useState("");

  const sortByName = () => {
    let sortedFruit = [...fruit].sort((a, b) => (a.title > b.title ? 1 : -1));
    setFruit(sortedFruit);
    console.log(sortedFruit);
  };

  const sortByPriceLowToHigh = () => {
    let sortedFruit = [...fruit].sort((a, b) => a.price - b.price);
    setFruit(sortedFruit);
    console.log(sortedFruit);
  };

  const sortByPriceHighToLow = () => {
    let sortedFruit = [...fruit].sort((a, b) => b.price - a.price);
    setFruit(sortedFruit);
    console.log(sortedFruit);
  };

  return (
    <div className="App">
      <>
        <div className="container">
          <div className="row">
            <div className="col">
              <Navbar bg="dark" variant="dark">
                <Container>
                  <Navbar.Brand href="#home">과일농장</Navbar.Brand>
                  <Nav className="me-auto">
                    <Nav.Link
                      onClick={() => {
                        navigate("/");
                      }}
                    >
                      홈으로
                    </Nav.Link>
                    <Nav.Link
                      onClick={() => {
                        navigate("/detail/1");
                      }}
                    >
                      상세페이지
                    </Nav.Link>
                    <Nav.Link
                      onClick={() => {
                        navigate("/cart");
                      }}
                    >
                      장바구니
                    </Nav.Link>
                    <Nav.Link
                      onClick={() => {
                        navigate("/about");
                      }}
                    >
                      회사소개
                    </Nav.Link>
                    <Nav.Link
                      onClick={() => {
                        navigate("/Board");
                      }}
                    >
                      게시판
                    </Nav.Link>
                  </Nav>
                </Container>
              </Navbar>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col">
              <Routes>
                <Route
                  path="/"
                  element={
                    <div>
                      <div
                        className="container slider"
                        style={{ marginBottom: "50px" }}
                      >
                        <div className="row">
                          <div className="col">
                            <Carousel>
                              <Carousel.Item>
                                <img
                                  src={`${process.env.PUBLIC_URL}/img/sliderImg-1.jpg`}
                                  text="First slide"
                                  alt=""
                                />

                                <Carousel.Caption>
                                  <h3>첫 번째 이미지</h3>
                                  <p>이미지에 관한 설명들이 들어갈 자리</p>
                                </Carousel.Caption>
                              </Carousel.Item>
                              <Carousel.Item>
                                <img
                                  src={`${process.env.PUBLIC_URL}/img/sliderImg-2.jpg`}
                                  text="First slide"
                                  alt=""
                                />
                                <Carousel.Caption>
                                  <h3>두 번째 이미지</h3>
                                  <p>이미지에 관한 설명들이 들어갈 자리</p>
                                </Carousel.Caption>
                              </Carousel.Item>
                              <Carousel.Item>
                                <img
                                  src={`${process.env.PUBLIC_URL}/img/sliderImg-3.jpg`}
                                  text="First slide"
                                  alt=""
                                />
                                <Carousel.Caption>
                                  <h3>세 번째 이미지</h3>
                                  <p>이미지에 관한 설명들이 들어갈 자리</p>
                                </Carousel.Caption>
                              </Carousel.Item>
                            </Carousel>
                          </div>
                        </div>
                      </div>

                      <div className="container pd">
                        <div className="row">
                          <div className="col">
                            <Title />
                          </div>
                        </div>
                      </div>

                      <div className="container">
                        <div className="row">
                          <div
                            className="col-md-6 col-sm-6"
                            style={{ textAlign: "left" }}
                          >
                            {/* 검색 추가 */}
                            <input
                              placeholder="상품명을 입력하세요"
                              onChange={(e) => setInput(e.target.value)}
                              value={input}
                              style={{
                                padding: "10px",
                                marginLeft: "10px",
                                borderRadius: "4px",
                                border: "1px solid #ccc",
                                width: "250px",
                                marginRight: "10px",
                              }}
                              className="inputStyle"
                            />
                          </div>
                          <div
                            className="col-md-6 col-sm-6"
                            style={{ textAlign: "right" }}
                          >
                            {/* select추가 */}
                            <select
                              onChange={(e) => {
                                if (e.target.value === "low")
                                  sortByPriceLowToHigh();
                                if (e.target.value === "high")
                                  sortByPriceHighToLow();
                                if (e.target.value === "name") sortByName();
                              }}
                              style={{
                                padding: "10px",
                                marginLeft: "10px",
                                borderRadius: "4px",
                                border: "1px solid #ccc",
                                width: "150px",
                              }}
                            >
                              <option value="">정렬 선택</option>
                              <option value="low">낮은 가격순</option>
                              <option value="high">높은 가격순</option>
                              <option value="name">이름순</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="container" style={{ marginTop: "30px" }}>
                        <div className="row">
                          {fruit
                            .filter((item) =>
                              item.title
                                .toLowerCase()
                                .includes(input.toLowerCase()),
                            )
                            .map((ele, i) => (
                              <Products fruit={ele} key={ele.id} />
                            ))}
                        </div>
                      </div>

                      <div className="container">
                        <div className="row">
                          <div className="col">
                            <div style={{ textAlign: "center" }}>
                              <Title2 />
                              <Button
                                variant="outline-success"
                                count={count}
                                onClick={() => {
                                  if (count === 1) {
                                    axios
                                      .get(
                                        " https://ehdnswk93.github.io/fruit/img/json/veggie2.json",
                                        // "./img/json/veggie2.json",
                                      )
                                      .then((result) => {
                                        let copy10 = [
                                          ...veggie,
                                          ...result.data,
                                        ];
                                        setVeggie(copy10);
                                        setCount(count + 1);
                                      });
                                  } else if (count === 2) {
                                    axios
                                      .get(
                                        " https://ehdnswk93.github.io/fruit/img/json/veggie3.json",
                                        // "./img/json/veggie3.json",
                                      )
                                      .then((result) => {
                                        let copy11 = [
                                          ...veggie,
                                          ...result.data,
                                        ];
                                        setVeggie(copy11);
                                        setCount(count + 1);
                                      });
                                  }

                                  if (count === 3) {
                                    alert("더이상 상품이 없습니다.");
                                  }
                                }}
                              >
                                {" "}
                                + 3개 상품 더 보기{" "}
                              </Button>{" "}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="container" style={{ marginTop: "30px" }}>
                        <div className="row">
                          {veggie.map((ele, i) => {
                            return (
                              <ComVeggie
                                veggie={veggie[i]}
                                key={veggie[i].id}
                              />
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  }
                />
                <Route
                  path="/detail/:paramId"
                  element={
                    <div>
                      <Detail fruit={fruit} />
                    </div>
                  }
                />
                <Route path="/cart" element={<Cart />} />
                <Route path="/about" element={<About />}>
                  <Route path="member" element={<Member />} />
                  <Route path="location" element={<Location />} />
                </Route>
                <Route path="/board" element={<Board />} />
              </Routes>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row"></div>
        </div>
      </>
    </div>
  );
}
export default App;
