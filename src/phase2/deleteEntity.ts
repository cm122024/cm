import axios from "axios";
import { EntityType } from "../z";

export async function deleteEntity({
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

  if (entityType === "POLYANET") {
    path = "polyanets";
  } else {
    path = `${entityType.split("_")[1].toLowerCase()}s`;
  }

  return axios.delete(`https://challenge.crossmint.io/api/${path}`, {
    data: JSON.stringify({ candidateId, row, column }),
    headers: { "Content-Type": "application/json" },
  });
}
