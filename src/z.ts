import { z } from "zod";

const SpaceTypeSchema = z.literal("SPACE");

const PolyanetTypeSchema = z.enum(["POLYANET"]);

const ComethTypeSchema = z.enum([
  "RIGHT_COMETH",
  "LEFT_COMETH",
  "UP_COMETH",
  "DOWN_COMETH",
]);

export const SoloonTypeSchema = z.enum([
  "WHITE_SOLOON",
  "BLUE_SOLOON",
  "PURPLE_SOLOON",
  "RED_SOLOON",
]);

const EntityTypeSchema = z.union([
  PolyanetTypeSchema,
  ComethTypeSchema,
  SoloonTypeSchema,
]);

export type SpaceType = z.infer<typeof SpaceTypeSchema>;
export type EntityType = z.infer<typeof EntityTypeSchema>;

const GoalRowSchema = z.array(z.union([SpaceTypeSchema, EntityTypeSchema]));

export const GoalSchema = z.array(GoalRowSchema);

const Type0Schema = z.object({
  type: z.literal(0),
});

const Type1Schema = z.object({
  type: z.literal(1),
  color: z.union([
    z.literal("white"),
    z.literal("blue"),
    z.literal("purple"),
    z.literal("red"),
  ]),
});

const Type2Schema = z.object({
  type: z.literal(2),
  direction: z.union([
    z.literal("up"),
    z.literal("down"),
    z.literal("left"),
    z.literal("right"),
  ]),
});

const ValidObjectSchema = z.union([Type0Schema, Type1Schema, Type2Schema]);

const RowSchema = z.array(ValidObjectSchema.nullable());

const MapContentSchema = z.array(RowSchema);

export const CandidateMapSchema = z.object({
  map: z.object({
    _id: z.string(),
    content: MapContentSchema,
  }),
});
