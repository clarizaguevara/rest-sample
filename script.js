// imports
const express = require('express'); // server built on node architecture
const Joi = require('joi'); // validator
const cors = require('cors');

// initializations
const port = 8080; //PORT ENVIRONMENT VARIABLE
const transactions = [
    { 
        id: 1,
        merchantReferenceNumber: "12345", 
        createdDateAndTime: "02-01-2023 00:01:02", 
        totalAmount: "500.00", 
        transactionStatus: "Success"
    },
    { 
        id: 2,
        merchantReferenceNumber: "67891", 
        createdDateAndTime: "02-12-2023 13:11:05", 
        totalAmount: "1000.00", 
        transactionStatus: "Pending"
    },
    { 
        id: 3,
        merchantReferenceNumber: "111213", 
        createdDateAndTime: "03-06-2023 10:08:13", 
        totalAmount: "1234.00", 
        transactionStatus: "Failed"
    },
]

const customers = [
    { title: 'George', id: 1 },
    { title: 'Josh', id: 2 },
    { title: 'Tyler', id: 3 },
    { title: 'Alice', id: 4 },
    { title: 'Candice', id: 5 }
]

// configurations
const app = express(); // Create Express Application on the app variable

// middlewares
app.use(express.json()); // used the json file
app.use(cors());

// endpoints
app.get('/', (req, res) => {
    res.send('Testing REST API!');
});

app.get('/transactions', (req, res) => {
    res.send(transactions);
});

app.get('/transaction/:refnum', (req, res) => {
    let result = []
    let transaction = transactions.find(c => c.merchantReferenceNumber === req.params.refnum);
    if (transaction) {
        result = [transaction];
    }
    res.send(result);
});

app.post('/transaction', (req, res) => {
    let body = req.body;
    let newTransaction = {
        id: transactions.length + 1,
        merchantReferenceNumber: body.merchantReferenceNumber, 
        createdDateAndTime: body.createdDateAndTime, 
        totalAmount: body.totalAmount, 
        transactionStatus: body.transactionStatus
    };
    transactions.push(newTransaction);
    res.send(transactions);
});

app.put('/transaction/:id', (req, res) => {
    let body = req.body;
    let transaction = transactions.find(c => c.id === req.params.id);
    if (!transaction) res.status(404).send({err: 'Transaction not found!'});

    transaction.createdDateAndTime = body.createdDateAndTime;
    transaction.totalAmount = body.totalAmount;
    transaction.transactionStatus = body.transactionStatus;
    res.send(transactions);
});

app.delete('/transaction/:id', (req, res) => {
    // do something
});



//Delete Request Handler
// Delete Customer Details
// app.delete('/api/customers/:id', (req, res) => {

//     const customer = customers.find(c => c.id === parseInt(req.params.id));
//     if (!customer) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Not Found!!</h2>');

//     const index = customers.indexOf(customer);
//     customers.splice(index, 1);

//     res.send(customer);
// });

//Validate Information
// function validateCustomer(customer) {
//     const schema = {
//         title: Joi.string().min(3).required()
//     };
//     return Joi.validate(customer, schema);
// }

// server start
app.listen(port, () => {
    console.log(`Listening on port ${port}..`)
});
