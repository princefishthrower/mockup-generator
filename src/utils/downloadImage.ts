import * as fs from 'fs';
import axios from "axios";

export const downloadImage = (url: string, imagePath: string): Promise<void> =>
  axios({
    url,
    responseType: "stream",
  }).then(
    (response) =>
      new Promise((resolve, reject) => {
        response.data
          .pipe(fs.createWriteStream(imagePath))
          .on("finish", () => resolve())
          .on("error", (e: any) => reject(e));
      })
  );
