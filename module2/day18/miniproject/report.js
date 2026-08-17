export const totalByType = (txns, type) =>
    txns
        .filter(t => t.type === type)
        .reduce((sum, { amount }) => sum + amount, 0);


export const formatReceipts = txns =>
    txns.map(({ customer, amount }) =>
        `${customer}: ${amount} ETB`
    );


export const separateTransactions = txns => {
    const credits = txns.filter(t => t.type === "credit");
    const debits = txns.filter(t => t.type === "debit");

    return { credits, debits };
};


export const correctTransaction = (transaction, newAmount) => ({
    ...transaction,
    amount: newAmount
});