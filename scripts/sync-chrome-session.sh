#!/bin/bash
set -e

SRC_DIR="$HOME/Library/Application Support/Google/Chrome"
DEST_DIR="$HOME/.rankur-parjapati-session"

echo "Syncing parjapatiwork Chrome profile to automation session..."

mkdir -p "$DEST_DIR/Default/Network"

if [ -f "$SRC_DIR/Local State" ]; then
  cp "$SRC_DIR/Local State" "$DEST_DIR/Local State"
fi

if [ -d "$SRC_DIR/Profile 1" ]; then
  [ -f "$SRC_DIR/Profile 1/Preferences" ] && cp "$SRC_DIR/Profile 1/Preferences" "$DEST_DIR/Default/Preferences"
  [ -f "$SRC_DIR/Profile 1/Secure Preferences" ] && cp "$SRC_DIR/Profile 1/Secure Preferences" "$DEST_DIR/Default/Secure Preferences"
  if [ -f "$SRC_DIR/Profile 1/Network/Cookies" ]; then
    cp "$SRC_DIR/Profile 1/Network/Cookies" "$DEST_DIR/Default/Network/Cookies"
  fi
  if [ -f "$SRC_DIR/Profile 1/Cookies" ]; then
    cp "$SRC_DIR/Profile 1/Cookies" "$DEST_DIR/Default/Cookies"
  fi
  echo "✓ Successfully synced parjapatiwork session!"
else
  echo "⚠️ Profile 1 directory not found."
  exit 1
fi
