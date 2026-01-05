export const errorResponse = (exampleMessage: string) => ({
  type: "object",
  properties: {
    message: {
      type: "string",
      example: exampleMessage,
    },
  },
});
