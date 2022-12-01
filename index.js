"use strict";
exports.__esModule = true;
var express_1 = require("express");
var app = (0, express_1["default"])();
app.get("/", function (req, res) {
    res.send("Hello ts");
});
app.listen(4000, function () {
    console.log("Server running");
});
