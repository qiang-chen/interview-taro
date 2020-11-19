/**
 * dva-loading state
 */

type Loading = {
	global: boolean;
	effects: {
		[effect: string]: boolean;
	};
	models: {
		[model: string]: boolean;
	};
}

export default Loading
