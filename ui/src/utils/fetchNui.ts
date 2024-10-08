import { isEnvBrowser } from './misc';

export async function fetchNui<T = any>(
	eventName: string,
	data?: any,
	mockData?: T,
	timeoutMilliseconds: number = 20000, // Default timeout of 20 seconds
): Promise<T> {
	const options = {
		method: 'post',
		headers: {
			'Content-Type': 'application/json; charset=UTF-8',
		},
		body: JSON.stringify(data),
	};

	if (isEnvBrowser() && mockData) return mockData;

	const resourceName = (window as any).GetParentResourceName
		? (window as any).GetParentResourceName()
		: 'nui-frame-app';

	try {
		const respPromise = fetch(
			`https://${resourceName}/${eventName}`,
			options,
		);

		// Use Promise.race to implement a timeout
		const timeoutPromise = new Promise<T>((_, reject) =>
			setTimeout(() => {
				reject(new Error(`Request timed out - ${eventName}`));
			}, timeoutMilliseconds),
		);

		const resp = (await Promise.race([
			respPromise,
			timeoutPromise,
		])) as Response;

		if (!resp?.ok) {
			throw new Error(`HTTP error: ${resp.status} - ${resp.statusText}`);
		}

		const respFormatted = (await resp.json()) as T;

		return respFormatted;
	} catch (error) {
		// Handle exceptions and errors here
		console.error(
			`An error occurred while processing '${eventName}':`,
			error,
		);

		throw error; // Rethrow the error so that the caller can handle it
	}
}
