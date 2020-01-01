export default expenses => {
  return expenses
    .map(expense => expense.amount)
    .reduce((accumulator, current) => accumulator + current, 0);
};
