import React from "react";
import "./Visualiser.css"
import * as algo from "../Algorithms"

const primary="aqua",sec="red",animSpeed=1

export default function Visualiser()
{
    const [arr,setArr]=React.useState([])
    function getArray()
    {
        const a=[]
        for(let i=0;i<280;i++)
        a.push(generateRandom(5,732))
        setArr(a)
    }

    function generateRandom(min,max) 
    {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    React.useEffect(()=>{
        getArray();
    },[0])

    function bubbleSort()
    {
        algo.bubbleSort(arr)
        console.log(arr)
    }

    function mergeSort()
    {
        const animations=algo.mergeAnimations(arr)
        for(let i=0;i<animations.length;i++)
        {
            const bars=document.getElementsByClassName("arr-viz")
            const colourChange=i%3!==2
            if(colourChange)
            {
                const [firstInd,secondInd] = animations[i]
                const firstBar = bars[firstInd].style
                const secondBar = bars[secondInd].style
                const colour=i%3 === 0 ? primary : sec
                setTimeout(() => {
                    firstBar.backgroundColor=colour
                    secondBar.backgroundColor=colour
                }, i*animSpeed);
            }
            else
            {
                setTimeout(() => {
                    const [firstInd,newHeight] = animations[i]
                    const firstBar = bars[firstInd].style
                    firstBar.height=`${newHeight}px`
                }, i*animSpeed);
            }
        }
    }

    return(
        <>
            <button onClick={getArray} className="btn"> Get a new array</button>
            <button onClick={mergeSort} className="btn">ms</button>
            <br /><br />
            <div className="arr-flex">
                {arr.map((value,ind)=>(
                    <div className="arr-viz" key={ind} 
                    style={{height:`${value}px`, width: `${arr.length<50 ? 8 : 2}px` }}>
                    </div>
                ))}
            </div>
        </>
    )
}
