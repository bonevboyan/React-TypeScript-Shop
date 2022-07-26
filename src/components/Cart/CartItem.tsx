import React from "react";
import { useDispatch } from "react-redux";

import classes from "./CartItem.module.css";
import { cartActions, Item } from "../../store/cart-slice";

const CartItem: React.FC<{ item: Item }> = (props) => {
	const dispatch = useDispatch();

	const { name, quantity, totalPrice, price, id } = props.item;

	const removeItemHandler = () => {
		dispatch(cartActions.removeItemFromCart(id));
	};

	const addItemHandler = () => {
		dispatch(
			cartActions.addItemToCart({
				id,
				name,
				price,
			})
		);
	};

	return (
		<li className={classes.item}>
			<header>
				<h3>{name}</h3>
				<div className={classes.price}>
					${+totalPrice.toFixed(2)}{" "}
					<span className={classes.itemprice}>
						(${price.toFixed(2)}/item)
					</span>
				</div>
			</header>
			<div className={classes.details}>
				<div className={classes.quantity}>
					x <span data-testid="quantity">{quantity}</span>
				</div>
				<div className={classes.actions}>
					<button onClick={removeItemHandler}>-</button>
					<button onClick={addItemHandler}>+</button>
				</div>
			</div>
		</li>
	);
};

export default CartItem;
