const express = require('express');
const app = express();
const cors = require('cors');

//Settigs
app.set('port', process.env.PORT || 5000);

//Middewares
app.use(express.json({limit:'50mb', extended:true}));//Para Que Express Entienda Formato JSON
app.use(express.urlencoded({limit:'50mb'}));

//CORS
app.use(cors());


//Welcome Route
app.get("/", (_, res) => {
    res.json({ message: "Welcome Stranger!" });
  });
//EndPoints Base
app.use('/api/empresas',require('./routes/empresas'));//htpp://localhost:5000/api/empresas
app.use('/api/noticias',require('./routes/noticias'));//htpp://localhost:5000/api/noticias
//Otros Endpoints
//htpp://localhost:5000/api/noticias/buscar/ -Se Pasa Como Parametro Una Palabra Clave, Ej. mendoza
//htpp://localhost:5000/api/noticias/noticias-asociadas/ -Se Pasa Como Parametro El ID De Una Empresa



//Server Inicialization
app.listen(app.get('port'), () => {
    console.log('Server On Port ', app.get('port'));
});