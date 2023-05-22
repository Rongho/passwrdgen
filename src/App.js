import { useState } from 'react';
import './App.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { numbers1,upperCaseLetters,lowerCaseLetters,specialCharacters } from './character';
import { COPY_SUCCESS } from './message';

function App() {
  const[password,setPassword]=useState("");
  const[passwordlength, setPasswordlength]= useState(20);
  const[uppercase,setUppercase]=useState(false);
  const[lowercase,setLowercase]=useState(false);
  const[symbols,setSymbols]=useState(false);
  const[numbers,setNumbers]=useState(false);

  const handlegenepass=(e)=>{
    if(!uppercase && !lowercase && !symbols && !numbers){
      notify("please select an option",true)
    }
    let characterList=''
    if(uppercase){
      characterList=characterList+upperCaseLetters
    }
    if(lowercase){
      characterList=characterList+lowerCaseLetters
    }
    if(symbols){
      characterList=characterList+specialCharacters
    }
    if(numbers){
      characterList=characterList+numbers1
    }
    setPassword(createPassword(characterList))
  }
  const createPassword =(characterList)=>{
     let password=''
     const characterListLength =characterList.length;

     for(let i=0;i<passwordlength;i++){
      const characterIndex=Math.round(Math.random() * characterListLength)
      password=password+characterList.charAt(characterIndex)
     }
     return password;
  }
 const copyToClipboard=()=>{
  const newTextArea=document.createElement('textarea')
  newTextArea.innerText = password
  document.body.appendChild(newTextArea)
  newTextArea.select()
  document.execCommand('copy')
  newTextArea.remove()
 }

  const handlecpoyPass=(e)=>{
    if(password===''){
      notify('Nothing to copy',true)
    }else{
      copyToClipboard()
    notify(COPY_SUCCESS )
    }
  }
  const notify=(message, has_error=false)=>{
    if(has_error){
      toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    }else{
      toast(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });

    }
  }
  return (
    <div className="App">
      <div className="containr">
        <div className="generator">
          <h2 className="genewrator_heador">
            Password Generator
          </h2>
          <div className="generator_password">
            <h3>{password}</h3>
            <button onClick={handlecpoyPass} className="copy_btn">
              <i className='far fa-clipboard'></i>
            </button>
          </div>
          <div className="form-group">
            <label htmlFor="password-strength">password-strength</label>
            <input
            defaultValue={passwordlength}
            onChange={(e)=>setPasswordlength(e.target.value)}
            type="number" id="password-strength" name="password-strength" max="20" min="10"
            />
          </div>
          <div className="form-group">
            <label htmlFor="Uppercase-letter">Include Uppercase-letter</label>
            <input
            checked={uppercase}
            onChange={(e)=>setUppercase(e.target.checked)}
            type="checkbox" id="Uppercase-letter" name="Uppercase-letter" 
            />
          </div>
          <div className="form-group">
            <label htmlFor="Lowercase-letter">Include Lowercase-letter</label>
            <input
             checked={lowercase}
             onChange={(e)=>setLowercase(e.target.checked)}
            type="checkbox" id="Lowercase-letter" name="Lowercase-letter" 
            />
          </div>
          <div className="form-group">
            <label htmlFor="include-symbols">Include Symbols</label>
            <input
             checked={symbols}
             onChange={(e)=>setSymbols(e.target.checked)}
            type="checkbox" id="include-symbols" name="include-symbols" 
            />
          </div>
          <div className="form-group">
            <label htmlFor="include-numbers">Include Numbers</label>
            <input
             checked={numbers}
             onChange={(e)=>setNumbers(e.target.checked)}
            type="checkbox" id="include-numbers" name="include-numbers" 
            />
          </div>
          <button onClick={handlegenepass} className="generator_btn">Generate password</button>
          <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>

<ToastContainer />
        </div>
      </div>
      <br/>
      <br/>
        <div className='welcomtxt'>
          HOPE YOU CAN GENERATE THE REQUIRED PASSWORD!
        </div>
    </div>
  );
}

export default App;
