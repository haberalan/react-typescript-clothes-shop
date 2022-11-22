import { CartType } from './Cart';

export type PurchaseType = {
  _id: number;
  user_id: number;
  createdAt: string;
  updatedAt: string;
  total: number;
  items: CartType[];
};
