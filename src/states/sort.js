import { atom } from "recoil"

export const sort = atom({
  key: "sort",
  default: {
    name: "По названию (По возрастанию)",
    sortProperty: "title",
  },
})
