#!/bin/bash

set -eu

NAME=sugarshin
PKGS=(\
  draft-js-emoji-plugin \
  draft-js-mention-plugin \
)

git fetch origin --tags --prune
set +e
TAG=$(git describe --abbrev=0 --tags)
set -e
VERSION=${TAG:1}
echo $VERSION

for PKG in ${PKGS[@]}; do
  SCOPED_PKG="@$NAME/$PKG"
  echo $SCOPED_PKG
  TARGET="$SCOPED_PKG@$VERSION"
  echo $PKG
  if [[ $VERSION && -z "$(npm view "${TARGET}" --json)" ]]; then
    echo $TARGET
    cd $PKG
    node ../oneteam-scripts/packagejson-prepare $NAME $VERSION
    npm publish --access=public
    cd -
  fi
done
