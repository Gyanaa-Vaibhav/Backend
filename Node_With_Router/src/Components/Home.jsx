import { useState } from 'react'

export default function Home(){
    console.log("Inside Home.jsx")
    const date = new Date().toLocaleString('en-UK')
    console.log(date)
    fetch('/posts')
        .then(res => res.json())
        .then(data => console.log(data))


    return(
        <>
            <h1>From Home Page</h1>
        </>
    )
}