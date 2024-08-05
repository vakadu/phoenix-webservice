import { fetchSnackbar, snackbarAdapter, snackbarReducer } from './snackbar.slice';

describe('snackbar reducer', () => {
	it('should handle initial state', () => {
		const expected = snackbarAdapter.getInitialState({
			loadingStatus: 'not loaded',
			error: null,
		});

		expect(snackbarReducer(undefined, { type: '' })).toEqual(expected);
	});

	it('should handle fetchSnackbar', () => {
		let state = snackbarReducer(undefined, fetchSnackbar.pending(''));

		expect(state).toEqual(
			expect.objectContaining({
				loadingStatus: 'loading',
				error: null,
				entities: {},
				ids: [],
			})
		);

		state = snackbarReducer(state, fetchSnackbar.fulfilled([{ id: 1 }], ''));

		expect(state).toEqual(
			expect.objectContaining({
				loadingStatus: 'loaded',
				error: null,
				entities: { 1: { id: 1 } },
				ids: [1],
			})
		);

		state = snackbarReducer(state, fetchSnackbar.rejected(new Error('Uh oh'), ''));

		expect(state).toEqual(
			expect.objectContaining({
				loadingStatus: 'error',
				error: 'Uh oh',
				entities: { 1: { id: 1 } },
				ids: [1],
			})
		);
	});
});
