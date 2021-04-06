export interface Asset {
  id: string;
  name: string;
  buildingAbbreviationPlusRoom: string;
  mainClassPlusSubclass: string;
  active: boolean;
  lifeMonthsLeft: Date;
  checked: boolean;
}
