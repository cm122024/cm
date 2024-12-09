import axios from "axios";
import { EntityType, SoloonTypeSchema } from "../z";

export async function updateEntity({
  candidateId,
  column,
  entityType,
  row,
}: {
  candidateId: string;
  column: number;
  entityType: EntityType;
  row: number;
}) {
  let path = "";
  let color = undefined;
  let direction = undefined;

  if (entityType === "POLYANET") {
    path = "polyanets";
  } else {
    path = `${entityType.split("_")[1].toLowerCase()}s`;
    if (SoloonTypeSchema.safeParse(entityType).success)
      color = entityType.split("_")[0].toLowerCase();
    else direction = entityType.split("_")[0].toLowerCase();
  }

  return axios.post(`https://challenge.crossmint.io/api/${path}`, {
    candidateId,
    color,
    column,
    direction,
    row,
  });
}
