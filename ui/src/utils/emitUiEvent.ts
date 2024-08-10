import { isEnvBrowser } from './misc';

export interface DebugEvent<T = any> {
	action: string;
	data?: T;
	internal?: boolean;
}

// Original function signature for an array of DebugEvents
export function emitUiEvent<P>(events: DebugEvent<P>[], timer?: number): void;

// Overloaded function signature for a single DebugEvent
export function emitUiEvent<P>(event: DebugEvent<P>, timer?: number): void;

/**
 * Emulates dispatching an event using SendNuiMessage in the lua scripts.
 * This is used when developing in browser
 *
 * @param events - The event you want to cover
 * @param timer - How long until it should trigger (ms)
 * @param force - Force the event to be dispatched even if not in browser
 */
export function emitUiEvent<P>(
	eventsOrEvent: DebugEvent<P> | DebugEvent<P>[],
	timer = 0,
): void {
	const events = Array.isArray(eventsOrEvent)
		? eventsOrEvent
		: [eventsOrEvent];
	for (const event of events) {
		if (isEnvBrowser() || event.internal) {
			setTimeout(() => {
				!event.internal &&
					console.info(`[DEBUG] Dispatching event: ${event.action}`);
				window.dispatchEvent(
					new MessageEvent('message', {
						data: {
							action: event.action,
							data: event.data,
						},
					}),
				);
			}, timer);
		}
	}
}
