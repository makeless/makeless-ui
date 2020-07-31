install:
	yarn

eslint:
	npx eslint src --ext ts,js,vue,json

ls-lint:
	npx @ls-lint/ls-lint

publish:
	~/go/bin/reflex -R '^node_modules/' yalc push