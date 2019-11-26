import uuid from "uuid";

const Id = Object.freeze({
  makeUuid: (): string => uuid()
  //   isValidId: cuid.isCuid
});

export default Id;
