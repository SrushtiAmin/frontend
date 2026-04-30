import { Trash2, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Transaction } from '../hooks/useTransactions';

interface Props {
  transactions: Transaction[];
  onDelete: (id: string) => Promise<void>;
}

export const TransactionList = ({ transactions, onDelete }: Props) => {
  return (
    <div className="bg-slate-800/40 border border-slate-700/50 p-6 rounded-3xl backdrop-blur-md">
      <h3 className="text-xl font-bold text-white mb-6">Recent Transactions</h3>
      
      {transactions.length === 0 ? (
        <div className="text-center py-8 text-slate-400">
          No transactions yet. Add one to get started!
        </div>
      ) : (
        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
          {transactions.map((t) => (
            <div 
              key={t.id} 
              className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/40 border border-slate-700/50 hover:bg-slate-900/80 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${t.type === 'income' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                  {t.type === 'income' ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
                </div>
                <div>
                  <h4 className="text-slate-200 font-medium">{t.category}</h4>
                  <p className="text-sm text-slate-500">{t.description || t.date.split('T')[0]}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <span className={`font-bold ${t.type === 'income' ? 'text-emerald-400' : 'text-slate-200'}`}>
                  {t.type === 'income' ? '+' : '-'}${t.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <button
                  onClick={() => onDelete(t.id)}
                  className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                  title="Delete transaction"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
