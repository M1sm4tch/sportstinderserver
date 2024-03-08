const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express()

const PORT = process.env.PORT || 2000 

app.get('/', (req,res) => {
    res.send('<a href="/auth/google">Authenticate with Google</a>');
});


app.listen(PORT,()=>{console.log(`http://localhost:${PORT}`)})