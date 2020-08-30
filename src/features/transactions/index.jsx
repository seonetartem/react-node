import React, { useState } from 'react'
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Toolbar, Button } from '@material-ui/core';
import TransactionModal from './TransactionModal';

export default function Transactions({ transactions, handleSubmit }) {
    const [open, setOpen] = useState(false)
    const handleClose = () => setOpen(false)

        return (
            <>
            <Paper>
                <Toolbar>
                    <Button variant="contained" color="primary" onClick={() => setOpen(true)}>Create Transaction</Button>
                </Toolbar>
            <TableContainer>
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell align="center">Description</TableCell>
                    <TableCell align="center">Type</TableCell>
                    <TableCell align="center">Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactions.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">{row.id}</TableCell>
                      <TableCell component="th" scope="row">{row.description}</TableCell>
                      <TableCell align="center">{row.type}</TableCell>
                      <TableCell align="center">{row.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            </Paper>

            <TransactionModal open={open} handleClose={handleClose} handleSubmit={handleSubmit} />
</>
          );
}
