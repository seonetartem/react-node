import React from 'react'
import { AppBar, Toolbar } from '@material-ui/core'

export default function Header({user}) {

    return (
        <AppBar position="static">
            {user.balance && (<Toolbar>Balance: ${user.balance}</Toolbar>)}
        </AppBar>
    )
}
