import React from "react";
import "./Visualiser.css"
import "../Algorithms"

export default function Visualiser()
{
    const [arr,setArr]=React.useState([])
    function getArray()
    {
        const a=[]
        for(let i=0;i<220;i++)
        a.push(generateRandom(5,734))
        setArr(a)
    }

    function generateRandom(min,max) 
    {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    React.useEffect(()=>{
        getArray();
    },[0])

    return(
        <>
            <button onClick={getArray} className="btn"> Get a new array</button>
            <br /><br />
            <div className="arr-flex">
                {arr.map((value,ind)=>(
                    <div className="arr-viz" key={ind} style={{height:`${value}px`}}>
                    </div>
                ))}
            </div>
        </>
    )
}
