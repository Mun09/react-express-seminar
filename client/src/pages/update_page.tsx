import React from "react";
import axios from "axios";
import { SAPIBase } from "../tools/api";
import "./css/feed.css";

const UpdatePage = (props: { id: string, UpdateKey: any, setUpdateKey: any}) => {
  const { id, UpdateKey, setUpdateKey } = props;
  const [ SUpdateTitle, setSUpdateTitle ] = React.useState<string>("");
  const [ SUpdateContent, setSUpdateContent ] = React.useState<string>("");

  const updatePost = (id: string) => {
    const asyncFun = async () => {
      await axios.post( SAPIBase + '/feed/updateFeed', { id: id, title: SUpdateTitle, content: SUpdateContent});
      setUpdateKey(!UpdateKey);
    }
    asyncFun().catch(e => window.alert(`AN ERROR OCCURED! ${e}`));
  }

  return (
    <div className={"feed-item-add"}>
      Title: <input type={"text"} value={SUpdateTitle} onChange={(e) => setSUpdateTitle(e.target.value)}/>
      &nbsp;&nbsp;&nbsp;&nbsp;
      Content: <input type={"text"} value={SUpdateContent} onChange={(e) => setSUpdateContent(e.target.value)}/>
      <div className={"post-add-button"} onClick={(e) => updatePost(id)}>Update Post!</div>
    </div>  
  );
}

export default UpdatePage;