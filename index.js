const express = require('express')
const app = express()
const port = 3000
const db = require('./db/connection.js')
const bodyParser = require('body-parser');
var cors = require('cors');
app.use(cors());

app.get('/', async (request, response) => {
    try {
        let results = await db.getValues();
        if (results['success']) {
            response.json({
                success: true,
                results: results['message'],
            });

        } else {
            response.json({
                success: false,      
            });
        }
    } catch {
        response.sendStatus(500);
    }
})

const router = express.Router();

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());

app.get('/location', async (request, response) => {
    console.log(request.query)
    var value_1 = request.query.unit_id;
    var value_2 = request.query.lat;
    var value_3 = request.query.lon;
    try {
        let results = await db.addValues(value_1,value_2,value_3);
        if (results['success']) {
            console.log(results['message'])
            response.json({
                success: true,
                results: results['message'],
            });

        } else {
            response.json({
                success: false,      
            });
        }
    } catch {
        response.sendStatus(500);
    }
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})