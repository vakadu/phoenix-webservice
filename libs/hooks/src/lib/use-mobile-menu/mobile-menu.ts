"use client"

import { useSelector, useDispatch } from "react-redux";

import { PemilyRootState, handleMobileMenu } from "@webservices/slices";

export function useMobileMenu() {
	const dispatch = useDispatch();
	const mobileMenu = useSelector((state: PemilyRootState) => state.layout.mobileMenu);
  
	const setMobileMenu = (val: boolean) => dispatch(handleMobileMenu(val));
  
	return {
		mobileMenu,
		setMobileMenu
	};
}

export default useMobileMenu;
