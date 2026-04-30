import { useTransactions } from './hooks/useTransactions';
import { DashboardMetrics } from './components/DashboardMetrics';
import { TransactionsChart } from './components/TransactionsChart';
import { TransactionForm } from './components/TransactionForm';
import { TransactionList } from './components/TransactionList';

function App() {
  const { transactions, metrics, loading, addTransaction, deleteTransaction } = useTransactions();

  if (loading && !metrics) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-background via-[#1a1130] to-[#0f0b1f]">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8 pt-8 md:pt-12 bg-gradient-to-br from-background via-[#1a1130] to-[#0f0b1f]">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
            Financial Dashboard
          </h1>
          <p className="text-slate-400">Track your income and expenses effortlessly.</p>
        </header>

        {metrics && <DashboardMetrics metrics={metrics} />}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {metrics && <TransactionsChart data={metrics.chartData} />}
            <TransactionList transactions={transactions} onDelete={deleteTransaction} />
          </div>
          
          <div className="lg:col-span-1">
            <TransactionForm onSubmit={addTransaction} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
