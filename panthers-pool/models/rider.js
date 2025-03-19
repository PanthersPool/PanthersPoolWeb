import BaseModel from "./BaseModel";

export default class rider extends BaseModel {
  // Table name is the only required property.
  static get tableName() {
    return "rider";
  }

  // Objection.js assumes primary key is `id` by default
  static get idColumn() {
    return "riderID";
  }

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        riderID: { type: "integer" },
        firstName: { type: "string" },
        lastName: { type: "string" },
        age: { type: "integer" },
        phone: { type: "string" },
        email: { type: "string" },
        profilePicture: { type: "string", format: "binary" },
      },
    };
  }
}
