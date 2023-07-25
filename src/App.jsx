import { useState,useRef,useEffect } from 'react'
import winAnimation from './congratulation'
import './index.css'
import Confetti from "react-confetti";


function App() {
  const tdNoActiveStyle = 'w-9 h-9 bg-slate-400'
  const trNoActiveStyle = 'flex gap-2'
  const liHoverStyle = 'hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black'
  const timerMin = useRef()
  const timerSec = useRef()
  const tableRf  = useRef()
  
  const [sec,setSec] = useState(1)
  const [min,setMin] = useState(5)
  const [activeRow,setActiveRow] = useState(0)
  const [startChrono,setStartChrono] = useState(false)
  const [keyNumber,setkeyNumber] = useState([])
  const [isWin,setIsWin] = useState(false)
  const [currentValues,setCurrentValue] = useState([])
    useEffect(() => {
      if (startChrono) {
        const interval = setInterval(() => {
        if (sec <= 1) {
          setSec(59)
          setMin(prevent => prevent - 1)
        } else {
          setSec(p => p - 1)
        }
        }, 1000)
        if (min == 0 && sec <= 1) {
          alert('you lost')
          setSec(1)
          setMin(5)
          
        }
        return () => clearInterval(interval)
        }
    }, [sec,startChrono])
  

const handelTheme = ()=>{
    const testTheme = document.body.className.includes(' dark')? true:false
    console.log(testTheme)
    if (testTheme) {
      document.body.classList.remove('dark')
    }else{
      document.body.classList.add('dark')
    }
    
}
  
const StartGaming = () =>{
    const table = tableRf.current
    const tableTimer = table.children[0]
    const tableHeader = table.children[1]
    table.innerHTML =''
    setActiveRow(0)
    setIsWin(false)
    setStartChrono(true)
    table.appendChild(tableTimer) 
    table.appendChild(tableHeader) 
    let cellule;
    for (let i = 0; i < 9; i++) {
      const row = document.createElement('tr')
      row.className = ` Line ${trNoActiveStyle} `
      row.id = i
      row.addEventListener("click", ()=>{
        handelActiveRows(row)
      })
      for (let j = 0; j < 6; j++) {
        if (j==0 || j==5) {
          cellule = document.createElement('td')
          cellule.className = 'w-8 h-8'
          row.appendChild(cellule)

        }else {
          cellule = document.createElement('td')
          cellule.className = tdNoActiveStyle
          row.appendChild(cellule)
        } 
      }
    table.appendChild(row)
    setkeyNumber(() => generateKey())
}}
const handelActiveRows = (e)=>{
    let activeRowNumber = document.getElementById('activeRow').innerText
    if (e.id == activeRowNumber) {
      for (const box of e.children) {
        //console.log(box)
        box.contentEditable  = 'true'
      }
    }
    console.log(e.id)
    console.log(activeRow)
}

const testValue = (e)=>{
    e.preventDefault()
    const newVal = activeRow +1
    
    const thisRow = document.getElementById(`${activeRow}`)
    let values = []
    
    for (const box of thisRow.children) {
      if (box.innerHTML.length > 0) {
        values.push(Number(box.innerText))
        box.contentEditable = 'false'
        console.log(box.innerText)
      }
    }
    if (values.length > 3) {
      setActiveRow(newVal)
      console.log('activr row : '+ newVal)
      console.log('val : ' +values)
      console.log('key : ' +keyNumber)
      const result = testNu(values,keyNumber)
      thisRow.children[0].innerText = result[0]
      thisRow.children[5].innerText = result[1]
    
  }
  
}
const testNu = (my , keyC) =>{
    const limit = document.getElementById('table').children
    let isTrue = 0
    let inPlase = 0
        for (let n of my){
            if(keyC.includes(n)){
                isTrue += 1
                if(my.indexOf(n) == keyC.indexOf(n)){
                    inPlase +=1
                }
            }
        }
        if (isTrue == 4 && inPlase == 4) {
          setIsWin(true)
        }
        if (!(isTrue == 4 && inPlase == 4) && document.getElementById('activeRow').innerText == limit.length -2) {
          alert(`sorry you Lost ... \n the number is ${keyNumber} \n start again ...`)

        }
        return [isTrue , inPlase]
}
const generateKey = ()=>{
  const arr = [];

  while (arr.length < 4) {
    const randomNumber = Math.floor(Math.random() * 10);
    if (!arr.includes(randomNumber)) {
      arr.push(randomNumber);
    }
  }
    //console.log('ourKey : ' + )
    return arr
}
const Win = ({iswin})=>{
  if (iswin) {
      const w = window.innerWidth
      const h =	window.innerHeight
    return (
    <>
      <Confetti className='absolute mx-auto' width={w} height={h} recycle={iswin} />
      <div className=' bg-slate-300 w-3/5 max-md:w-full h-40 flex flex-col justify-center items-center mx-auto absolute top-[20%]'>
        <h1 className='text-xl font-bold'>wa rba7tiii 🥳</h1>
        <button onClick={StartGaming} className={`flex justify-center items-center bg-green-600 text-white rounded-lg text-xl max-w-max px-1 cursor-pointer duration-500 ${liHoverStyle}`}>
            Restart
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-stopwatch-fill" viewBox="0 0 16 16">
            <path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07A7.001 7.001 0 0 0 8 16a7 7 0 0 0 5.29-11.584.531.531 0 0 0 .013-.012l.354-.354.353.354a.5.5 0 1 0 .707-.707l-1.414-1.415a.5.5 0 1 0-.707.707l.354.354-.354.354a.717.717 0 0 0-.012.012A6.973 6.973 0 0 0 9 2.071V1h.5a.5.5 0 0 0 0-1h-3zm2 5.6V9a.5.5 0 0 1-.5.5H4.5a.5.5 0 0 1 0-1h3V5.6a.5.5 0 1 1 1 0z"/>
          </svg>
        </button>
      </div>
    </>
    
    )
  }else{
    return <span></span>
  }
}

  return (
    <>
    <Win iswin={isWin}/>
      <nav className='w-3/5 max-md:w-full h-11 dark:bg-blue-950 leading-11 dark:text-white bg-white mx-auto shadow px-2'>
        <ul className=' flex justify-between text-center font-bold text-xl'>
          <li onClick={handelTheme} className={`flex items-center max-w-max dar px-1 cursor-pointer  duration-500 ${liHoverStyle}`}>
            them &nbsp;
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moon-stars-fill" viewBox="0 0 16 16">
              <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"/>
              <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z"/>
            </svg>
          </li>
          <li onClick={StartGaming} className={`flex items-center max-w-max px-1 cursor-pointer duration-500 ${liHoverStyle}`}>
            Start
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-stopwatch-fill" viewBox="0 0 16 16">
            <path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07A7.001 7.001 0 0 0 8 16a7 7 0 0 0 5.29-11.584.531.531 0 0 0 .013-.012l.354-.354.353.354a.5.5 0 1 0 .707-.707l-1.414-1.415a.5.5 0 1 0-.707.707l.354.354-.354.354a.717.717 0 0 0-.012.012A6.973 6.973 0 0 0 9 2.071V1h.5a.5.5 0 0 0 0-1h-3zm2 5.6V9a.5.5 0 0 1-.5.5H4.5a.5.5 0 0 1 0-1h3V5.6a.5.5 0 1 1 1 0z"/>
          </svg>
          </li>
          <li>

          </li>
        </ul>
      </nav>
      
      <div className='w-4/5 max-md:w-full'>
      
        <table className='mx-auto my-11 border-2 text-center dark:text-white leading-8 font-bold text-xl'>
          <tbody ref={tableRf} id='table' className='flex flex-col justify-center items-center gap-2 mx-auto'>
          <tr>
            <td>
              <div className='flex justify-around  text-center leading-10 mx-auto w-48 bg-white dark:bg-black text-white'>
                <div ref={timerMin} className='w-14 h-11 rounded-full bg-blue-500'>{min}</div>:
                <div ref={timerSec} className='w-14 h-11 rounded-full bg-blue-500'>{sec}</div>
             </div>
            </td>
          </tr>
          <tr className={`${trNoActiveStyle} min-w-max`}>
              <td className={'w-1/6 border'}> true </td>
              <td className='w-4/6 border flex flex-col'> write any nambers 
              <button className='bg-green-700 hover:bg-green-600 rounded-lg' onClick={testValue}>
                test <span id='activeRow'>{activeRow}</span>
              </button>
              </td>
              <td className={'w-1/6 border'}> in Place </td>
            </tr>
          </tbody>
        </table>
        
      </div>
    </>
  )
}

export default App
