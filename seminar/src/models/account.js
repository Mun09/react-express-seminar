const mongoose = require("mongoose");

const OSchemaDefinition = {
    total : {
      type: Number,
      default: 10000,
    },
    _name : {
      type: String,
      default: ""
    }
};
const OSchemaOptions = { timestamps: true };

const schema = new mongoose.Schema(OSchemaDefinition, OSchemaOptions);

const AccountModel = mongoose.model("account", schema);

module.exports = AccountModel;