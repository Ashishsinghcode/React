import React,{useState} from 'react'

export default function TextForm(props) {
const handleUpClick=()=>{
    setText(text.toUpperCase())
}
const handleDownClick=()=>{
    setText(text.toLowerCase())
}
const handleOnChange=(event)=>{
    setText(event.target.value)
}
    const [text,setText]=useState('')
    
    return (
    <div style={{color:props.mode==='dark'?'white':'black'}}>
        <div className="form-group" >
        <h1>{props.heading}</h1>
          <textarea
          style={{backgroundColor:props.mode==='light'?'white':'grey',color:props.mode==='dark'?'white':'black'}}
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="8"
            value={text}
            onChange={handleOnChange}
          ></textarea>
          <button className='btn btn-primary mt-3'  onClick={handleUpClick}>Convert to Uppercase</button>
          <button className='btn btn-primary mt-3 mx-3 '  onClick={handleDownClick}>Convert to Lowercase</button>
          <button className='btn btn-primary mt-3 '  onClick={()=>{setText('')}}>Clear Text</button>

        </div>

        <h2 className='my-3'>Your Text Summery</h2>
        <p>{text.split(" ").length-1} Words, {text.length} Characters</p>
        <p>{0.008 * text.split(" ").length} Minutes can be read</p>
        <h3>Preview</h3>
        <p>{text.length>0?text:"Enter something to get preview it here"}</p>
    </div>
  );
}
