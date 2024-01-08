import HtmlWebpackPlugin from 'html-webpack-plugin';
import { Configuration, ProgressPlugin } from 'webpack';
import { BuildOptions } from './types';

export function buildPlugins(options: BuildOptions): Configuration['plugins'] {
	const plugins: Configuration['plugins'] = [
		new ProgressPlugin((percentage) => {
			if (percentage === 1) {
				console.log(`Bundle finished at ${new Date().toLocaleTimeString()}`);
			}
		}),
		new HtmlWebpackPlugin({
			template: options.paths.html,
		}),
	];

	return plugins;
}
