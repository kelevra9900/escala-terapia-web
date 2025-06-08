// Manage date utilities for the application
import {format,parseISO} from 'date-fns';
import {es} from 'date-fns/locale';

/**
 * Formats a date string into a more readable format.
 * @param {string} dateString - The date string to format.
 * @returns {string} - The formatted date string.
 */
export function formatDate(dateString: string): string {
	const date = parseISO(dateString);
	if (!date) {
		return '';
	}
	// Format the date to 'dd MMMM yyyy' MXN
	// Example: '01 Enero 2023'
	return format(date,'dd MMMM yyyy',{locale: es});
}

/**
 * Formats a date string into a more readable format with time.
 * @param {string} dateString - The date string to format.
 * @returns {string} - The formatted date string with time.
 */
export function formatDateWithTime(dateString: string): string {
	const date = parseISO(dateString);
	return format(date,'dd MMMM yyyy HH:mm');
}