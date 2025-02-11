import { Schema, Document } from 'mongoose';

export interface AccountsSchema extends Document {
  data: Record<string, any>; 
}

export const AccountsSchema = new Schema({
  data: { type: Schema.Types.Mixed, required: true },
});
