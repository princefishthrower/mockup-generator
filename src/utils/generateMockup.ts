import path from "path";
import { IGenerationData } from "../interfaces/IGenerationData";
import { downloadImage } from "./downloadImage";
import { getVariantIdsFromColors } from "./getVariantIdsFromColors";
import { createGenerationTask } from "./printful-api/createGenerationTask";
import { getGenerationTask } from "./printful-api/getGenerationTask";

export const generateMockup = async (
  sourceUrl: string,
  outputPath: string,
  colors: Array<string>,
  top: number,
  cliInstance: any
) => {
  const variantIDs = getVariantIdsFromColors(colors);
  const taskKey = await createGenerationTask(sourceUrl, variantIDs, top);

  // wait a bit
  setTimeout(() => 5000);
  let generationData: Array<IGenerationData> = [];
  while (generationData.length === 0) {
    generationData = await getGenerationTask(taskKey);
    setTimeout(() => 5000);
  }

  // finally got file urls, download them
  const originalUrlParts = sourceUrl.split('/')
  const originalFileName = originalUrlParts[originalUrlParts.length - 1]
  generationData.forEach(async (data) => {
    const targetFile = path.join(outputPath, `${data.variantId}_${originalFileName}`)
    downloadImage(data.fileUrl, targetFile)
    cliInstance.log(`Saved ${targetFile}.`)
  })
};
