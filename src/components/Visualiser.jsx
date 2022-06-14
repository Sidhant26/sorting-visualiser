import React from "react";
import "./Visualiser.css"
import * as algo from "../Algorithms"

export default function Visualiser()
{
    const [arr,setArr]=React.useState([])
    function getArray()
    {
        const a=[]
        for(let i=0;i<240;i++)
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

    return(
        <>
            <button onClick={getArray} className="btn"> Get a new array</button>
            <button onClick={bubbleSort} className="btn">bs</button>
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
