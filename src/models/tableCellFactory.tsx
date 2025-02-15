interface TableCell {
  show(): JSX.Element;
}

class TextCell implements TableCell {
  constructor(content: string) {
    this.content = content;
  }
  content: string;
  show() {
    return <p>{this.content}</p>;
  }
}

class NumberCell implements TableCell {
  constructor(content: number) {
    this.content = content;
  }
  content: number;
  show() {
    return <p>{this.content.toString()}</p>;
  }
}

class DateCell implements TableCell {
  constructor(content: Date) {
    this.content = content;
  }
  content: Date;
  show() {
    return <p>{this.content.toISOString().split("T")[0]}</p>;
  }
}

class NullableCell implements TableCell {
  show() {
    return <p></p>;
  }
}

type CreateCellProps =
  | { type: "text"; data: string | null }
  | { type: "number"; data: number | null }
  | { type: "date"; data: Date | null };

export class TableCellFactory {
  static createCell(props: CreateCellProps): TableCell {
    if (props.data == null) {
      return new NullableCell();
    }
    switch (props.type) {
      case "text":
        return new TextCell(props.data);
      case "number":
        return new NumberCell(props.data);
      case "date":
        return new DateCell(props.data);
      default:
        return new NullableCell();
    }
  }
}
