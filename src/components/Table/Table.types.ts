export interface RequestData {
  age: number | null;
  email: string | null;
  first_name: string | null;
  userId: number | null;
  job_title: string | null;
  last_name: string | null;
  ssn: string | null;
  work_start: string | null;
}

type TransformRequestToTable<T> = {
  [P in keyof T]+?: P extends "work_start" ? Date | null : T[P];
};
interface TableMainData extends TransformRequestToTable<RequestData> {
  id?: number | null;
}

export interface TableData extends Required<TableMainData> {
  isFiltered: boolean;
}

export interface SearchData extends TableMainData {
  focusField?: TableMainDataKey | null;
}

export type FilterData = {
  [Property in keyof TableMainData]: string[];
};

export type TableMainDataKey = keyof TableMainData;
