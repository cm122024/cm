import { isAxiosError } from "axios";
import { updateEntity } from "./updateEntity";
import { getGoal } from "./getGoal";
import { CandidateMapSchema, EntityType, GoalSchema, SpaceType } from "../z";
import { ZodError } from "zod";
import { delay } from "../delay";
import { getMapByCandidate } from "./getMap";
import { deleteEntity } from "./deleteEntity";

export async function phase2({ candidateId }: { candidateId: string }) {
  // Get and validate goal map.

  const { data } = await getGoal({ candidateId });
  const goal = GoalSchema.parse(data.goal);

  // Get candidate map.
  const { data: candidateData } = await getMapByCandidate(candidateId);

  // Shape candidate map as goal map.

  const candidateMap = CandidateMapSchema.parse(candidateData).map.content.map(
    (row) =>
      row.map((item) =>
        !item
          ? "SPACE"
          : item.type === 0
          ? "POLYANET"
          : item.type === 1
          ? item.color === "red"
            ? "RED_SOLOON"
            : item.color === "blue"
            ? "BLUE_SOLOON"
            : item.color === "white"
            ? "WHITE_SOLOON"
            : "PURPLE_SOLOON"
          : item.direction === "up"
          ? "UP_COMETH"
          : item.direction === "down"
          ? "DOWN_COMETH"
          : item.direction === "right"
          ? "RIGHT_COMETH"
          : "LEFT_COMETH"
      )
  );

  let entities: {
    row: number;
    column: number;
    entityType: EntityType | SpaceType;
  }[] = [];

  for (const [x, row] of goal.entries()) {
    for (const [y, entityType] of row.entries()) {
      // if (entityType === "SPACE") continue;
      entities.push({ row: x, column: y, entityType });
    }
  }

  console.log("👉 Entities to add", entities.length);

  do {
    const currentEntities = [...entities];
    entities = [];

    for (const { row, column, entityType } of currentEntities) {
      try {
        // Nothing to do if current entity = goal entity.
        if (candidateMap[row][column] === entityType) continue;

        if (entityType === "SPACE") {
          await deleteEntity({
            candidateId,
            column,
            entityType: candidateMap[row][column] as EntityType,
            row,
          });
        } else {
          await updateEntity({
            candidateId,
            column,
            entityType,
            row,
          });
        }
        console.log(row, column, entityType, "✅ Entity processed");
      } catch (error) {
        if (isAxiosError(error)) {
          await delay(500);
          console.log(
            row,
            column,
            entityType,
            "❗️ API request failed",
            error.message
          );
        } else if (error instanceof ZodError) {
          console.log(
            row,
            column,
            entityType,
            "❗️ Data validation failed",
            error
          );
        } else {
          console.log(
            row,
            column,
            entityType,
            "❗️ An unexpected error occurred",
            error
          );
        }
        entities.push({ row, column, entityType });
      }
    }

    if (entities.length) {
      console.log(`👉 ${entities.length} entities need to be retried.`);
    }
  } while (entities.length);
  console.log("✅ All entities processed successfully!");
}
