build:
	npx nwebby ./src ./dist
watch:
	npx nwebby-watch ./src ./dist
clean:
	rm -rf ./dist
web:
	cd dist ; python3 -m http.server
