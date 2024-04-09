import express from 'express'
import 'dotenv/config'

const app = express()

const port = process.env.PORT

app.get('/',(req,res)=>{
    return res.status(200).json({message: "Hola amigo"})
})

app.listen(port,()=> console.log(`Server running in port http://localhost:${port}`))