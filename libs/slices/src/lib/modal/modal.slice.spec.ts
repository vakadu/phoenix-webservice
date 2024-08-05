import { fetchModal, modalAdapter, modalReducer } from './modal.slice';

describe('modal reducer', () => {
	it('should handle initial state', () => {
		const expected = modalAdapter.getInitialState({
			loadingStatus: 'not loaded',
			error: null,
		});

		expect(modalReducer(undefined, { type: '' })).toEqual(expected);
	});

	it('should handle fetchModal', () => {
		let state = modalReducer(undefined, fetchModal.pending(''));

		expect(state).toEqual(
			expect.objectContaining({
				loadingStatus: 'loading',
				error: null,
				entities: {},
				ids: [],
			})
		);

		state = modalReducer(state, fetchModal.fulfilled([{ id: 1 }], ''));

		expect(state).toEqual(
			expect.objectContaining({
				loadingStatus: 'loaded',
				error: null,
				entities: { 1: { id: 1 } },
				ids: [1],
			})
		);

		state = modalReducer(state, fetchModal.rejected(new Error('Uh oh'), ''));

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
