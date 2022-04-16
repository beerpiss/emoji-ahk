import * as discordEmojis from 'discord-emoji';
import get from 'axios';
import { replacements, disabledProcesses, variant } from './config';
import { EmojiData, Shortcode } from './types';
import { writeFileSync, existsSync, mkdirSync } from 'fs';

const ahkHeader = [
  "#NoEnv  ; Recommended for performance and compatibility with future AutoHotkey releases.",
  "SendMode Input  ; Recommended for new scripts due to its superior speed and reliability.",
  "SetWorkingDir %A_ScriptDir%  ; Ensures a consistent starting directory.",
  "#Hotstring EndChars :",
  "#Hotstring O",
  "#SingleInstance",
  "",
].join('\n')

async function getEmojiData(): Promise<EmojiData[]> {
  return (await get('https://raw.githubusercontent.com/iamcal/emoji-data/master/emoji.json')).data;
}

function getAllDiscordEmojis(): { [key: string]: any } {
  return Object.keys(discordEmojis).map(m => {
    return Object.entries(discordEmojis[m as keyof typeof discordEmojis]).map(([emojiName, emoji]) => {
      const obj: { [key: string]: any } = {};
      obj[emojiName] = emoji;
      return obj;
    })
      .reduce((prev, curr) => {
        return Object.assign(prev, curr);
      });
  })
    .reduce((prev, curr) => {
      return Object.assign(prev, curr);
    });
}

async function main(): Promise<void> {
  if (!existsSync('./dist')) {
    mkdirSync('./dist')
  }
  writeFileSync('./dist/emoji.ahk', `\ufeff${ahkHeader}\n#If ${disabledProcesses}\n`, { flag: 'w' });

  switch (variant) {
    // @ts-ignore
    case Shortcode.DISCORD: {
      const allEmojis = getAllDiscordEmojis();
      Object.entries(replacements).forEach(value => {
        allEmojis[value[1]] = allEmojis[value[0]];
      });
      Object.entries(allEmojis).forEach(([emojiName, emoji]) => {
        if (emojiName.length > 40) {
          console.warn(`Shortcode ${emojiName} is longer than AHK limit.`);
        }
        const content = [
          `; ${emojiName}`,
          `:::${emojiName.substring(0, 39)}::${emoji}\n`,
        ].join('\n');
        writeFileSync('./dist/emoji.ahk', content, { flag: 'a' });
      })
      break;
    }
    // @ts-ignore
    case Shortcode.COMMON: {
      const allEmojis = await getEmojiData();
      allEmojis.forEach(data => {
        if (data.short_name.length > 40) {
          console.warn(`Shortcode ${data.short_name} is longer than AHK limit.`);
        }
        const emojiCodepoint = data.unified.split('-').map(x => Number(`0x${x}`));
        let content = [
          `; ${data.name}`,
          `:::${data.short_name.substring(0, 39)}::${String.fromCodePoint(...emojiCodepoint)}`,
        ];
        if (replacements[data.short_name] !== undefined) {
          content = content.concat([
            `:::${replacements[data.short_name].substring(0, 39)}::${String.fromCodePoint(...emojiCodepoint)}`,
          ]);
        }
        content[content.length - 1] = `${content[content.length - 1]}\n`;
        writeFileSync('./dist/emoji.ahk', content.join('\n'), { flag: 'a' });
      });
      break;
    }
  }
}

main();
