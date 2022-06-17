import React from "react"
import "./Visualiser.css"
import*as algo from "../Algorithms"
import {Button,DropdownButton,Dropdown} from 'react-bootstrap' 

const primary="darkgreen",sec="red",animSpeed=4

export default function Visualiser()
{
    const [arr,setArr]=React.useState([])
    const [len,setLen]=React.useState(20)
    function getArray()
    {
        const a=[]
        for(let i=0;i<len;i++)
        a.push(generateRandom(5,720))
        setArr(a)
    }

    function generateRandom(min,max) 
    {
        return Math.floor(Math.random()*(max - min + 1)) + min
    }

    React.useEffect(()=>{
        getArray()
    },[len])

    function mergeSort()
    {
        const animations=algo.mergeAnimations(arr)
        for(let i=0;i<animations.length;i++)
        {
            const bars=document.getElementsByClassName("arr-viz")
            const colourChange=i%3!==2
            if(colourChange)
            {
                const [firstInd,secondInd]=animations[i]
                const firstBar=bars[firstInd].style
                const secondBar=bars[secondInd].style
                const colour=i%3===0 ? primary : sec
                setTimeout(()=> {
                    firstBar.backgroundColor=colour
                    secondBar.backgroundColor=colour
                },i*animSpeed)
            }
            else
            {
                setTimeout(()=> {
                    const [firstInd,newHeight]=animations[i]
                    const firstBar=bars[firstInd].style
                    firstBar.height=`${newHeight}px`
                },i*animSpeed)
            }
        }
    }

    function bubbleSort()
    {
        const arrayBar=document.getElementsByClassName('arr-viz')
        for(let j=0;j<arr.length;j++)
        {
            for(let i=0;i<arr.length-1;i++)
            {
                const firstBar=arrayBar.item(i).style
                const secondBar=arrayBar.item(i+1).style
                async function fin()
                {
                    const promise=new Promise((accept)=>{
                        setTimeout(()=>{
                                firstBar.backgroundColor="darkgreen"
                                secondBar.backgroundColor="darkgreen"
                                accept()
                            },i*animSpeed)
                        })
                    await promise
                }
                fin()
                const colorChange=(arr[i]>=arr[i+1])?"red":"aqua"
                if(arr[i]>arr[i+1])
                {
                    async function foo(){
                        const promise=new Promise((accept)=>{
                            setTimeout(()=>{
                                firstBar.backgroundColor=colorChange
                                secondBar.backgroundColor=colorChange
                                const h1=firstBar.height
                                const h2=secondBar.height
                                secondBar.height=`${h1}`
                                firstBar.height=`${h2}`
                                accept()    
                            },2)
                        })
                        await promise
                    }
                     foo()
                    const a=arr[i],b=arr[i+1]
                    arr[i]=b
                    arr[i+1]=a   
                }
            async function doThing(){
                const promise=new Promise((accept)=>{
                    setTimeout(()=>{
                        firstBar.backgroundColor="aqua"
                        secondBar.backgroundColor="aqua"
                        accept()
                    },1)
                })
                await promise
            }
            doThing()           
            }
        }
    }

    function selectionSort()
    {
        const animations=algo.selectionSortAnimation(arr)
        for(let i=0;i<animations.length;i++)
        {
            const arrayBars=document.getElementsByClassName("arr-viz")
            const [type,firstInd,secondInd]=animations[i]
            const firstBar=arrayBars[firstInd].style
            const secondBar=arrayBars[secondInd].style
            if(type===0)
            {
                setTimeout(()=>{
                    firstBar.backgroundColor="aqua"
                    secondBar.backgroundColor="red"
                },i*animSpeed)
            }
            else if(type===1)
            {
                setTimeout(()=>{
                    firstBar.backgroundColor="aqua"
                    secondBar.backgroundColor="red"
                },i*animSpeed)
            }
            else if(type===2)
            {
                setTimeout(()=>{
                    firstBar.backgroundColor="red"
                    secondBar.backgroundColor="red"
                    let temp=firstBar.height
                    firstBar.height=secondBar.height
                    secondBar.height=temp
                },i*animSpeed)
            }
            else if(type===3)
            {
                setTimeout(()=>{
                    secondBar.backgroundColor="red"
                },i*animSpeed)
            }
            else if(type===4)
            {
                for(let j=0;j<arrayBars.length;j++)
                {
                    setTimeout(()=>{
                        arrayBars[j].style.backgroundColor="darkgreen"
                    },i*animSpeed)
                    setTimeout(()=>{
                        arrayBars[j].style.backgroundColor="darkgreen"
                    },i*animSpeed)
                }
            }
        }
    }

    return(
        <>
            <div className="btns">
                <Button variant="primary" className="btn-primary" onClick={getArray}>  Get a new array</Button>
                <Button variant="primary" className="btn-primary" onClick={mergeSort}> Merge sort</Button>
                <Button variant="primary" className="btn-primary" onClick={bubbleSort}> Bubble sort</Button>
                <Button variant="primary" className="btn-primary" onClick={selectionSort}> Selection sort</Button>
                <DropdownButton id="length" title="Size">
                    <Dropdown.Item eventKey="1" onClick={()=>setLen(20)}>20</Dropdown.Item>
                    <Dropdown.Item eventKey="2" onClick={()=>setLen(50)}>50</Dropdown.Item>
                    <Dropdown.Item eventKey="3" onClick={()=>setLen(100)}>100</Dropdown.Item>
                    <Dropdown.Item eventKey="4" onClick={()=>setLen(150)}>150</Dropdown.Item>
                    <Dropdown.Item eventKey="5" onClick={()=>setLen(200)}>200</Dropdown.Item>
                    <Dropdown.Item eventKey="6" onClick={()=>setLen(280)}>280</Dropdown.Item>
                </DropdownButton>
            </div>
            <br />
            <div className="arr-cont">
                {arr.map((value,ind)=>(
                    <div className="arr-viz" key={ind} 
                    style={{height:`${value}px`,width: `${arr.length<=100 ? 11 : 2}px` }}>
                    </div>
                ))}
            </div>
        </>
    )
}
