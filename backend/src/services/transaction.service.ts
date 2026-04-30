import * as TransactionModel from '../models/transaction.model';

export const getAllTransactions = () => {
  return TransactionModel.getTransactions();
};

export const addTransaction = (data: Omit<TransactionModel.Transaction, 'id'>) => {
  return TransactionModel.addTransaction(data);
};

export const deleteTransaction = (id: string) => {
  return TransactionModel.deleteTransaction(id);
};

export const getDashboardMetrics = () => {
  const transactions = TransactionModel.getTransactions();
  
  let totalIncome = 0;
  let totalExpense = 0;

  transactions.forEach(t => {
    if (t.type === 'income') totalIncome += t.amount;
    if (t.type === 'expense') totalExpense += t.amount;
  });

  const balance = totalIncome - totalExpense;

  // Group by date for chart (simple last 7 days aggregation for demo)
  const chartDataMap = new Map<string, { income: number; expense: number }>();
  
  // Initialize last 7 days
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    chartDataMap.set(dateStr, { income: 0, expense: 0 });
  }

  transactions.forEach(t => {
    const dateStr = new Date(t.date).toISOString().split('T')[0];
    if (chartDataMap.has(dateStr)) {
      const current = chartDataMap.get(dateStr)!;
      if (t.type === 'income') current.income += t.amount;
      if (t.type === 'expense') current.expense += t.amount;
    }
  });

  const chartData = Array.from(chartDataMap.entries()).map(([date, data]) => ({
    date,
    ...data
  }));

  return {
    balance,
    totalIncome,
    totalExpense,
    chartData
  };
};
