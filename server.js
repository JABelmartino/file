const http = require('http') 
const { fork } = require('child_process')
const express = require('express')
const app = express()

let visitas = 0

const server = http.createServer()
server.on('request',(req, res) => {
    let { url } = req
    if(url == '/calcular'){
        const computo = fork('./computo.js')
        computo.send('start')
        computo.on('message', mensaje => {
            console.log(mensaje)
            res.end(mensaje)
        })
        
       
    }else if(url == '/'){        
        res.end(`Ok ${++visitas}`)
    }
})

 const PORT = 8000

 server.listen(PORT, err => {
     if(err) throw new Error(err)
     console.log(`Server listening on port ${PORT}`)
 })
