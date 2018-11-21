import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import setRoutes from './src/routes';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.set('port', PORT);

setRoutes(app);

app.get('/', (req, res) => {
    res.send('Node and express working');
});

mongoose.connect('mongodb://localhost:27017/authdb', {useNewUrlParser:true}, (err) => {
    app.listen(PORT, () => {
        console.log('Express corriendo en http://localhost:3000')
    });
});