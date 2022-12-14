
const nodemailer = require('nodemailer');
const express = require('../../node_modules/express');
const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('../../webpack.config');
const bodyParser = require('body-parser');
const app = express();


const compiler = Webpack(webpackConfig);
const devServerOptions = { ...webpackConfig.devServer, open: true };
const server = new WebpackDevServer(devServerOptions, compiler);

const runServer = async () => {
    console.log('Starting server...');
    await server.start();
};

runServer();

app.use( bodyParser.json() );
app.use(express.urlencoded());
const cors = require('cors');
app.use(cors({
    origin: ['http://localhost:8080', 'https://www.google.com/']
}));

app.post("/send-email", (req, res) => {
    console.log("Email enviado",  { body: req.body } );
    // res.json({
    //     message: "created",
    //     data: req.body,
    // })
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        post: 465,
        secure: true,
        auth: {
            user: 'petrolcarbonenviocorreo@gmail.com',
            pass: 'ctubrcjnyayrrrlv'
        }    
    })

    let mailOptions = {
        from: `${req.body.correo}`,
        to: ['se.diaz60@gmail.com', 'se320@hotmail.es'],
        subject: `${ req.body.clase_de_solicitud }`,
        text: `
            Nombre: ${ req.body.nombre }
            Empresa: ${ req.body.empresa }
            Dirección: ${ req.body.dirección }
            Ciudad: ${ req.body.ciudad }
            País: ${ req.body.país }
            Correo: ${ req.body.correo }
            Teléfono: ${ req.body.teléfono }
            Célular: ${ req.body.celular }
            Clase_de_solicitud: ${ req.body.clase_de_solicitud },
            Comentarios: ${ req.body.comentarios }

        `
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if ( error ) {
            res.status(500).send( error.message );
        } else {
            console.log("email enviado.");
            res.status(200).jsonp(req.body);
        }
    });
})

app.listen( 3000, () => {
    console.log("Servidor en http://localhost:3000");
});
