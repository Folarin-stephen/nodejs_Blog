const mongoose = require("mongoose");
// const shortid = require("shortid")
const bcrypt = require("bcrypt")

const Schema = mongoose.Schema;
const objectId = Schema.ObjectId;

const UserSchema = new Schema({
  
    first_name: {type: String, require: true},
    last_name: {type: String, require: true},
    username: {type: String, require: true, unique: true},
    email: {type: String, require: true, unique: true},
    contact: {type: String},
    password: { type: String, required: true },
    phone_number: { type: String },
    gender:  { 
      type: String, 
      required: true,
      enum: ['male', 'female']
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    post_id: [{type: Schema.Types.ObjectId, ref: "Post"}]
    });
    UserSchema.pre('save', async function (next) {
      const user = this;
      const hash = await bcrypt.hash(this.password, 10);
      this.password = hash;
      next();
    })
    
    UserSchema.methods.isValidPassword = async function(password) {
      const user = this;
      const compare = await bcrypt.compare(password, this.password);
    
      return compare;
    }

    const UserModel = mongoose.model('Users', UserSchema)
    module.exports = UserModel;