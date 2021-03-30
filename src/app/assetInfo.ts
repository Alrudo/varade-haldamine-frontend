export interface AssetInfo {
  id: string;
  name: string; // - kirjeldus
  active: boolean;
  userId: number;
  possessorId: number;
  expirationDate: Date;
  lifeMonthsLeft: number;
  delicateCondition: boolean;
  createdAt: Date; // - konteerimise kuupäev
  modifiedAT: Date;

  // table Worth
  price: number; // - soetus
  residualPrice: number; // - jaak
  purchaseDate: Date;
  isPurchased: boolean;

  // table Classification
  subclass: string; // - PV alamklassi tähis
  mainClass: string; // - PV klassi tähis

  // table Kit_relation
  componentAssetId: string; // - ne vivodit
  majorAssetId: string; // - Peavara komponent
  kitPartName: string;

  // table Address
  buildingAbbreviation: string;
  room: string;

  // table Description
  descriptionText: string; // - kirjeldus2

  // table Comment
  commentText: string;

  // Person data
  firstname: string;
  lastname: string;

  // Possessor data
  institute: number;
  division: number;
  subdivision: number;
}
