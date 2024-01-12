import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setlength] = useState(8);
  const [numberAllow, setNumberAllow] = useState(false);
  const [CharAllow, setCharAllow] = useState(false);
  const [password, setPassword] = useState("");
  const [isclicked, setIsClicked] = useState(false)

  const clipboardRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllow) str += "0123456789";
    if (CharAllow) str += "`~!@#$%^&*-_=+";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllow, CharAllow]);

  const copyPassword = useCallback (()=>{
    if(password){
      clipboardRef.current?.select();
      clipboardRef.current?.setSelectionRange(0, 15)
      window.navigator.clipboard.writeText(password);
      setIsClicked(true)
    }else{
      setIsClicked(false)
    }
  }, [password])

  const resetPassword = useCallback (()=>{
    setPassword('');
    setNumberAllow(false)
    setCharAllow(false)
    setIsClicked(false)
  })

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllow, CharAllow, passwordGenerator])
  return (
    <>
      <div className="w-full min-h-48 max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-gray-900 font-semibold bg-gray-700">
        <h1 className="text-2xl text-orange-600 text-center py-3 my-5">
          Password Generator
        </h1>
        <div className="flex shadow-sm rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={clipboardRef}
          />
          <button onClick={copyPassword} className={`outline-none ${isclicked ? `bg-green-500` : null } bg-cyan-600 text-white px-3 py-2 shrink-0`} >{isclicked ? "Copied!" : "Copy"}</button>
        </div>
        <div className="flex text-gray-200 text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input type="range"
            min={6}
            max={15}
            value={length}
            className="cursor-pointer"
            onChange={(e)=>{setlength(e.target.value)}}
            />
            <label>length: {length}</label>
          </div>
          <div className="flex align-middle items-center gap-x-1">
            <input type="checkbox"
            defaultChecked ={numberAllow}
            id="numberInput"
            onChange={()=>{
              setNumberAllow((prev) => !prev);
            }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex align-middle items-center gap-x-1">
            <input type="checkbox"
            defaultChecked ={CharAllow}
            id="charInput"
            onChange={()=>{
              setCharAllow((prev) => !prev);
            }}
            />
            <label htmlFor="charInput">Characters</label>
          </div>

        </div>

        <div className=" text-center py-5 ">
        <button onClick={resetPassword} className={`outline-none rounded-lg bg-red-500 text-white px-3 py-2 shrink-0`} >Reset Password</button>
        </div>
      
      </div>
    </>
  );
}

export default App;
