const express = require("express")
const route = express.Router()

//ROUTES 
route.get("/users", async(req, res) => {
    const allDbUsers = await User.find()
    const html = `
    <ul>
        ${allDbUsers.map((abc) => `<li>${abc.firstName} - ${abc.gender}</li>`).join("")}
    </ul>
    `;
    res.send(html);
})


route.get("/api/users", async(req, res) => {
    const allDbUsers = await User.find()
    return res.json(allDbUsers)
})

route.get("/api/users/:id", async (req, res) => {
    //const id = Number(req.params.id);
    //const user = users.find((user) => user.id === id);
    const UserById = await User.findById(req.params.id)
    return res.json(UserById);
})

route.post("/api/users", async(req, res) => {
    //todo: add a new user
    const body = req.body
    if(!body || !body.first_name||!body.last_name||!body.email || !body.gender || !body.job_title){
        return res.status(400).json(message="All fields are required.")
    }
    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title
    })
    res.status(201).json({ message: "SUCCESS"})
    console.log("RESULT", result)
    //console.log(body)
    // users.push({...body, id: users.length+1})
    // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, result) => {
    //     if (err) {
    //         console.log(err)
    //     }
    //     else {
    //         return res.json({status: "SUCCESS", id: users.length})
    //     }
    // })
    
})

route.patch("/api/users/:id", async(req, res) => {
    await User.findByIdAndUpdate(req.params.id, {gender : "Male"});
    //todo: edit a user with the id
    return res.json({status: "SUCCESS"})
})

route.delete("/api/users/:id", async(req, res) => {
    await User.findByIdAndDelete(req.params.id)
    return res.json({status: "SUCCESS"})
    //todo: delete a user with the id
    // const paramId = Number(req.params.id)
    // const index = users.findIndex((x) => x.id === paramId)
    // if(index !== -1) {
    //     users.splice(index, 1)
    //     return res.status(201).json({status:"SUCCESS"})
    // }
    // else{
    //     return res.json({status: "FAILED", message: "ID not found"})
    // }
    
})

module.exports = route;