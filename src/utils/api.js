const BASE_URL = 'http://localhost:3300'

const responseWrapper = async (res) => {
    const data = await res.json()
    return data
}

export function getUserInfo() {
    return fetch(`${BASE_URL}/users/1`).then(responseWrapper)
}

export function getTransactions() {
    return fetch(`${BASE_URL}/users/1/transactions`).then(responseWrapper)
}

export function createTransaction(data) {
    return fetch(`${BASE_URL}/users/1/transactions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(responseWrapper)
}
