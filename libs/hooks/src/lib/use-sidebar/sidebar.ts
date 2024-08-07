import { useDispatch, useSelector } from 'react-redux';

import { handleSidebarCollapsed, PemilyRootState } from '@webservices/slices';

export function useSidebar() {
	const dispatch = useDispatch();
	const collapsed = useSelector((state: PemilyRootState) => state.layout.isCollapsed);

	const setMenuCollapsed = (val: boolean) => dispatch(handleSidebarCollapsed(val));

	return { collapsed, setMenuCollapsed };
}

export default useSidebar;
