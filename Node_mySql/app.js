const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 4120

app.use([express.json(), bodyParser.urlencoded({ extended: true }), cors()]);



// WITH OUT SEQUILIZE
const router = require('./routes/Normalrouter.js');
app.use(router)




// WITH  SEQUILIZE
const sequelizerouter = require('./routes/Sequelizeroutes')
app.use(sequelizerouter)

app.get('/',(req,res)=>{
    res.json({success:'test'})
})

app.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`);
})
