import React from "react";
import { screen, fireEvent } from "@testing-library/react";

import { renderWithProviders } from "../../utils/test-utils";
import AddProduct from "./AddProduct";

describe("addProduct component", () => {
	it("disables add button", () => {
		renderWithProviders(<AddProduct />);

		expect(screen.getByText("Add")).toBeDisabled();
	});
	it("clears input fields", () => {
		renderWithProviders(<AddProduct />);
		const inputs = screen.getAllByRole("textbox");

		inputs.forEach((field) => {
			fireEvent.change(field, {
				target: { value: "123456789123456789123456789" },
			});
		});

		const priceInput = screen.getByRole("spinbutton");
		inputs.push(priceInput);
		fireEvent.change(priceInput, { target: { value: 23 } });

		fireEvent.click(screen.getByText("Add"));

		expect(inputs.every((field) => field.textContent === "")).toBeTruthy();
	});
	it("shows error message", () => {
		const { container } = renderWithProviders(<AddProduct />);
		const inputs = screen.getAllByRole("textbox");

		inputs.forEach((field) => {
			field.focus();
			fireEvent.change(field, {
				target: { value: "1" },
			});
			field.blur();
		});

		const priceInput = screen.getByRole("spinbutton");
		priceInput.focus();
		fireEvent.change(priceInput, { target: { value: -23 } });
		priceInput.blur();

		expect(container.querySelectorAll("p").length).toEqual(3);
	});
});
