eslint:
	./node_modules/.bin/eslint src/js --ext js,vue,json

ls-lint:
	./node_modules/.bin/ls-lint

test:
	yarn jest
