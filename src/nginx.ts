type ClassName = "server" | "location";

type ClassNameObj = Readonly<{ className: ClassName }>;

export function createElement(
  _tag: string,
  _classNameObj: ClassNameObj,
  _args: any
) {
  return {};
}
