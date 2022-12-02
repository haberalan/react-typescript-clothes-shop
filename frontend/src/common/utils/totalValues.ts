import { CartType } from '../../types/Cart';
import { ClothType } from '../../types/Cloth';

export const totalValues = (cartTable: CartType[], clothesTable: ClothType[]) => {
  let total = 0;
  let tax = 0;
  let quantity = 0;

  if (cartTable.length === 0) {
    return {
      total: total.toFixed(2),
      tax: tax.toFixed(2),
      quantity,
    };
  }

  cartTable.forEach((cartItem) => {
    const itemDetails = clothesTable.find((item) => item._id === cartItem._id);

    total += itemDetails!.price * cartItem.amount;
    quantity += cartItem.amount;
  });

  tax = total * 0.21;

  return {
    total: total.toFixed(2),
    tax: tax.toFixed(2),
    quantity,
  };
};
