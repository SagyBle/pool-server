import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface ITransaction extends Document {
  description: string;
}

const TransactionSchema: Schema = new Schema({
  description: { type: String, required: true },
});

const Transaction = mongoose.model<ITransaction>(
  "Transaction",
  TransactionSchema
);
export default Transaction;
