import axios from "axios";

export async function getGoal({ candidateId }: { candidateId: string }) {
  return axios.get(
    `https://challenge.crossmint.io/api/map/${candidateId}/goal`
  );
}
