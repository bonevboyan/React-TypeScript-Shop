import React from "react";

import { useAppDispatch } from "../../store/hooks";

import { cartActions } from "../../store/cart-slice";
import Card from "../UI/Card";
import classes from "./ProductItem.module.css";
import { Product } from "../../store/product-slice";

const ProductItem: React.FC<Product> = (props) => {
	const dispatch = useAppDispatch();

	const addToCartHandler = () => {
		dispatch(
			cartActions.addItemToCart({
				id: props.id,
				name: props.title,
				price: props.price,
			})
		);
	};

	return (
		<li className={classes.item}>
			<Card>
				<header>
					<h3>{props.title}</h3>
					<div className={classes.price}>
						${props.price.toFixed(2)}
					</div>
				</header>
				<p>{props.description}</p>
				<div className={classes.actions}>
					<button onClick={addToCartHandler}>Add to Cart</button>
				</div>
			</Card>
		</li>
	);
};

export default ProductItem;
