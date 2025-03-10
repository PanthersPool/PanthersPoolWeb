import BaseModel from "./BaseModel";

export default class driver extends BaseModel {
  // Table name is the only required property.
  static get tableName() {
    return "driver";
  }

  // Objection.js assumes primary key is `id` by default
  static get idColumn() {
    return "driverID";
  }

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        driverID: { type: "integer" },
        firstName: { type: "string" },
        lastName: { type: "string" },
        age: { type: "integer" },
        phone: { type: "string" },
        email: { type: "string" },
        carMake: { type: "string" },
        carColor: { type: "string" },
        carPlate: { type: "string" },
        profilePicture: { type: "string", format: "binary" },
      },
    };
  }
}
