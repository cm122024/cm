import axios from "axios";

export async function createPolyanet({
  candidateId,
  column,
  row,
}: {
  candidateId: string;
  column: number;
  row: number;
}) {
  return axios.post("https://challenge.crossmint.io/api/polyanets", {
    candidateId,
    column,
    row,
  });
}