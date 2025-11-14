import { vmBasic } from "./vmBasic";
import { vmSupplementary } from "./vmSupplementary";

export const toolboxes = [
  {
    name: "VM Basic",
    url: "vmbasic",
    nsn: "5140-99-490-3944",
    data: vmBasic,
    available: true,
  },
  {
    name: "VM Supplementary",
    url: "vmsuplementary",
    nsn: "5180-99-436-9136",
    data: vmSupplementary,
    available: true,
  },
  {
    name: "Armourer Toolbox",
    url: "armrtoolbox",
    nsn: "5180-99-490-4205",
    data: null,
    available: false,
  },
];
