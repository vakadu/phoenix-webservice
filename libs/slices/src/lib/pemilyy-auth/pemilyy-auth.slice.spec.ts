import { fetchPemilyyAuth, pemilyyAuthAdapter, pemilyyAuthReducer } from './pemilyy-auth.slice';

describe('pemilyyAuth reducer', () => {
	it('should handle initial state', () => {
		const expected = pemilyyAuthAdapter.getInitialState({
			loadingStatus: 'not loaded',
			error: null,
		});

		expect(pemilyyAuthReducer(undefined, { type: '' })).toEqual(expected);
	});

	it('should handle fetchPemilyyAuth', () => {
		let state = pemilyyAuthReducer(undefined, fetchPemilyyAuth.pending(''));

		expect(state).toEqual(
			expect.objectContaining({
				loadingStatus: 'loading',
				error: null,
				entities: {},
				ids: [],
			})
		);

		state = pemilyyAuthReducer(state, fetchPemilyyAuth.fulfilled([{ id: 1 }], ''));

		expect(state).toEqual(
			expect.objectContaining({
				loadingStatus: 'loaded',
				error: null,
				entities: { 1: { id: 1 } },
				ids: [1],
			})
		);

		state = pemilyyAuthReducer(state, fetchPemilyyAuth.rejected(new Error('Uh oh'), ''));

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
