type ClassName = "server" | "location";

type ClassNameObj = Readonly<{ className: ClassName }>;

export function createElement(
  _tag: never,
  _classNameObj: ClassNameObj,
  _args: never
) {
  return {};
}

export type VFC<_T> = any;
export type FC<_Props> = any;
