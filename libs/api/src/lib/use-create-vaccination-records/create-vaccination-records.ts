import { useState, useCallback } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UseCreateVaccinationRecords {
	count: number;
	increment: () => void;
}

export function useCreateVaccinationRecords(): UseCreateVaccinationRecords {
	const [count, setCount] = useState(0);
	const increment = useCallback(() => setCount((x) => x + 1), []);
	return { count, increment };
}

export default useCreateVaccinationRecords;
