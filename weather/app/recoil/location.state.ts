import { atom } from 'recoil'

import { LocalStorageManager } from '../utils'

export const nameLocation = atom({
  key: "nameLocation",
  default: LocalStorageManager.getItem("location") ?? "Одесса",
});

// export const openLocationDialog = atom({
//   key: "openLocationDialog",
//   default: false,
//   // default: LocalStorageManager.getItem("location") ?? "Одесса",
// });
