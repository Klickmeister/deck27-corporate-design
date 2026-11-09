#!/bin/sh
# Packt die Download-ZIPs unter assets/corporate-design neu:
# je Paketordner ein ZIP, dazu "alle Logos" und das Gesamtpaket.

set -e
cd "$(dirname "$0")/assets/corporate-design"

rm -f ./*.zip

for dir in [0-9][0-9]-*/; do
  dir=${dir%/}
  num=${dir%%-*}
  name=${dir#*-}
  zip -q -X -r "$num-deck-27-$name.zip" "$dir" -x '*.DS_Store'
done

zip -q -X -r deck-27-logos-alle.zip 0[0-9]-*/ -x '*.DS_Store'
zip -q -X -r deck-27-corporate-design-komplett.zip [0-9][0-9]-*/ -x '*.DS_Store'

ls -lh ./*.zip
