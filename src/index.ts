import * as discordEmojis from 'discord-emoji';
import { replacements, disabledProcesses } from './config';
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

function getAllDiscordEmojis(): { [key: string]: any } {
  return Object.keys(discordEmojis).map(m => {
    return Object.entries(discordEmojis[m as keyof typeof discordEmojis]).map(([emojiName, emoji]) => {
      const obj: { [key: string]: any } = {};
      obj[emojiName] = emoji;
      return obj;
    })
      .reduce((prev, curr) => {
        return Object.assign(prev, curr);
      })
  })
    .reduce((prev, curr) => {
      return Object.assign(prev, curr);
    })
}

function main(): void {
  const allEmojis = getAllDiscordEmojis();
  Object.entries(replacements).forEach(value => {
    allEmojis[value[0]] = allEmojis[value[1]];
  })

  if (!existsSync('./output')) {
    mkdirSync('./output')
  }
  writeFileSync('./output/emoji.ahk', `\ufeff${ahkHeader}\n${disabledProcesses}\n`, { flag: 'w' });
  Object.entries(allEmojis).forEach(([emojiName, emoji]) => {
    if (emojiName.length > 40) {
      console.warn(`Shortcode ${emojiName} is longer than AHK limit.`);
    }
    const content = [
      `; ${emojiName}`,
      `:::${emojiName.substring(0, 39)}::${emoji}\n`,
    ].join('\n')
    writeFileSync('./output/emoji.ahk', content, { flag: 'a' });
  })
}

main();
