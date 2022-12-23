
const fs = require("fs");
const express = require("express");
const path = require("path");
const app = express();
const crypto = require("crypto")


const PORT = process.env.PORT || 8001;



app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
