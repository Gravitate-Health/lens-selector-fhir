import { Response, Request } from "express";
import { Logger } from "../utils/Logger";
import { FHIR_URL } from "..";

const LENS_PATH : string = "/Library";

const retrieveLensesNames = async () => {
  try {
    let response = []
    let lenses = await fetch(`${FHIR_URL}${LENS_PATH}`)

    let lensesBundle = await lenses.json()
    if (lensesBundle.total === 0) {
      return []
    }
    for (let entry of lensesBundle.entry) {
      response.push(entry.resource.identifier[0].value)
    }
    return response
  } catch (error) {
    console.log(error);
    return null
  }
}

const retrieveLens = async (lenseId: string): Promise<Object | null> => {
  let lensPath = `${LENS_PATH}?identifier=${lenseId}`
  try {
    let lenses = await fetch(`${FHIR_URL}${lensPath}`)
    let lensesBundle = await lenses.json()
    if (lensesBundle.total === 0) {
      return `No lens found with ${lenseId} identifier`
    }
    return lensesBundle.entry[0].resource
  } catch (error) {
    console.log(error);
    return null 
  }
}

export const getLens = async (req: Request, res: Response) => {
  let reqlens = req.params.lensId as string
  if (!reqlens || reqlens === "undefined") {
    res.status(400).send({
      message: "Provide valid lensId value."
    })
    return
  }
  try {
    let lens = await retrieveLens(reqlens)
    
    if (lens === null) {
      console.log(`Lens ${reqlens} not found.`);
      res.status(404).send({
        message: `Lens ${reqlens} not found.`
      })
    }
    console.log(`Sending lens: ${JSON.stringify(lens)}`);
    res.status(200).send(lens)
    return
  } catch (error) {
    console.log(error);
  }
}

export const getLensesNames = async (_req: Request, res: Response) => {
  Logger.logInfo('focusing.ts', 'getLensesNames', `queried /lenses function`)
  let lensesNames = await retrieveLensesNames()
  if (!lensesNames) {
    res.status(500).send({
      message: "Error occurred while reading lenses directory."
    });
    return
  }
  res.status(200).send({
    lenses: lensesNames
  });
  return
};
