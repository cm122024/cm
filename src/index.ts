import { phase1 } from "./phase1";
import { phase2 } from "./phase2";

const candidateId = "249beb4d-7aec-48a8-8ee6-cff06019ef9a";

async function main() {
  try {
    // await phase1({ candidateId })
    await phase2({ candidateId });
  } catch (error) {
    console.log("❌ main", error);
    process.exit(1);
  }
}

main();
