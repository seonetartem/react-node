import React, { useState } from 'react'
import { makeStyles, Modal, RadioGroup, FormControlLabel, Radio, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

export default function TransactionModal({open, handleClose, handleSubmit}) {
    const [transaction, setTransaction] = useState({
        type: '',
        amount: '',
        description: '',
        userId: 1,
    })

    const classes = useStyles();
    if (!open) {
        return null
    }

    const handleChange = (e) => {
        const {name, value} = e.target
        const data = {...transaction, [name]: value}
        setTransaction(data)
    }

    const submit = () => {
        if (isValid(transaction)) {
            const amount = parseInt(transaction.amount, 10)
            handleSubmit({
                type: transaction.type,
                amount: amount,
                description: transaction.description,
                userId: transaction.userId
            })
            handleClose()
            setTransaction({
                type: '',
                amount: '',
                description: '',
                userId: 1,
            })
        }
    }

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            className={classes.modal}
            closeAfterTransition
        >
        <div className={classes.paper}>
            <form style={{display: 'flex', flexDirection: 'column'}}>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Transaction Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={transaction.type}
                        name="type"
                        onChange={handleChange}
                    >
                        <MenuItem value={'debit'}>Debit</MenuItem>
                        <MenuItem value={'credit'}>Credit</MenuItem>
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <TextField
                        id="description"
                        label="Description"
                        name="description"
                        multiline
                        rowsMax={4}
                        value={transaction.description}
                        onChange={handleChange}
                    />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <TextField
                        id="amount"
                        label="Amount"
                        name="amount"
                        value={transaction.amount}
                        onChange={handleChange}
                    />
                </FormControl>
                <Button onClick={submit}>Save</Button>
            </form>
        </div>

    </Modal>
    )
}

function isValid({ amount, description, type }) {
    return amount && description && type
}
