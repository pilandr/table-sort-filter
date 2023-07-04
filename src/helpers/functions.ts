import { TableMainDataKey } from "components/Table/Table.types";

export const getString = (
  value: string | boolean | Date | number | undefined | null,
) => {
  if (value == null) {
    return "";
  }

  if (value instanceof Date) {
    return value?.toISOString().split("T")[0];
  }

  if (typeof value === "boolean") {
    return value ? "true" : "false";
  }

  if (typeof value === "number") {
    return value.toString();
  }

  return value;
};

export const getInputSearchString = (
  value: string,
  nameSort: TableMainDataKey,
) => {
  switch (nameSort) {
    case "age":
    case "userId":
    case "id":
      return value.replace(/\D/g, "");

    case "email":
    case "first_name":
    case "job_title":
    case "last_name":
      return value;

    case "work_start":
    case "ssn":
      return value.replace(/[^0-9|-]/g, "");

    default:
      return value;
  }
};

export const getFieldsName = (): TableMainDataKey[] => [
  "userId",
  "first_name",
  "last_name",
  "age",
  "job_title",
  "email",
  "ssn",
  "work_start",
];
