const express = require('express');
const router = express.Router();
const mysplConnection = require('../db/mysqlconn.js')



// Get Employees Data
router.get('/employes', (req, res, next) => {
    mysplConnection.query('SELECT * FROM employes', (err, rows, fields) => {
        if (err) {
            res.send(err)
        } else {
            const data = rows[0].id
            res.send(rows);
        }
    })
})


// Post Employee Data
router.post('/employee', (req, res, next) => {

    const employee = req.body
    // console.log(employee)

    mysplConnection.query('INSERT INTO employes SET ?', employee, (err, rows, fields) => {
        if (err) {
            res.send(err.sqlMessage)
        } else {
            res.send(rows);
        }
    })
})


// Edit Employee Data
router.put('/employe/:id', (req, res, next) => {

    const { name, place, email, phone } = req.body
    const id = req.params.id.slice(0)

    mysplConnection.query('UPDATE employes set name=?,place=?,email=?, phone=? WHERE `id` = ?', [name, place, email, phone, id], (err, rows, fields) => {
        if (err) {
            res.send(err)
        } else {
            console.log(rows)
            res.send(rows);
        }
    })
})



// Delete Employee Data
router.delete('/employe/:id', (req, res, next) => {
    const id = req.params.id.slice(0)
    mysplConnection.query('DELETE FROM employes WHERE id=?', [id], (err, rows, fields) => {
        if (err) { res.send(err) }
        else {
            console.log(rows)
            res.send(rows);
        }
    })
})



module.exports = router