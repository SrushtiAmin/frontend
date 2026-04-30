import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { DashboardMetrics as MetricsType } from '../hooks/useTransactions';

interface Props {
  metrics: MetricsType;
}

export const DashboardMetrics = ({ metrics }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Balance Card */}
      <div className="bg-slate-800/40 border border-slate-700/50 p-6 rounded-3xl backdrop-blur-md">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-primary/20 text-primary rounded-2xl">
            <DollarSign size={24} />
          </div>
          <h3 className="text-slate-400 font-medium">Total Balance</h3>
        </div>
        <p className="text-4xl font-bold text-white tracking-tight">
          ${metrics.balance.toLocaleString()}
        </p>
      </div>

      {/* Income Card */}
      <div className="bg-slate-800/40 border border-slate-700/50 p-6 rounded-3xl backdrop-blur-md">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-2xl">
            <TrendingUp size={24} />
          </div>
          <h3 className="text-slate-400 font-medium">Total Income</h3>
        </div>
        <p className="text-3xl font-bold text-white tracking-tight">
          ${metrics.totalIncome.toLocaleString()}
        </p>
      </div>

      {/* Expense Card */}
      <div className="bg-slate-800/40 border border-slate-700/50 p-6 rounded-3xl backdrop-blur-md">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-red-500/20 text-red-400 rounded-2xl">
            <TrendingDown size={24} />
          </div>
          <h3 className="text-slate-400 font-medium">Total Expenses</h3>
        </div>
        <p className="text-3xl font-bold text-white tracking-tight">
          ${metrics.totalExpense.toLocaleString()}
        </p>
      </div>
    </div>
  );
};
