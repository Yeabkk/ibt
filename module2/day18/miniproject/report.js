export const totalByType = (txns, type) =>
txns.filter(t => t.type === type)
.reduce((sum, { amount }) => sum + amount, 0);