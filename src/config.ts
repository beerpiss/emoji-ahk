export const replacements: { [key: string]: string } = {

}

export const disabledProcesses = [
  "Discord.exe",
].map(m => `#IfWinNotActive, ahk_exe ${m}`);
