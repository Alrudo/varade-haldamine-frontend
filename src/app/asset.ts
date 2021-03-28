export interface Asset {
  id: string;
  name: string;
  subclass: string;
  active: boolean;
  user_id: number;
  possessor_id: number;
  expiration_date: Date;
  delicate_condition: boolean;
  created_at: Date;
  modified_at: Date;
}
