import { Router } from 'express';
import * as TransactionController from '../controllers/transaction.controller';

const router = Router();

router.get('/', TransactionController.getTransactions);
router.post('/', TransactionController.addTransaction);
router.delete('/:id', TransactionController.deleteTransaction);
router.get('/metrics', TransactionController.getMetrics);

export default router;
