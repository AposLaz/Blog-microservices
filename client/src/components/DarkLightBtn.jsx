import React from 'react'

function DarkLightBtn() {

const setDarkMode = ()=>{
    document.querySelector("body").setAttribute("data-theme", "dark");
    localStorage.setItem("selectedTheme","dark");
};

const setLightMode = ()=>{
    document.querySelector("body").setAttribute("data-theme","light")
    localStorage.setItem("selectedTheme","light")
}
const selectedTheme = localStorage.getItem("selectedTheme");

if(selectedTheme === "dark"){
    setDarkMode();
}

const toggleTheme = (e)=>{
    if(e.target.checked){
        setDarkMode()
    }else{
        setLightMode()
    }
}
  return (
    <div className='dark-mode'>
        <input 
            className=''
            type='checkbox'
            id="darkmode-toggle"
            onChange={toggleTheme}
            defaultChecked={selectedTheme === "dark"}
        />
        <button className='btn btn-primary'>DarkLightBtn</button>
    </div>
  )
}

export default DarkLightBtn