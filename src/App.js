import { useState,useCallback,useEffect,useRef } from "react";

const App=()=>{
  const [length,setLength]=useState(8);
  const [num,noNum]=useState(false);
  const [character,setCharacter]=useState(false);
  const [pass,setPass]=useState();
  const passwordRef=useRef(null);
  const passwordGenerator=useCallback(()=>{
    let password="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(num) str +="0123456789";
    if(character) str+="!#$%&'()*+,-./:;<=>?@[\]^_`{|}~";
    //make pass
    for(let i =1;i<=length;i++){
      let char = Math.floor(Math.random()*str.length+1)
      password+=str.charAt(char);
    }
    setPass(password);//read password
  },[length,num,character])
const copyPassword=useCallback(()=>{
  passwordRef.current?.select();
  passwordRef.current?.setSelectionRange(0,100);
  window.navigator.clipboard.writeText(pass)
},[pass]);
  useEffect(()=>{passwordGenerator()},[length,num,character,passwordGenerator])
  return(
    [
 
<div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700 py-10  ">
<div>
  <h1 className="text-center text-4xl pb-4">Password</h1></div>
  <div className="flex shadow  overflow-hidden mb-4">
 
    <input type="text"
    value={pass} 
      className="outline-none w-full py-1 px-3"
      placeholder="password"
      readOnly
      ref={passwordRef}
    />
    <button 
    onClick={copyPassword}
    className="outline-none bg-blue-600 text-white px-3 py-0.5 shrink-0">copy</button>
  </div>
  <div className="flex text-sm gap-x-2">
  <div className="flex items-center gap-x-1">
   <input type="range" min={6} max={100} value={length} className="cursor-pointer"
    onChange={(e)=>{
      setLength(e.target.value)
    }}
   />
   <label>Length:{length}</label>
  </div>
  <div className="flex items-center gap-x-1">
    <input type="checkbox"  id="numberInput"  defaultChecked={num} onChange={()=>{
      noNum((prev)=>!prev);
    }}/>
    <label htmlFor="numberInput">Numbers</label>
  </div>
  <div className="flex items-center gap-x-1">
    <input type="checkbox"  id="characterInput"  defaultChecked={character} onChange={()=>{
      setCharacter((prev)=>!prev);
    }}/>
    <label htmlFor="characterInput">Character</label>
  </div>
</div>
</div>


    ]
  )
}
export default App;
