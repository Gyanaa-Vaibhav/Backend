import express from 'express';
import fs from "fs";

// Assignment 1 : Create and Manipulate Buffers
const buffer = Buffer.from("Node.js Buffers are powerful"); // 1. Create a buffer from the string "Node.js Buffers are powerful".
console.log(buffer.toString('hex')) // 2. a.Convert and log the buffer's content in: Hexadecimal
console.log(buffer.toString('base64')) // 2. b.Convert and log the buffer's content in: Base64 encoding
console.log(buffer.slice(8,15).toString()) // 3. Slice the buffer to extract the word "Buffers" and log it.

// Assignment 2: Read and Write Binary Data
fs.readFile('./img.jpg',(err,data)=>{
    if(err){
        console.log(err)
    }
    const imgData = Buffer.from(data) // 1. Read an image file (e.g., input.jpg) into a buffer.
    console.log(Buffer.byteLength(imgData)) // 2. Log the buffer’s size in bytes.

    fs.writeFile('from_buffer.txt',data,()=>{ // Write the buffer content to a new file (e.g., output.jpg).
        console.log('Written')
    })
})

// Assignment 3: Buffer Operations
const helloBuffer = Buffer.from('Hello') // 1. a. Create two buffers: One with the content "Hello"
const worldBuffer = Buffer.from('World') // 1. b. Create two buffers: Another with "World"
const concatBuffer = Buffer.from(helloBuffer + worldBuffer) // 2. Concatenate them into a single buffer and log the resulting content ("HelloWorld").

console.log(concatBuffer.toString())

// Assignment 4: Encode and Decode with Buffers
function bufferOp(string){
    const buffer = Buffer.from(string)
    const base64Encoded = buffer.toString('base64')
    const decodedBuffer = Buffer.from(base64Encoded, 'base64'); // 1. a. Encode a string into Base64 using a buffer.
    const decoded = decodedBuffer.toString('utf-8') // 1. b. Decode it back to the original string.

    console.log("Base 64",base64Encoded)
    console.log("Decoded",decoded)
}

bufferOp('Hello')

// Assignment 5: Buffer Comparison
const aBuffer = Buffer.from('BufferAContent')
const bBuffer = Buffer.from('BufferBContent')

console.log(Buffer.compare(aBuffer,bBuffer))
if(Buffer.compare(aBuffer,bBuffer)){
    console.log(bBuffer)
}else{
    console.log('Both Same')
}
