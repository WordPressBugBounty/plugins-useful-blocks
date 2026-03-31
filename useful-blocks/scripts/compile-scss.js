#!/usr/bin/env node
/* eslint-disable no-console */

// node-sass の代替として sass (Dart Sass) でコンパイルする。
// globパターンを含む @import をプリプロセスで展開してからコンパイルする。
const sass = require('sass');
const { globSync } = require('glob');
const path = require('path');
const fs = require('fs');

const [input, output] = process.argv.slice(2);
if (!input || !output) {
	console.error('Usage: node scripts/compile-scss.js <input> <output>');
	process.exit(1);
}

const inputPath = path.resolve(input);
const outputPath = path.resolve(output);
const inputDir = path.dirname(inputPath);

// glob パターンを含む @import を個別ファイルの @import に展開する
function expandGlobImports(source, baseDir) {
	return source.replace(/@import\s+["']([^"']*\*[^"']*)["']\s*;/g, (_match, pattern) => {
		const absPattern = path.resolve(baseDir, pattern);
		const files = globSync(absPattern).sort();
		return files.map((f) => `@import "${f}";`).join('\n');
	});
}

const source = fs.readFileSync(inputPath, 'utf8');
const expanded = expandGlobImports(source, inputDir);

// 同ディレクトリに一時ファイルを作成（相対 @import の解決のため）
const tmpPath = inputPath.replace(/\.scss$/, '.__tmp__.scss');
fs.writeFileSync(tmpPath, expanded);

try {
	const result = sass.compile(tmpPath, {
		silenceDeprecations: ['import'],
	});
	fs.mkdirSync(path.dirname(outputPath), { recursive: true });
	fs.writeFileSync(outputPath, result.css);
	console.log(`Compiled: ${input} -> ${output}`);
} finally {
	fs.unlinkSync(tmpPath);
}
