import { useState } from 'react'

export default function Nav(){
    return(
        <div className='Nav'>
            <ul>
                <li><a href="/home">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact</a></li>
            </ul>
        </div>
    )
}