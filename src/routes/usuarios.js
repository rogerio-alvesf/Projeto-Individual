var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.get("/", function (req, res) {
    usuarioController.testar(req, res);
});

router.get("/listar", function (req, res) {
    usuarioController.listar(req, res);
});

router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.entrar(req, res);
});


//Mostrar quantidade de água
router.post("/contabilizar", function (req, res) {
    usuarioController.contabilizar(req, res);
});

router.post("/modificar", function (req,res){
    usuarioController.modificar(req, res);
});

router.post("/apagar", function (req, res) {
    usuarioController.apagar(req, res);
});

router.post("/buscar_informacoes", function (req, res) {
    usuarioController.buscar_informacoes(req, res);
});

module.exports = router;