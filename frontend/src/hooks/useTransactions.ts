import { useState, useEffect } from 'react';
import { apiClient } from '../api/client';

export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  category: string;
  description: string;
  date: string;
}

export interface ChartDataPoint {
  date: string;
  income: number;
  expense: number;
}

export interface DashboardMetrics {
  balance: number;
  totalIncome: number;
  totalExpense: number;
  chartData: ChartDataPoint[];
}

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [txRes, metricsRes] = await Promise.all([
        apiClient.get<Transaction[]>('/transactions'),
        apiClient.get<DashboardMetrics>('/transactions/metrics')
      ]);
      setTransactions(txRes.data);
      setMetrics(metricsRes.data);
    } catch (error) {
      console.error('Failed to fetch dashboard data', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const addTransaction = async (data: Omit<Transaction, 'id'>) => {
    try {
      await apiClient.post('/transactions', data);
      await fetchDashboardData(); // Refresh everything
    } catch (error) {
      console.error('Failed to add transaction', error);
      throw error;
    }
  };

  const deleteTransaction = async (id: string) => {
    try {
      await apiClient.delete(`/transactions/${id}`);
      await fetchDashboardData();
    } catch (error) {
      console.error('Failed to delete transaction', error);
      throw error;
    }
  };

  return {
    transactions,
    metrics,
    loading,
    addTransaction,
    deleteTransaction,
    refresh: fetchDashboardData
  };
};
