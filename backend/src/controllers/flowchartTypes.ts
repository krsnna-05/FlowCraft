import z from "zod";

const nodeSchema = z
  .object({
    id: z.string().describe("Unique identifier for the node"),
    type: z
      .enum(["horizontal", "vertical"])
      .describe("Orientation of the node"),
    handles: z
      .object({
        top: z.boolean().describe("Top handle availability"),
        bottom: z.boolean().describe("Bottom handle availability"),
        left: z.boolean().describe("Left handle availability"),
        right: z.boolean().describe("Right handle availability"),
      })
      .describe("Node connection handles"),
    label: z.string().describe("Display label for the node"),
    pos: z
      .object({
        x: z.number().describe("X coordinate"),
        y: z.number().describe("Y coordinate"),
      })
      .describe("Node position"),
  })
  .describe("Node configuration");

const edgeSchema = z
  .object({
    id: z.string().describe("Unique identifier for the edge"),
    sourceId: z.string().describe("Source node ID"),
    targetId: z.string().describe("Target node ID"),
    handles: z
      .object({
        sourceHandle: z
          .enum(["top", "bottom", "left", "right"])
          .describe("Source node handle position"),
        targetHandle: z
          .enum(["top", "bottom", "left", "right"])
          .describe("Target node handle position"),
      })
      .describe("Edge connection handles"),
  })
  .describe("Edge configuration");

const flowchartOperationSchema = z.object({
  operation: z.enum(["ADD_NODE", "ADD_EDGE"]),
  nodeData: nodeSchema.optional(),
  edgeData: edgeSchema.optional(),
});

export { nodeSchema, edgeSchema, flowchartOperationSchema };
