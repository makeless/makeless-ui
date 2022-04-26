install:
	pnpm install

eslint:
	node_modules/.bin/eslint src --ext ts,js,vue,json

ls-lint:
	node_modules/.bin/ls-lint @ls-lint/ls-lint

yalc-watch:
	~/go/bin/reflex -R '^node_modules/' yalc push