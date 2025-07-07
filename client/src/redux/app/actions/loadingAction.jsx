import { setLoading } from '../slices/loadingSlice';

export const loadingAction = (isLoading, dispatch) => {
	dispatch(setLoading(isLoading));
};
