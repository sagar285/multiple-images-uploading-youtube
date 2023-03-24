import React, { useState,useEffect } from "react";
import axios from "axios"

const App = () => {
  const [img, setimg] = useState([]);
  const [name, setname] = useState("");
  const [imgs, setimgs] = useState([]);

  


const datasubmit =async(e)=>{
  e.preventDefault()

  let formdata = new FormData();
formdata.append("name",name);
Array.from(img).forEach((val)=>(
  formdata.append("img",val)
))

const response = await axios.post("http://localhost:3000/",formdata);
console.log(response);
}

const getimages =async()=>{
  const response =await axios.get("http://localhost:3000/")
  console.log(response.data[0].img);
  
  setimgs(response.data[1].img)
}


useEffect(()=>{
   getimages();
},[])


  return (
    <div>
     {
      Array.from(img).map((i)=>(
        <img src={i ? URL.createObjectURL(i):null} width="200px"/>
      ))
     }

      <form>
        <input
          type="text"
          onChange={(e) => {
            setname(e.target.value);
          }}
        />
        <input
          type="file"
          multiple
          onChange={(e) => {
            setimg(e.target.files);
          }}
        />
        <button onClick={datasubmit}>Submit</button>
      </form>
      {
        imgs.map((val)=>(
          <img src={val ? `http://localhost:3000/${val.filename}`:null} width="200px"/>
        ))
      }
    </div>
  );
};

export default App;
