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

router.post("/apagar_dados", function (req, res) {
    usuarioController.apagar_dados(req, res);
});

router.post("/apagar_conta", function (req, res) {
    usuarioController.apagar_conta(req, res);
});

router.post("/buscar_informacoes", function (req, res) {
    usuarioController.buscar_informacoes(req, res);
});

router.post("/buscar_estatisticas", function (req, res) {
    usuarioController.buscar_estatisticas(req, res);
});

router.post("/armazenar_valorIdeal", function (req, res) {
    usuarioController.armazenar_valorIdeal(req, res);
});

router.post("/buscar_quantidadeIdeal", function (req, res) {
    usuarioController.buscar_quantidadeIdeal(req, res);
});

module.exports = router;