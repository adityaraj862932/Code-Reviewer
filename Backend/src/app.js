const express = require('express');
const aiRoutes = require('./routes/ai.routes')
const cors = require('cors')

const app = express()

app.use(cors(
    {
        origin:["http://localhost:5173","https://code-reviewer-aditya-rajs-projects-d6fe77d3.vercel.app","https://code-reviewer-jade-gamma.vercel.app"],
        credentials:true,
    }
))


app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.use('/ai', aiRoutes)

module.exports = app