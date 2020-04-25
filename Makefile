eslint:
	./node_modules/.bin/eslint src --ext ts,js,vue,json

ls-lint:
	./node_modules/.bin/ls-lint

lint:
	yarn lint

build:
	yarn build
