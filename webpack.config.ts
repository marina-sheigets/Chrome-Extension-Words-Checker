import path from 'path';
import { buildWebpack } from './config/buildWebpack';
import { BuildMode, BuildPath } from './config/types';

interface IEnv {
	mode: BuildMode;
	port: number;
	analyzer?: boolean;
}
export default (env: IEnv) => {
	const paths: BuildPath = {
		output: path.resolve(__dirname, 'build'),
		entry: path.resolve(__dirname, 'src', 'script.ts'),
		html: path.resolve(__dirname, 'public', 'index.html'),
	};
	const config = buildWebpack({
		port: env.port ?? 3000,
		mode: env.mode ?? 'development',
		paths,
		analyzer: env.analyzer,
	});

	return config;
};
