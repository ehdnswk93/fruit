import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Nav, Button } from "react-bootstrap";
import styled from "styled-components";
import { addItem } from "../store";
import { useDispatch } from "react-redux";
import banner from "../db/banner.jpg";

import TabContent from "./TabContent";

let Banner = styled.div`
  padding: 20px;
  color: gray;
`;

let BannerBtn = styled.button`
  color: white;
  font-size: 30px;
  width: 100%;
  padding: 0px 0px;
  border: 1px solid #ccc;
  background-size: cover;
  background-position: center;
`;

let Img = styled.img`
  width: 100%;
  max-width: 100%;
  height: auto;
`;

function Detail(props) {
  let { paramId } = useParams();

  let [tap, setTap] = useState(0);
  let [fade2, setFade2] = useState("");
  useEffect(() => {
    setFade2("end");
    return () => {
      setFade2("");
    };
  }, []);

  const dispatch = useDispatch();

  let selproduct = props.fruit.find((x) => x.id === Number(paramId));

  if (!selproduct) {
    return <div>해당 상품이 존재하지 않습니다.</div>;
  }

  const { id, imgUrl, title, content, price } = selproduct;

  return (
    <div className={"container start " + fade2}>
      <div className="row">
        <div className="col">
          <Banner>
            <BannerBtn>
              <Img src={process.env.PUBLIC_URL + "/img/banner.jpg"} />
            </BannerBtn>
          </Banner>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 col-sm-6 d-1">
          <img
            src={process.env.PUBLIC_URL + "/" + selproduct.imgUrl}
            width="80%"
            alt={title}
          />
        </div>
        <div className="col-md-6 col-sm-6">
          <h4 className="pt-5">{title}</h4>
          <p>{content}</p>
          <p>{price}</p>
          <Button
            variant="primary"
            onClick={() => {
              //  dispatch(addItem(  {id : 1,  imgurl : 'fruit1.jpg', name : 'Grey Yordan', count : 1}))

              dispatch(
                addItem({
                  id: id,
                  imgurl: imgUrl.replace("img/", ""),
                  name: title,
                  count: 1,
                }),
              );
            }}
            style={{ marginRight: "10px" }}
          >
            주문하기
          </Button>
          <Link to="/cart">
            <Button variant="outline-success"> 주문상품 확인하기 </Button>
          </Link>
        </div>
      </div>

      <div className="row">
        <Nav
          variant="tabs"
          defaultActiveKey="link0"
          style={{ marginTop: "50px" }}
        >
          <Nav.Item>
            <Nav.Link
              onClick={() => {
                setTap(0);
              }}
              eventKey="link0"
            >
              버튼0
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              onClick={() => {
                setTap(1);
              }}
              eventKey="link1"
            >
              버튼1
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              onClick={() => {
                setTap(2);
              }}
              eventKey="link2"
            >
              버튼2
            </Nav.Link>
          </Nav.Item>
        </Nav>

        <TabContent tap={tap} />
      </div>
    </div>
  );
}

export default Detail;
