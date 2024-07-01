const { Hardware, getAllWindows, sleep, GlobalHotkey } = require("keysender");

const win = getAllWindows().find(({ title }) => title == "World of Warcraft");
console.log(win);

const { keyboard, mouse, workwindow } = new Hardware(win.handle);

workwindow.setForeground();
sleep(250);

let state = false;

const sleepAsync = (time) =>
  new Promise((resolve) => setTimeout(resolve, time));

const useSkill = async (key, castTime = 1400) => {
  keyboard.sendKey(key);
  await sleepAsync(castTime);
};

const dpsRotation = async () => {
  while (state == true) {
    await useSkill("1", 1400);
    await useSkill("2");
    await useSkill("3");
  }
};

new GlobalHotkey({
  key: "f5",
  action() {
    state = !state;
    dpsRotation();
  },
});
