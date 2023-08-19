import { IsGreenDelivery, FilterValidProductsForDelivery, GetDeliveryDates, deliveryScheduleResponse, filterValidProductsConfig } from "./types.js";

export const isGreenDelivery: IsGreenDelivery = (date) => {
    return date.getDay() === 3;
};

export const filterValidProductsForDelivery: FilterValidProductsForDelivery = (props: filterValidProductsConfig) => {
    const { products, deliveryDate, today } = props;
    return products.filter((product) => {
        const daysUntilDelivery = Math.ceil((deliveryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        const externalProducts = product.productType === 'external';
        const temporaryProducts = product.productType === 'temporary';

        let isOrderable = false;

        if (externalProducts) {
            isOrderable = daysUntilDelivery >= 5;
        } else if (temporaryProducts) {
            isOrderable = daysUntilDelivery <= 7;
        } else {
            isOrderable = daysUntilDelivery >= product.daysInAdvance;
        }

        return product.deliveryDays.includes(deliveryDate.getDay()) && isOrderable;
    });
};

/**
 * The method is responsible for generating a schedule of available delivery dates based on the provided postalCode and products
 * @param postalCode 
 * @param products 
 * @returns postalCode, deliveryDate, isGreenDelivery 
 */
export const getDeliveryDates: GetDeliveryDates = (postalCode, products) => {
    const today = new Date();
    const availableDates: deliveryScheduleResponse[] = [];

    for (let i = 0; i < 14; i++) {
        const deliveryDate = new Date(today);
        deliveryDate.setDate(today.getDate() + i);

        const isGreen = isGreenDelivery(deliveryDate);
        const isGreenWithinThreeDays = isGreen && i < 3;

        const payload: filterValidProductsConfig = {
            products,
            deliveryDate,
            today,
        };

        filterValidProductsForDelivery(payload);

        if (isGreenWithinThreeDays) {
            availableDates.unshift({
                postalCode,
                deliveryDate: deliveryDate.toISOString(),
                isGreenDelivery: true,
            });
        } else {
            availableDates.push({
                postalCode,
                deliveryDate: deliveryDate.toISOString(),
                isGreenDelivery: false,
            });
        }
    }

    return availableDates;
};