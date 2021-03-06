export enum STATUS {
  checked = 'CHECKED',
  unchecked = 'UNCHECKED',
}

export enum STATE {
  inuse = 'IN USE',
  not_in_use = 'NOT IN USE',
  need_repair = 'NEED REPAIR',
  in_repair = 'IN REPAIR',
  unknown = 'UNKNOWN',
}

export interface Property {
  id: number;
  name: string;
  last_check: Date;
  room: string;
  status: STATUS;
  state: STATE;
  description: string;
}
