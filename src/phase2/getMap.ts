import axios from "axios";

export async function getMapByCandidate(candidateId: string ) {
  return axios.get(
    `https://challenge.crossmint.com/api/map/${candidateId}`
  );
}
