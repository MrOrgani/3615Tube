// import FileReader from "dom";
// import Blob  from "blob" as any

const getMimetype = (signature: string) => {
  console.log(signature);
  switch (signature) {
    case "89504E47":
      return "image/png";
    case "FFD8FFDB":
    case "FFD8FFE0":
    case "FFD8FFE1":
      return "image/jpeg";
  }
  return "nothing";
};

export async function pictureSecurtiy(pic: any) {
  console.log("in picture security");
  try {
    let errorCount: number = 0;
    // console.log(pic);
    // const parsedPic = await JSON.parse(pic);

    //OLD VERSION
    const readerProof: FileReader = new FileReader();
    // console.log(readerProof);

    readerProof.onloadend = function(evt: any) {
      const uint = new Uint8Array(evt.target.result); //turns the 4 letter string into an array of unsigned int
      let bytes: any = []; // take every byte and turn it into hex
      uint.forEach(byte => {
        bytes.push(byte.toString(16));
      });
      const hex = bytes.join("").toUpperCase() as string;
      console.log(hex, getMimetype(hex));
      if (hex && getMimetype(hex).slice(0, 5) !== "image") {
        errorCount++;
        return;
      }
    };
    await readerProof.readAsArrayBuffer(pic);
    if (errorCount) return false;
    else return true;
  } catch (err) {
    console.log("ther was an error with picture security", err);
    return false;
  }
}
