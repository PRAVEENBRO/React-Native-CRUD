const express = require('express');
const sequelizerouter = express.Router();
const jwt = require('jsonwebtoken')

// const sequelize = require('../db/sequelizeConn')

const db = require('../db/sequelizeConn')
const database = db.users
const RegisterDB = db.Register

console.log('database', database)
console.log('RegisterDB', RegisterDB)



//  get users
sequelizerouter.get('/users', async (req, res) => {
    const data = await database.findAll({})
    res.send(data);
})

//  post users
sequelizerouter.post('/adduser', async (req, res) => {

    const { id, name, email, place, phone } = req.body
    console.log(id, name, email, place, phone)

    // METHOD 1
    const user = await database.build({ name, email, place, phone })
    await user.save().then(() => {
        console.log('saved')
        res.send({
            error: false,
            message: 'User saved successfully',
        })

    })
        .catch(err => {
            console.log("-------", err)
            res.send(err.parent.sqlMessage)
        })



    // METHOD 2
    // const user = await database.create({ id, name, email, place, phone })
    // console.log('------', user)
    // if (user.isNewRecord) {
    //     res.send('posted')
    // }


})

//  edit users
sequelizerouter.put('/Edituser/:id', async (req, res, next) => {
    const id = req.params.id.slice(0)
    // console.log(req.body)
    try {
        const { name, email, place, phone } = req.body
        console.log(name, email, place, phone)
        let data = await database.update({ name, email, place, phone }, { where: { id: id } })
        console.log(data, "-----")
        // data ? 
        res.json({ error: false, message: "update successfull" })

        //  :    res.json({ error: true, message: "update failed" })
    } catch (err) {
        // next(err)
        res.json({ error: true, message: "update failed" })
        // console.log(err, 'oooooooo')
    }

})

//  delete users
sequelizerouter.delete('/Deleteuser/:id', async (req, res, next) => {
    const id = req.params.id.slice(0)

    try {
        let data = await database.destroy({ where: { id: id } })
        data ? res.json({ error: false, message: "deleted successfull" }) :
            res.json({ error: true, message: "deleted failed" })
    } catch (err) {
        next(err)
    }

});


//=================================================================//

sequelizerouter.post('/register', async (req, res) => {

    const { email, password } = req.body
    const data = await RegisterDB.findAll({ where: { email: email } })

    if (data.length > 0) {
        res.send({ error: true, message: "email id alresdy used" })
    } else {
        const user = await RegisterDB.build({ email, password })
        await user.save().then(() => {
            res.send({ error: false, message: 'registered successfully' })
        }).catch(err => {
            res.send({ error: false, message: err.parent.sqlMessage, })
        })

    }
})


sequelizerouter.post('/login', async (req, res) => {

    const { email, password } = req.body
    console.log(email, password)
    const data = await RegisterDB.findAll({ where: { email: email, password: password } })
    const secreatKey = "thisissecreatKey"

    if (data.length > 0) {

        const token = jwt.sign({ email, password }, secreatKey)
        console.log(token)
        res.json({ error: false, message: "login successfully" })
    } else {
        res.json({ error: true, message: "invalid credentials" })

    }

})


module.exports = sequelizerouter