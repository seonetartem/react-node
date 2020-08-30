import React, { useState, useEffect } from 'react';
import { SnackbarProvider, useSnackbar } from 'notistack'

import './App.css';
import { getUserInfo, getTransactions, createTransaction } from './utils/api';
import Header from './components/Header';
import Transactions from './features/transactions';

function App() {
  const [user, setUser] = useState({})
  const [transactions, setTransactions] = useState([])
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    getTransactions().then(data => {
      setTransactions(data)
    })
    getUserInfo().then(data => {
      setUser(data)
    })
  }, [])

  const handleSubmit = async (data) => {
    const trans = await createTransaction(data)
    if (!trans.error) {
      const transList = [...transactions, trans]
      setTransactions(transList)

      const userInfo = await getUserInfo()
      setUser(userInfo)
      enqueueSnackbar('Transaction has been created', { variant: 'success' })
    } else {
      enqueueSnackbar('Failed to create the transaction', { variant: 'error' })
    }

  }

  return (
      <div className="App">
        <Header user={user} />

        <main>
          <Transactions transactions={transactions} handleSubmit={handleSubmit} />
        </main>
      </div>
  );
}

export default App;
