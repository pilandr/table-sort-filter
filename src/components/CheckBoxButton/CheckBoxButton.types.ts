export interface ICheckBoxButtonProps {
  content: Value;
  checked: boolean;
  onChange: (value: number | string | Date | null | boolean) => void;
  className?: string;
}

type Value = {
  label: string;
  value: number | string | Date | null | boolean;
};
