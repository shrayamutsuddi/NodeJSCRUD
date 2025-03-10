const express = require("express")
const users = require("./MOCK_DATA.json")
const fs = require("fs");
const e = require("express");
const app = express()
const PORT = 8000;

//Middleware
app.use(express.urlencoded({extended:false}))

//ROUTES 
app.get("/users", (req, res) => {
    const html = `
    <ul>
        ${users.map((abc) => `<li>${abc.first_name}</li>`).join("")}
    </ul>
    `;
    res.send(html);
})


app.get("/api/users", (req, res) => {
    return res.json(users)
})

app.get("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
})

app.post("/api/users", (req, res) => {
    //todo: add a new user
    const body = req.body
    console.log(body)
    users.push({...body, id: users.length+1})
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            return res.json({status: "SUCCESS", id: users.length})
        }
    })
    
})

app.patch("/api/users/:id", (req, res) => {
    //todo: edit a user with the id

    return res.json({status: "pending"})
})

app.delete("/api/users/:id", (req, res) => {
    //todo: delete a user with the id
    const paramId = Number(req.params.id)
    const index = users.findIndex((x) => x.id === paramId)
    if(index !== -1) {
        users.splice(index, 1)
        return res.json({status:"SUCCESS"})
    }
    else{
        return res.json({status: "FAILED", message: "ID not found"})
    }
    
})




app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`)
})