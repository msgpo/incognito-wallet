#!/usr/bin/env bash

#if [[ ! -z "${IOS_BUILD_CONFIGURATION}" ]]; then
#  FILE=$(find ~/*/work/1/a/build -type f -name "Incognito.ipa" -print -quit)
#  LAST_COMMIT_MESSAGE="$(git show -s --format=%s)"
#  APP_VERSION="$(sed 's/.*\"version\": \"\(.*\)\".*/\1/;t;d' ./package.json)"
#  NEW_FILE_NAME=$APP_VERSION-IOS_BUILD_CONFIGURATION
#
#  cp $FILE $NEW_FILE_NAME.ipa
#
#  chmod +x .circleci/slack-upload.sh
#  .circleci/slack-upload.sh -f $NEW_FILE_NAME.ipa -c '$SLACK_CHANNEL' -s $SLACK_API_KEY -n "$NEW_FILE_NAME" -x "\"$LAST_COMMIT_MESSAGE\""
#fi
