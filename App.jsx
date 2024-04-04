import { useState, useCallback,useEffect, useRef } from "react"


function App() {
  
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed ] = useState(false);
  const [charAllowed, setCharAllowed ] = useState(false);
  const [password, setPassword] = useState("");

  // ref hook
  const passwordRef = useRef(null)

  const passwordGen = useCallback(()=>{
    let pass = ""
    let string = "QWERTYUIOPASDFGHJKLMNBVCXZqwertyuiopasdfghjklmnbvcxz"

    if(numberAllowed) string += "0123456789"
    if(charAllowed) string+= "!@#$%^&*(){}|\/~"

    for(let i=1; i<=length; i++){
      let char = Math.floor(Math.random()*string.length + 1)
      pass += string.charAt(char);
    }

    setPassword(pass)

  },[length,numberAllowed,charAllowed])

  const copyPasswordToClip = useCallback(()=>{
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0,3);
    window.navigator.clipboard.writeText(password)
    alert("Copied :)")
  },[password])

  useEffect(()=>{
    passwordGen()
  },[length,numberAllowed,charAllowed,passwordGen])

  return (
    <>
    <div className="w-full max-w-lg mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800">
    <h1 className='text-4xl text-center text-white mx-10 my-3'>Password Generator</h1>
    
     <div className="flex shadow bg-white-500 rounded-lg overflow-hidden mb-4">
        <input 
        type="text"
        value={password}
        color="white"
        className="outline-none w-full py-1 px-3"
        placeholder="password"
        readOnly
        ref={passwordRef}
                 />

        <button
        onClick={copyPasswordToClip}
          className=" outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">Copy</button>

     </div>
     <div className="flex text-sm gap-x-2">
      <div className="flex items-center gap-x-1">
            <input 
            type="range"
            min={6}
            max={50}
            value = {length}
            className="cursor-pointer" 
            onChange={(e)=>{setLength(e.target.value)}}/>   
            <label>Length : {length}</label>
      </div>
      <div className="flex items-center gap-x-1">
          <input 
          type="checkbox"
          defaultChecked={numberAllowed}
          id="numberInput"
          onChange={()=>{setNumberAllowed((prev)=>!prev)}}/>
          <label>Numbers</label>
      </div>
      <div className="flex items-center gap-x-1">
          <input 
          type="checkbox"
          defaultChecked={charAllowed}
          id="characterInput"
          onChange={()=>{setCharAllowed((prev)=>!prev)}}/>
          <label>Characters</label>
      </div>
     </div>
    </div>
      
    </>
  )
}

export default App
