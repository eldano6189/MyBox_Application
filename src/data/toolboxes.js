import { vmBasic } from "./vmBasic";
import { vmSupplementary } from "./vmSupplementary";
import { halfordsAdvanced } from "./halfordsAdvanced";
import ToolboxIcon from "../assets/svg/toolboxIcon/toolboxIcon";
import ToolboxSuppIcon from "../assets/svg/toolboxIcon/toolboxSuppIcon";
import ToolboxArmrIcon from "../assets/svg/toolboxIcon/toolboxArmrIcon";

export const toolboxes = [
  {
    name: "VM Basic",
    url: "vmbasic",
    nsn: "5140-99-490-3944",
    data: vmBasic,
    available: true,
    icon: ToolboxIcon,
  },
  {
    name: "VM Supplementary",
    url: "vmsuplementary",
    nsn: "5180-99-436-9136",
    data: vmSupplementary,
    available: true,
    icon: ToolboxSuppIcon,
  },
  {
    name: "Armourer Toolbox",
    url: "armrtoolbox",
    nsn: "5180-99-490-4205",
    data: null,
    available: false,
    icon: ToolboxArmrIcon,
  },
  {
    name: "Halfords Advanced Toolbox",
    url: "halfordstoolbox",
    nsn: "Local purchase - Checks only",
    data: halfordsAdvanced,
    available: true,
    icon: ToolboxSuppIcon,
  },
];
