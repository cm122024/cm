import axios from "axios";

export async function deletePolyanet({
  candidateId,
  column,
  row,
}: {
  candidateId: string;
  column: number;
  row: number;
}) {
  return axios.delete("https://challenge.crossmint.io/api/polyanets", {
    data: JSON.stringify({ candidateId, row, column }),
    headers: { "Content-Type": "application/json" },
  });
}