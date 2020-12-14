import React from 'react';
import Home from './Home'
 let data=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];


const suggestion =()=>{
    return(
        <Home name="asif">

            {data.map(x=><div>{x}</div>)}

        </Home>
    )}
    export default suggestion;