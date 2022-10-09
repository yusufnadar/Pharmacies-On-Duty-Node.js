require('dotenv').config();
const express = require('express');
const app = express();
const pharmacyRouter = require('./routes/pharmacy');

app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.listen(process.env.PORT,()=>{
    console.log(`Başarıyla dinleniyor ${process.env.PORT}`);
});

app.use('/api/pharmacy',pharmacyRouter);
