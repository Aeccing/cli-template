#!/usr/bin/env sh
set -e
echo "Current tag version:"
# git describe --abbrev=0
git tag
echo ""
echo "Enter release tag version: "
read VERSION
echo  # (optional) move to a new line
read -p "Releasing tag version $VERSION - are you sure? (y/n)" -n 1 -r RELEASE
echo  # (optional) move to a new line

if [[ $RELEASE =~ ^[Yy]$ ]]
then
  echo "Releasing tag $VERSION ..."

  npm --no-git-tag-version --allow-same-version version $VERSION

  echo  # (optional) move to a new line
  echo "git push ..."
  npm version $VERSION --allow-same-version --force --message "chore: [release] $VERSION"
  git push
  git push origin --tags

  # echo "merge master ..."
  # git checkout master
  # git pull
  # git pull origin 
  echo  # (optional) move to a new line
fi
