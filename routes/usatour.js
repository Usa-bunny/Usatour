const Cafe = require('../models/cafeModel');
const Wisata = require('../models/wisataModel');
const mongoose = require("mongoose");
const express = require('express');
const router = express.Router();

router.get('/listwisata', async (req, res) => {
     try {
        const wisata = await Wisata.find();
        res.render('listWisata', { wisata });
    } catch (error) {
        console.error(error);
        res.status(500).send('cannot get listwisata');
    }
});
router.get('/listwisata/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send("ID tidak valid");
        }

        const wisata = await Wisata.findById(id);
        if (!wisata) return res.status(404).send("Wisata tidak ditemukan");

        res.render("detailWisata", { wisata });

    } catch (err) {
        console.error("Detail error:", err);
        res.status(500).send("Server error");
    }
});
router.get('/listcafe', async (req, res) => {
    try {
        const cafe = await Cafe.find();
        res.render('listCafe', { cafe });
    } catch (error) {
        console.error(error);
        res.status(500).send('cannot get listcafe');
    }
});
router.get('/listcafe/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send("ID tidak valid");
        }

        const cafe = await Cafe.findById(id);
        if (!cafe) return res.status(404).send("Cafe tidak ditemukan");

        res.render("detailCafe", { cafe });

    } catch (err) {
        console.error("Detail error:", err);
        res.status(500).send("Server error");
    }
});


module.exports = router;