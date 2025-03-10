import mongoose, { Document, ObjectId, Schema } from "mongoose";
import crypto from "crypto";

// ✅ Define User Interface
export interface IUser extends Document {
  name: string;
  email: string;
  balance: number;
  imageUrl?: string;
  color: string;
  passwordHash: string;
  passwordSalt: string;
  setPassword: (password: string) => void;
  validatePassword: (password: string) => boolean;
}

// ✅ Define Schema
const UserSchema: Schema<IUser> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  balance: { type: Number, required: true },
  imageUrl: { type: String, required: false },
  color: { type: String, required: true },
  passwordHash: { type: String, required: true },
  passwordSalt: { type: String, required: true },
});

// ✅ Method: Set Password
UserSchema.methods.setPassword = function (password: string) {
  this.passwordSalt = crypto.randomBytes(16).toString("hex");
  this.passwordHash = crypto
    .pbkdf2Sync(password, this.passwordSalt, 1000, 64, "sha512")
    .toString("hex");
};

UserSchema.methods.validatePassword = function (password: string) {
  const hash = crypto
    .pbkdf2Sync(password, this.passwordSalt, 1000, 64, "sha512")
    .toString("hex");
  return this.passwordHash === hash;
};

// ✅ Export Model
export default mongoose.model<IUser>("User", UserSchema);
