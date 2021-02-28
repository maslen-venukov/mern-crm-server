const getTotalPrice = arr => arr.reduce((sum, next) => sum + next.cost * next.quantity, 0);

module.exports = getTotalPrice;