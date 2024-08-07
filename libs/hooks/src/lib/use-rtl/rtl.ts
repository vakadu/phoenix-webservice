import { useDispatch, useSelector } from 'react-redux';

import { handleRtl, PemilyRootState } from '@webservices/slices';

export function useRtl() {
	const dispatch = useDispatch();
	const isRtl = useSelector((state: PemilyRootState) => state.layout.isRTL);

	const setRtl = (val: boolean) => dispatch(handleRtl(val));

	return [isRtl, setRtl];
}

export default useRtl;
