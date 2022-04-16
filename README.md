<h1 align="center">emoji-ahk</h1>

This is an AHK script to automatically replace your emojis from their shortcodes (`:emoji_name:` in platforms like Discord, Slack, GitHub) anywhere on your machine.

You type `:smiling_face_with_tear:` and it automagically converts to 🥲!

It supports all emojis available in Discord, or [this table](https://projects.iamcal.com/emoji-data/table.htm) depends on what shortcode type you use.

## Download
The `.ahk` script for both shortcode variant can be found in [releases](https://github.com/beerpiss/emoji-to-ahk/releases).

## Building
The TypeScript code creates an AHK script with a hotstring for every emoji.

Install requirements with `npm install`, then build the script with `npm run build`. The final result should appear in `./dist/emoji.ahk`.

You can customize the script with options laid out in `./src/config.ts`. 

