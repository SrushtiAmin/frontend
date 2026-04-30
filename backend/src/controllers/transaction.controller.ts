import { Request, Response } from 'express';
import { z } from 'zod';
import * as TransactionService from '../services/transaction.service';

const transactionSchema = z.object({
  amount: z.number().positive(),
  type: z.enum(['income', 'expense']),
  category: z.string().min(1),
  description: z.string(),
  date: z.string()
});

export const getTransactions = (req: Request, res: Response) => {
  const transactions = TransactionService.getAllTransactions();
  res.json(transactions);
};

export const getMetrics = (req: Request, res: Response) => {
  const metrics = TransactionService.getDashboardMetrics();
  res.json(metrics);
};

export const addTransaction = (req: Request, res: Response) => {
  try {
    const validatedData = transactionSchema.parse(req.body);
    const newTransaction = TransactionService.addTransaction(validatedData);
    res.status(201).json(newTransaction);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation failed', details: error.issues });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

export const deleteTransaction = (req: Request, res: Response) => {
  const { id } = req.params;
  const success = TransactionService.deleteTransaction(id as string);
  if (success) {
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'Transaction not found' });
  }
};
