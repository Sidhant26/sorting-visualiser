import React from "react"
import "./Visualiser.css"
import * as algo from "../Algorithms"
import {Button} from 'react-bootstrap'

const primary="darkgreen",sec="red",animSpeed=4

export default function Visualiser()
{
    const [arr,setArr]=React.useState([])
    function getArray()
    {
        const a=[]
        for(let i=0;i<280;i++)
        a.push(generateRandom(5,720))
        setArr(a)
    }

    function generateRandom(min,max) 
    {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    React.useEffect(()=>{
        getArray()
    },[0])

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
                const barOneStyle=arrayBar.item(i).style
                const barTwoStyle=arrayBar.item(i+1).style
                async function fin()
                {
                    const promise=new Promise((accept)=>{
                        setTimeout(()=>{
                                barOneStyle.backgroundColor="darkgreen"
                                barTwoStyle.backgroundColor="darkgreen"
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
                                barOneStyle.backgroundColor=colorChange
                                barTwoStyle.backgroundColor=colorChange
                                const h1=barOneStyle.height
                                const h2=barTwoStyle.height
                                barTwoStyle.height=`${h1}`
                                barOneStyle.height=`${h2}`
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
                        barOneStyle.backgroundColor="aqua"
                        barTwoStyle.backgroundColor="aqua"
                        accept()
                    },1)
                })
                await promise
            }
            doThing()           
            }
        }
    }

    

    return(
        <>
            <div className="btns">
                <Button variant="primary" className="btn-primary" onClick={getArray}>  Get a new array</Button>
                <Button variant="primary" className="btn-primary" onClick={mergeSort}> Merge sort</Button>
                <Button variant="primary" className="btn-primary" onClick={bubbleSort}> Bubble sort</Button>
            </div>
            <br /><br />
            <div className="arr-cont">
                {arr.map((value,ind)=>(
                    <div className="arr-viz" key={ind} 
                    style={{height:`${value}px`,width: `${arr.length<50 ? 8 : 2}px` }}>
                    </div>
                ))}
            </div>
        </>
    )
}
