build:
	npx nwebby ./src ./dist
watch:
	npx nwebby-watch ./src ./dist
clean:
	rm -rf ./dist
web:
	cd dist ; python3 -m http.server

# Cloudfront Distro -> S3 bucket
# Cloudfront: we do not use Cloud-Origin - this does not allow proper static hosting expanding subdir/ -> subdir/index.html
# Cloudfront: we use SSL , DNS records were created
# Cloudfront: we use legacy mode to use the origin cache headers

# Route53: we use an alias for the top jedi.be / A record
# Route53: we use a CNAME / non alias for the www.jedi.be

# S3 bucket has public enabled: otherwise index.html would not be appended

# s3cmd : we set our own cache-control to make sure we can control it
# s3cmd : we enable public (-P) to make files available 
# S3cmd : we use --no-preserve (otherwise our aws/s3 user is exposed in the headers)

sync:
	cd dist ;  s3cmd sync  . s3://www.jedi.be/ --add-header="Cache-Control:public,max-age=60" --exclude "*.css" -P --delete-removed  --no-preserve
	cd dist ;  s3cmd sync  . s3://www.jedi.be/ --add-header="Cache-Control:public,max-age=60" -m "text/css" --exclude "*" --include "*.css" -P --delete-removed  --no-preserve

# Way to update meta stuff without re-uploading
cache:
	s3cmd --recursive modify --add-header="Cache-Control:public,max-age=60"  --no-preserve s3://www.jedi.be/

