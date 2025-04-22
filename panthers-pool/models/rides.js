import BaseModel from "./BaseModel";

export default class rides extends BaseModel {
  // Table name is the only required property.
  static get tableName() {
    return "rides";
  }

  // Objection.js assumes primary key is `id` by default
  static get idColumn() {
    return "rideID";
  }

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        rideID: { type: "integer" },
        driverID: {type: "integer"},
        destination: { type: "string" },
        origin: { type: "string" },
        departureTime: { type: "string", format: "date-time" },
        spotsRemaining: { type: "integer" },
        luggageSpace: {type: "boolean"},
        atLeastOnePassenger: {type: "boolean"},
        Completed: {type: "boolean"},
        riderID: {
            type: "array",
            items: { type: "integer" }
        },
        requests: {
          type: "array",
          items: { type: "integer" }
      },
      },
    };
  }
}
