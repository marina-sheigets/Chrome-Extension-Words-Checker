import { ModuleOptions } from 'webpack';
import { BuildOptions } from './types';

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
	return [
		{
			test: /\.ts?$/,
			use: 'ts-loader',
			exclude: /node_modules/,
		},
	];
}
