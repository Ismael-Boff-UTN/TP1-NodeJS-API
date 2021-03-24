const express = require('express');
const router = express.Router();
const mysqlConnection = require('../database/mysqlconnection');

//CRUD NOTICIAS (GET,POST,DELETE,PUT)



//GET - SE OBTIENEN TODAS LAS NOTICIAS EN LA BASE DE DATOS
router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM noticias', (error, rows, fields) => {
        if (!error) {
            res.json(rows);
            console.log('Datos Obtenidos Exitosamente');
        } else {
            console.log(error);
        }
    });
});


//GET By ID - SE OBTIENE SOLO UNA NOTICIA MEDIANTE SU ID
router.get('/:id', (req, res) => {
    const { id } = req.params;

    mysqlConnection.query('SELECT * FROM noticias WHERE id_noticia = ?', [id], (error, rows, fields) => {
        if (!error) {
            res.json(rows[0]);
            console.log('Datos Obtenidos Exitosamente');
        } else {
            console.log(error);
        }
    });
})



//ADD - SE AGREGA UNA NOTICIA NUEVA
router.post('/', (req, res) => {
    const { id_noticia, tituloNoticia, resumenNoticia, contenidoHTML, publicada, fechaPublicacion, idEmpresa, imagenNoticia } = req.body;
    const query = "INSERT INTO noticias VALUES (?,?,?,?,?,?,?,?)";

    mysqlConnection.query(query, [id_noticia, tituloNoticia, resumenNoticia, contenidoHTML, publicada, fechaPublicacion, idEmpresa, imagenNoticia], (error, rows, fields) => {
        if (!error) {
            res.json({ Status: 'Noticia Guardada Con Exito!' });
        } else {
            console.log(error);
        }
    })

})



//PUT - SE EDITA UNA NOTICIA YA EXISTENTE
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { tituloNoticia, resumenNoticia, contenidoHTML, publicada, fechaPublicacion, idEmpresa, imagenNoticia } = req.body;
    const sql = `UPDATE noticias SET tituloNoticia = '${tituloNoticia}', resumenNoticia='${resumenNoticia}',contenidoHTML = '${contenidoHTML}', publicada='${publicada}'
    ,fechaPublicacion = '${fechaPublicacion}', idEmpresa='${idEmpresa}', imagenNoticia = '${imagenNoticia}' WHERE id_noticia = ${id}`;

    mysqlConnection.query(sql, error => {
        if (error) throw error;
        res.json({ Status: 'Noticia Actualizada!' });
    });
});



//DELETE - SE ELIMINA UNA NOTICIA MEDIANTE SU ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    mysqlConnection.query('DELETE FROM noticias WHERE id_noticia = ?', [id], (error, rows, fields) => {
        if (!error) {
            res.json({ Status: 'Noticia Eliminada!' });
            console.log('Datos Obtenidos Exitosamente');
        } else {
            console.log(error);
            res.json({ Status: 'Error, No se pudo eliminar!' })
        }
    });
})

//GET By PARAMETER - SE OBTIENEN NOTICIAS DETERMINADAS
router.get('/buscar/:search', (req, res) => {
    const { search } = req.params;

    mysqlConnection.query(`SELECT * FROM noticias WHERE tituloNoticia LIKE '%${search}%' OR resumenNoticia LIKE '%${search}%'`, (error, rows, fields) => {
        if (!error) {

            res.json(rows);

            console.log('Datos Obtenidos Exitosamente');
        } else {
            console.log(error);

        }
    });
})

//GET By Asociación - SE OBTIENEN NOTICIAS ASOCIADAS A UNA DETERMINADA EMPRESA
//SE OBTIENEN LAS ULTIMAS 5 NOTICIAS EN ORDEN DESCENDENTE! 
router.get('/noticias-asociadas/:idempresa',(req,res)=>{
    const {idempresa} = req.params;
    mysqlConnection.query('SELECT * FROM noticias WHERE idEmpresa = ? ORDER BY id_noticia DESC LIMIT 5',[idempresa],(error,rows,fields) =>{
        if(!error){
            res.json(rows);
            console.log('todo ok');

        }else{
            console.log(error);
        }
    })
})


module.exports = router;