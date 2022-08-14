import { uiActions } from "./ui-slice";
import { cartActions, CartState } from "./cart-slice";
import { AppDispatch } from ".";

export const fetchCartData = () => {
    return async (dispatch: AppDispatch) => {
        const fetchData = async () => {
            const response = await fetch(
                process.env.REACT_APP_FIREBASE_DEMO_URL + "cart.json"
            );

            if (!response.ok) {
                throw new Error("Could not fetch cart data!");
            }

            const data = await response.json();

            return data;
        };

        try {
            const cartData = await fetchData();
            dispatch(
                cartActions.replaceCart({
                    items: cartData.items || [],
                    totalQuantity: cartData.totalQuantity,
                })
            );
        } catch (error) {
            dispatch(
                uiActions.showNotification({
                    status: "error",
                    title: "Error!",
                    message: "Fetching cart data failed!",
                })
            );
        }
    };
};

export const sendCartData = (cart: CartState) => {
    return async (dispatch: AppDispatch) => {
        dispatch(
            uiActions.showNotification({
                status: "pending",
                title: "Sending...",
                message: "Sending cart data!",
            })
        );

        const sendRequest = async () => {
            const response = await fetch(
                process.env.REACT_APP_FIREBASE_DEMO_URL + "cart.json",
                {
                    method: "PUT",
                    body: JSON.stringify({
                        items: cart.items,
                        totalQuantity: cart.totalQuantity,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Sending cart data failed.");
            }
        };

        try {
            await sendRequest();

            dispatch(
                uiActions.showNotification({
                    status: "success",
                    title: "Success!",
                    message: "Sent cart data successfully!",
                })
            );
        } catch (error) {
            dispatch(
                uiActions.showNotification({
                    status: "error",
                    title: "Error!",
                    message: "Sending cart data failed!",
                })
            );
        }
    };
};
