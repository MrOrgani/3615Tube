// // import { fetchRawData, recursivelyAdd } from "./fetchRawData";
// import { formatSearch } from "./formats";
// import { seedYts } from "./fetchRawData";

// async () => {
//   try {
//     //FETCH DATA
//     const ytsCleanResult = await seedYts();
//     console.log(
//       " ---- RESULT FROM YTS ---- ",
//       ytsCleanResult.length,
//       ytsCleanResult[0]
//     );
//     return null;
//     // console.log(
//     //   " ---- RESULT FROM POPCORN ---- ",
//     //   pctRawResult.length,
//     //   pctRawResult[0]
//     // );

//     //FORMATER PCT
//     // const pctCleanList = await formatSearch(
//     //   pctRawResult,
//     //   "pct",
//     //   pctRawResult
//     // );
//     // console.log(
//     //   " ---- CLEAN FILM LIST FROM POPCORN ---- ",
//     //   pctCleanList.length
//     //   // pctCleanList[0]
//     // );
//     //FORMATER YTS ET VERIFIER DOUBLON
//     // const ytsCleanList = await formatSearch(
//     //   ytsRawResult,
//     //   "yts",
//     //   pctRawResult
//     // );
//     // console.log(
//     //   " ---- CLEAN FILM LIST FROM BOTH YTS--  PCT-- ",
//     //   ytsCleanList.length,
//     //   pctCleanList.length
//     //   // ytsCleanList[0]
//     // );
//     // const finalList = pctCleanList.concat(ytsCleanList);
//     // console.log("final List from BOTH", finalList.length);
//     // return finalList;
//   } catch (err) {
//     console.log("error in the film fetching", err);
//     return null;
//   }
// };
