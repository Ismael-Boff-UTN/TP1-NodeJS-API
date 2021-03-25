const express = require('express');
const router = express.Router();
const mysqlConnection = require('../database/mysqlconnection');

//CRUD Empresas
//GET - SE OBTIENEN TODAS LAS EMPRESAS DE LA BASE DE DATOS
router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM empresas', (error, rows, fields) => {
        if (!error) {
            res.json({message:'Empresas Obtenidas Con Exito!',rows});
            console.log('Empresas Obtenidas Con Exito');
        } else {
            res.status(500).send({ error: `Error Al Obtener Empresas ${error}` })
        }
    });
});


//GET By ID - SE OBTIENE UNA SOLA EMPRESA MEDIANTE SU ID
router.get('/:id', (req, res) => {
    const { id } = req.params;

    mysqlConnection.query('SELECT * FROM empresas WHERE id_empresa = ?', [id], (error, rows, fields) => {
        if (!error) {
            res.json(rows[0]);
            console.log(`Empresa Obtenida Con Exito! ID Empresa : ${id}`);
        } else {
            res.status(500).send({ error: `Error Al Obtener Empresa Con ID : ${id}` });
        }
    });
})



//ADD - SE AGREGA UNA NUEVA EMPRESA
router.post('/', (req, res) => {
    const { id_empresa, denominacion, telefono, horarioAtencion, quienesSomos, latitud, longitud, domicilio, email } = req.body;
    const query = "INSERT INTO empresas VALUES (?,?,?,?,?,?,?,?,?)";

    mysqlConnection.query(query, [id_empresa, denominacion, telefono, horarioAtencion, quienesSomos, latitud, longitud, domicilio, email], (error, rows, fields) => {
        if (!error) {
            res.json({ Status: 'Empresa Guardada Con Exito!' });
        } else {
            console.log(error);
        }
    })

})



//PUT - SE EDITA UNA EMPRESA YA EXISTENTE
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { denominacion, telefono, horarioAtencion, quienesSomos, latitud, longitud, domicilio, email } = req.body;
    const sql = `UPDATE empresas SET denominacion = '${denominacion}', telefono='${telefono}',horarioAtencion = '${horarioAtencion}', quienesSomos='${quienesSomos}'
    ,latitud = '${latitud}', longitud='${longitud}', domicilio = '${domicilio}', email='${email}' WHERE id_empresa = ${id}`;

    mysqlConnection.query(sql, error => {
        if (error) throw error;
        res.send('Empresa Actualizada!');
    });
});



//DELETE - SE ELIMINA UNA EMPRESA MEDIANTE SU ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    mysqlConnection.query('DELETE FROM empresas WHERE id_empresa = ?', [id], (error, rows, fields) => {
        if (!error) {
            res.json({ Status: 'Empresa Eliminada!' });
            console.log('Datos Obtenidos Exitosamente');
        } else {
            console.log(error);
            res.json({ Status: 'Error, No se pudo eliminar!' })
        }
    });
})


module.exports = router;