import Transaction, { ITransaction } from "../models/transaction.model";

/**
 * Create a new transaction and save it to the database.
 * @param {Partial<ITransaction>} transactionData - Transaction details.
 * @returns {Promise<ITransaction>} Saved transaction.
 */
export const createTransaction = async (
  transactionData: Partial<ITransaction>
): Promise<ITransaction> => {
  const transaction = new Transaction(transactionData);
  return await transaction.save();
};

export default {
  createTransaction,
};
