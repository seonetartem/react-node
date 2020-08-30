export function validateTransaction(userInfo, data) {
    if (data.type === 'credit' && userInfo.balance < data.amount) {
        throw Error('Not enough money')
    }

    return !!(['credit', 'debit'].includes(data.type) && data.description && data.userId)
}

export function updateUserInfo(userInfo, {amount, type}) {
    amount = parseInt(amount, 10)
    userInfo.balance += (amount * (type === 'debit' ? 1 : -1))
}


export function generateId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}
