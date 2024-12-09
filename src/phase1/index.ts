import { createPolyanet } from "./createPolyanet";
import { delay } from "../delay";

export async function phase1({ candidateId }: { candidateId: string }) {
  const polyanets = [
    { column: 2, row: 2 },
    { column: 8, row: 2 },
    { column: 3, row: 3 },
    { column: 7, row: 3 },
    { column: 4, row: 4 },
    { column: 6, row: 4 },
    { column: 5, row: 5 },
    { column: 4, row: 6 },
    { column: 6, row: 6 },
    { column: 3, row: 7 },
    { column: 7, row: 7 },
    { column: 2, row: 8 },
    { column: 8, row: 8 },
  ];

  for (const polyanet of polyanets) {
    console.log("🔥 Adding polyanet");
    await delay(300);
    const res = await createPolyanet({ candidateId, ...polyanet });
    console.log("🔥 Adding polyanet", res.status, res.data);
  }
}
