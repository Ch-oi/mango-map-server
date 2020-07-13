const express = require('express')
const port = process.env.PORT || 8000
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.listen(port, function(){
    console.log('listening on port' + port )
})

