import { ButtonProps as ButtonItem } from "../Button";
import { DropdownProps as DropdownItem } from "../Dropdown";
import { MenuItem } from "../MenuList";
import { Logos } from "./HeaderLogo";

export interface HeaderProps {
  frontPageID: string;
  data: Data;
  translatedPages?: {
    fr?: string;
    en?: string;
  };
  elevation?: 0 | 1 | 2 | 3 | 4 | 5;
}

interface ButtonItemWithId extends ButtonItem {
  id: string;
}

interface DropdownItemWithId extends DropdownItem {
  id: string;
}

interface Data {
  buttonItems: ButtonItemWithId[];
  dropdownItems: DropdownItemWithId[];
  menuDataPrimary: MenuItem[];
  menuDataSecondary: MenuItem[];
  logos: Logos;
}
