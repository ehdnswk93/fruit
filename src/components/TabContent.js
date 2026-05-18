import { useEffect, useState } from "react";

function TabContent({ tap }) {
  let [fade, setFade] = useState("");
  useEffect(() => {
    setTimeout(() => {
      setFade("end");
    }, 10);
    return () => {
      setFade("");
    };
  }, [tap]);

  return (
    <div className={"start " + fade}>
      {[<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][tap]}
    </div>
  );
}

export default TabContent;
