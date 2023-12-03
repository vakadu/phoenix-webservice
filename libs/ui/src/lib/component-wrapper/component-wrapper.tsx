import { PropsWithChildren, Fragment, ReactNode } from "react";
import Spinner from "../spinner/spinner";
import Status from "../status/status";

/* eslint-disable-next-line */
export interface ComponentWrapperProps {
	loading: boolean;
	error: boolean;
	refetch: () => void;
	loadingText?: string;
	errText?: string;
	btnText?: string;
	loader?: ReactNode;
	errClasses?: string;
	showNothing?: boolean;
	showNothingTxt?: string;
	showNothingBtnTxt?: string;
	showNothingBtn?: () => void;
	showNothingClasses?: string;
	loaderClasses?: string;
}

export function ComponentWrapper(props: PropsWithChildren<ComponentWrapperProps>) {
	const { 
		loading, error, refetch, children, loadingText = '', errText = '', btnText = 'Retry',
		loader, errClasses = '' , showNothing, showNothingTxt = '', showNothingBtnTxt = '',
		showNothingBtn, showNothingClasses = '', loaderClasses
	} = props;

	if(loading) {
		if(loader) {
			return loader;
		} else {
			return(
				<Spinner
					container={`mt-16 flex-col ${loaderClasses}`}
					text={loadingText}
					textClasses='mt-12 text-14'
				/>
			)
		}
	}

	if(error) {
		return(
			<Status
				containerClasses={`mt-16 ${errClasses}`}
				status={errText}
				onClick={() => refetch()}
				buttonClasses='mt-6 !py-6 !text-14'
				buttonText={btnText}
			/>
		)
	}

	if(showNothing) {
		return (
			<Status
				containerClasses={`mt-16 ${showNothingClasses}`}
				status={showNothingTxt}
				onClick={showNothingBtn}
				buttonClasses='mt-6 !py-6 !text-14'
				buttonText={showNothingBtnTxt}
			/>
		)
	}

	return (
		<Fragment>
			{ children }
		</Fragment>
	);
}

export default ComponentWrapper;
