import webpack from 'webpack';
import path from 'path';
import { buildLoaders } from './buildLoaders';
import { buildPlugins } from './buildPlugins';
import { BuildOptions } from './types';

export function buildWebpack(options: BuildOptions): webpack.Configuration {
	const isDev = options.mode === 'development';
	return {
		mode: options.mode ?? 'development',
		entry: options.paths.entry,
		output: {
			path: options.paths.output,
			filename: 'main.js',
			clean: true,
		},
		plugins: buildPlugins(options),
		module: {
			rules: buildLoaders(options),
		},
		resolve: {
			alias: {
				'@Popup': path.resolve(__dirname, 'src/classes/Popup'),
			},
			extensions: ['.js', '.jsx', '.json', '.ts'],
		},
	};
}
