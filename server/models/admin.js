const mongoose = require("mongoose");
// const shortid = require("shortid")
const bcrypt = require("bcrypt")

const Schema = mongoose.Schema;
const objectId = Schema.ObjectId;

const AdminSchema = new Schema({
  
    names: {type: String, require: true},
    username: {type: String, require: true, unique: true},
    email: {type: String, require: true, unique: true},
    password: { type: String, required: true },
    phone_number: { type: String },
    createAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
    });


    // AdminSchema.pre('save', async function (next) {
    //   const admin = this;
    //   const hash = await bcrypt.hash(this.password, 10);
    //   this.password = hash;
    //   next();
    // })
    
    // AdminSchema.methods.isValidPassword = async function(password) {
    //   const admin = this;
    //   const compare = await bcrypt.compare(password, this.password);
    
    //   return compare;
    // }

    const AdminModel = mongoose.model('Admin', AdminSchema)
    module.exports = AdminModel;