const connectDB = require("./server/config/db")
const models = require("./server/models/user");
const bcrypt = require("bcrypt")



connectDB().then(async()=>{
    await models.insertMany([
        {
            name: "Folarin Oladimeji",
            email: "folarinoladimeji@gmail.com",
            username: "stevenian1234",
            contact: "Ibeju lekki, Lagos",
            password:  await bcrypt.hash('Fola1234567', 10),
            phone_number: "07040701165",
            gender: "male"
        }
    ])
    
    console.log("Added to db successfully");
    process.exit(1)
}).catch((err) => {
    console.log("Error seeding", err);
    return err
})