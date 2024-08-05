import { fetchLayout, layoutAdapter, layoutReducer } from './layout.slice';

describe('layout reducer', () => {
	it('should handle initial state', () => {
		const expected = layoutAdapter.getInitialState({
			loadingStatus: 'not loaded',
			error: null,
		});

		expect(layoutReducer(undefined, { type: '' })).toEqual(expected);
	});

	it('should handle fetchLayout', () => {
		let state = layoutReducer(undefined, fetchLayout.pending(''));

		expect(state).toEqual(
			expect.objectContaining({
				loadingStatus: 'loading',
				error: null,
				entities: {},
				ids: [],
			})
		);

		state = layoutReducer(state, fetchLayout.fulfilled([{ id: 1 }], ''));

		expect(state).toEqual(
			expect.objectContaining({
				loadingStatus: 'loaded',
				error: null,
				entities: { 1: { id: 1 } },
				ids: [1],
			})
		);

		state = layoutReducer(state, fetchLayout.rejected(new Error('Uh oh'), ''));

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
