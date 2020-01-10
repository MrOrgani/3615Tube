import moment from "moment";

export const formatCommentaryResult = (result: any) => {
  const finalResult = [];
  for (const key in result) {
    let finalObject: any = {};
    finalObject.authorId = {};
    for (const x in result[key]) {
      if (
        x.substring(0, 4) === "user" &&
        x != "user.id_password" &&
        x != "user.id_email"
      ) {
        finalObject["authorId"][x.substring(8, x.length)] = result[key][x];
      }
      if (x.substring(0, 10) === "commentary" && x != "commentary_authorId") {
        if (x === "commentary_createdAt") {
          finalObject[x.substring(11, x.length)] = moment(
            result[key][x]
          ).fromNow();
        } else {
          finalObject[x.substring(11, x.length)] = result[key][x];
        }
      }
    }
    finalResult.push(finalObject);
  }
  return finalResult;
};
