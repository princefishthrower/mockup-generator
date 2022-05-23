import axios from "axios";
import { IGenerationData } from "../../interfaces/IGenerationData";

export const getGenerationTask = async (
  taskKey: string
): Promise<Array<IGenerationData>> => {
  var config = {
    method: "get",
    url: `https://api.printful.com/mockup-generator/task?task_key=${taskKey}`,
    headers: {
      Authorization: `Basic ${process.env.PRINTFUL_API_TOKEN}`,
    },
  };

  try {
    const response = await axios(config);
    const status = response.data.result.status;
    if (status === "completed") {
      const mockups = response.data.result.mockups;
      let generationData: Array<IGenerationData> = []
      for (var i = 0; i < mockups.length; i++) {
        generationData.push({
          fileUrl: mockups[i].extra[0].url,
          variantId: mockups[i].variant_ids[0]
        })
      }
      return generationData;
    }
    return [];
  } catch (error) {
    console.log(error);
    throw error;
  }
};
