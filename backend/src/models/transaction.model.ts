export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  category: string;
  description: string;
  date: string;
}

// In-memory database
let transactions: Transaction[] = [
  { id: '1', amount: 5000, type: 'income', category: 'Salary', description: 'Monthly Salary', date: new Date(Date.now() - 86400000 * 5).toISOString() },
  { id: '2', amount: 150, type: 'expense', category: 'Groceries', description: 'Supermarket', date: new Date(Date.now() - 86400000 * 3).toISOString() },
  { id: '3', amount: 60, type: 'expense', category: 'Utilities', description: 'Internet Bill', date: new Date(Date.now() - 86400000 * 2).toISOString() },
  { id: '4', amount: 200, type: 'income', category: 'Freelance', description: 'Web Design', date: new Date(Date.now() - 86400000 * 1).toISOString() }
];

export const getTransactions = (): Transaction[] => {
  return [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const addTransaction = (transaction: Omit<Transaction, 'id'>): Transaction => {
  const newTransaction: Transaction = {
    ...transaction,
    id: Date.now().toString(),
  };
  transactions.push(newTransaction);
  return newTransaction;
};

export const deleteTransaction = (id: string): boolean => {
  const initialLength = transactions.length;
  transactions = transactions.filter(t => t.id !== id);
  return transactions.length < initialLength;
};
