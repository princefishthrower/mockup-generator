import axios from "axios";
import probe from 'probe-image-size'

export const createGenerationTask = async (
  sourceUrl: string,
  variantIDs: Array<number>,
  top: number
): Promise<string> => {
  try {
    const result = await probe(sourceUrl);
    const sourceImageHeight = result.height;
    const sourceImageWidth = result.width;

    const fullWidth = 1800;
    const heightCalculated = (fullWidth * sourceImageHeight) / sourceImageWidth;

    const data = {
      variant_ids: variantIDs,
      format: "png",
      files: [
        {
          placement: "front",
          image_url: sourceUrl,
          position: {
            area_width: 1800,
            area_height: 2400,
            width: fullWidth,
            height: heightCalculated,
            top,
            left: 0,
          },
        },
      ],
    };
    var config = {
      method: "post",
      url: "https://api.printful.com/mockup-generator/create-task/456",
      headers: {
        Authorization: `Basic ${process.env.PRINTFUL_API_TOKEN}`,
        "Content-Type": "text/plain",
      },
      data: JSON.stringify(data),
    };

    try {
      const response = await axios(config);
      return response.data.result.task_key;
    } catch (error) {
      console.log(error);
      throw error;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
