import express from 'express'
import cors from 'cors'
import { updateUserInfo, validateTransaction } from './utils.mjs'
import { generateId } from './utils.mjs'

const app = express()

const PORT = 3300
const userInfo = {
    id: 1,
    name: 'Some User',
    balance: 6100
}

const transactions = [
    {id: '_8drczq969', description: 'some description', type: 'debit', amount: 2000, userId: 1},
    {id: '_yzjbdz20b', description: 'some description', type: 'credit', amount: 400, userId: 1},
    {id: '_ffttt1lua', description: 'some description', type: 'credit', amount: 500, userId: 1},
    {id: '_1mvplaxgo', description: 'some description', type: 'debit', amount: 1000, userId: 1},
    {id: '_2glueuxsh', description: 'some description', type: 'debit', amount: 4000, userId: 1},
]

app.use(cors())
app.options('*', cors());
app.use(express.json())

app.get('/users/:id', (req, res) => {
    try {
        res.send(userInfo)
    } catch (err) {
        res.status(400).send({
            error: 'some code',
            errorMessage: err.message
        })
    }
})

app.get('/users/:id/transactions', (req, res) => {
    try {
        res.send(transactions)
    } catch (err) {
        res.status(400).send({
            error: 'some code',
            errorMessage: err.message
        })
    }
})

app.post('/users/:id/transactions', (req, res) => {
    const data = req.body
    try {
        if (validateTransaction(userInfo, data)) {
            const newItem = {
                id: generateId(),
                ...data
            }
            transactions.push(newItem)
            updateUserInfo(userInfo, newItem)
            res.send(newItem)
        }
        res.status(400).send({
            error: 'some code',
            errorMessage: 'Not valid data was sent'
        })
    } catch (err) {
        res.status(400).send({
            error: 'some code',
            errorMessage: err.message
        })
    }
})

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})

