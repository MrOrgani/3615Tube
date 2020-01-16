// import FileReader from "FileReader";

const getMimetype = (signature: string) => {
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
  try {
    let errorCount: number = 0;
    // const parsedPic = await JSON.parse(pic);
    const readerProof = new FileReader();

    readerProof.onloadend = function(evt: any) {
      const uint = new Uint8Array(evt.target.result); //turns the 4 letter string into an array of unsigned int
      let bytes: any = []; // take every byte and turn it into hex
      uint.forEach(byte => {
        bytes.push(byte.toString(16));
      });
      const hex = bytes.join("").toUpperCase() as string;
      if (hex && getMimetype(hex).slice(0, 5) !== "image") {
        errorCount++;
        return;
      }
    };
    await readerProof.readAsArrayBuffer(pic);
    if (errorCount) return false;
    else return true;
  } catch (err) {
    return false;
  }
}
