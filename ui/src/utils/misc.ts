// and not CEF
export const isEnvBrowser = (): boolean => !(window as any).invokeNative;

// Basic no operation function
export const noop = () => {};

export const getFormatedDate = () => {
	const date = new Date();
	// Array of month names
	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];

	// Extract the parts of the date
	const day = date.getDate();
	const month = monthNames[date.getMonth()];
	const year = date.getFullYear();

	// Extract hours and minutes and format them
	const hours = date.getHours();
	const minutes = date.getMinutes().toString().padStart(2, '0');

	// Determine AM/PM
	const period = hours >= 12 ? 'PM' : 'AM';

	// Format hours in 12-hour format
	const formattedHours = hours % 12 || 12;

	return {
		day,
		month,
		year,
		formattedHours,
		minutes,
		period,
	};
};

export const formatPrice = (price: number) => {
	return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
