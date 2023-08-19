import { ProductType } from "./enums.js";

interface Product {
  productId: number;
  name: string;
  deliveryDays: number[];
  productType: ProductType
  daysInAdvance: number;
}

export interface deliveryScheduleResponse {
  postalCode: number;
  deliveryDate: string;
  isGreenDelivery: boolean;
}

export interface filterValidProductsConfig {
  products: Product[];
  deliveryDate: Date;
  today: Date;
}

export type deliverySchedule = {
  status: boolean,
  message: string,
  deliverySchedule: deliveryScheduleResponse[]
}

export type GetDeliveryDates = (postalCode: number, products: Product[]) => deliveryScheduleResponse[];
export type IsGreenDelivery = (date: Date) => boolean;
export type FilterValidProductsForDelivery = (props: filterValidProductsConfig) => Product[];

