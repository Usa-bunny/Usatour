const Admin = require('../models/adminModel');
const uploadImage = require('../middleware/upload');
const Cafe = require('../models/cafeModel');
const Wisata = require('../models/wisataModel');
const requireAdmin = require('../middleware/auth');
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const cloudinary = require('cloudinary').v2;
const express = require('express');
const router = express.Router();

/* -- Auth views -- */
router.get('/$$uQ9fKx1aZt7vRmP3cB8nLw4yHsE0pVgD2mXrS6qTfJ5kNaUoWcYhGdFjLbTzCpRkeYvSxQpWnAhDuKfMiTgBrLoCsPeVnXmZaJyQwRsTfUgHiOjPkMlNbVcXdZsQaWeRtYyUiOpAsDfGhJkLqPwOeIrTyUsPaNdMfBgChVkXjLmQpRoTsYuIwKsJeDhFaGbNcMbVtRxHcLkPwZqSdFgHjKlMnBvCxZsAxQwErTyUiOpLsKjHgFdSaQxWcEvTrBzNyJkUhGfDsAaWmVnCbXzQpErTtYiOqLsKmJnHdFgSaWxCvBnMmLpOrTqUyIiOkMlNjHgVfDsCaXbVzPwEqRtUyIoLpKsJhGfEdCaXwCvBnMzLpOrTsUwIqKsJhHgFdSaWxCvBnMzLpOqTsUwIrKxJhGfDsCaXbVnZpQeRtTyUiOpLsKjHgFdSaWcEvBnMzLpOrTsUyIoKsJhGfDaXbVnMzLpOrTsUwIqKsJhHgFdSaWcEvBnMzLOrTsUqKsJhHgFdSaWxCvBnMzLpOrTsUwIqKsJhHgFdSaWxCvBnMzLpOrTsUwIqKsJhHgFdSaWxCvBnMzLpOrTsUwIqKsJhHgFdSaWxCvBnMzLpOrTsUwIqKsJhHgFdSaWxCvBnMzLpOrTsUwIqKsJhHgFdSaWxCvBnMzLpOrTsUwIqKsJhHgFdSaWxCvBnMzLpOrTsUwIqKsBzNyJkUhGfDsAaWmVnCbXzQpErTtYiOqLsKmJnHdBzNyJkUhGfDsAaWmGbNcMbVtRxHcLkPwZqSdFgHjKlMnBvCxZsAxQwErTyUiOpLsKjHgFdSaQxWcEvTrBzNyJkUhGfDsAaWmVnCbXzQpErTtYiOqLsKmJnHdFgSaWxCvBnMmLpOrTqUyIiOkMlNjHgVfDsCaXbVzPwEqRtUyIoLpKsJhGfEdCaXwCvBnMzLpOrTsUwIqKsJhHg$$uQ9fKx1aZt7vRmP3cB8nLw4yHsE0pVgD2mXrS6qTfJ5kNaUoWcYhGdFjLbTzCpRkeYvSxQpWnAhDuKfMiTgBrLoCsPeVnXmZaJyQwRsTfUgHiOjPkMlNbVcXdZsQaWeRtYyUiOpAsDfGhJkLqPwOeIrTyUsPaNdMfBgChVkXjLmQpRoTsYuIwKsJeDhFaGbNcMbVtRxHcLkPwZqSdFgHjKlMnBvCxZsAxQwErTyUiOpLsKjHgFdSaQxWcEvTrBzNyJkUhGfDsAaWmVnCbXzQpErTtYiOqLsKmJnHdFgSaWxCvBnMmLpOrTqUyIiOkMlNjHgVfDsCaXbVzPwEqRtUyIoLpKsJhGfEdCaXwCvBnMzLpOrTsUwIqKsJhHgFdSaWxCvBnMzLpOqTsUwIrKxJhGfDsCaXbVnZpQeRtTyUiOpLsKjHgFdSaWcEvBnMzLpOrTsUyIoKsJhGfDaXbVnMzLpOrTsUwIqKsJhHgFdSaWcEvBnMzLOrTsUqKsJhHgFdSaWxCvBnMzLpOrTsUwIqKsJhHgFdSaWxCvBnMzLpOrTsUwIqKsJhHgFdSaWxCvBnMzLpOrTsUwIqKsJhHgFdSaWxCvBnMzLpOrTsUwIqKsJhHgFdSaWxCvBnMzLpOrTsUwIqKsJhHgFdSaWxCvBnMzLpOrTsUwIqKsJhHgFdSaWxCvBnMzLpOrTsUwIqKsBzNyJkUhGfDsAaWmVnCbXzQpErTtYiOqLsKmJnHdBzNyJkUhGfDsAaWmGbNcMbVtRxHcLkPwZqSdFgHjKlMnBvCxZsAxQwErTyUiOpLsKjHgFdSaQxWcEvTrBzNyJkUhGfDsAaWmVnCbXzQpErTtYiOqLsKmJnHdFgSaWxCvBnMmLpOrTqUyIiOkMlNjHgVfDsCaXbVzPwEqRtUyIoLpKsJhGfEdCaXwCvBnMzLpOrTsUwIqKsJhHg$$uQ9fKx1aZt7vRmP3cB8nLw4yHsE0pVgD2mXrS6qTfJ5kNaUoWcYhGdFjLbTzCsJhHgFdSaWxCvBnMzLpOrTsUwIqKsJhHgFdSaWxCvBnMzLpOrTsUwIqKsJhHgFdSaWxCvBnMzLpOrTsUwIqKsJhHgFdSaWxCvBnMzLpOrTsUwIqKsJhHgFdSaWxCvBnMzLpOrTsUwIqKsJhHgFdSaWxCvBnMzLpOrTsUwIqKsBzNyJkUhGfDsAaWmVnCbXzQpErTtYiOqLsKmJnHdBzNyJkUhGfDsAaWmGbNcMbVtRxHcLkPwZqSdFgHjKlMnBvCxZsAxQwErTyUiOpLsKjHgFdSaQxWcEvTrBzNyJkUhGfDsAaWmVnCbXzQpErTtYiOqLsKmJnHdFgSaWxCvBnMmLpOrTqUyIiOkMlNjHgVfDsCaXbVzPwEqRtUyIoKsJhHgFdSaWxCvBnMzLpOrTsUwIqKsJhHgFdSaWxCvBnMzLpOrTwfisobfeiysbhuebwusbftsvbuyebuvfuvbeuysbefuibsoubefousbvubfsyuofyiui3', async (req, res) => {
    try {
        return res.render('register');
    } catch (error) {
        console.error(error);
        return res.status(500).send('cannot get register');
    }
});
router.get('/login', async (req, res) => {
    try {
        return res.render('login');
    } catch (error) {
        console.error(error);
        return res.status(500).send('cannot get login');
    }
});

/* -- Logout -- */
router.get('/logout', async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('logout failed');
        }
        return res.redirect('/usatour/listwisata');
    });
});

/* -- Register / Login handlers -- */
router.post('/register', async (req, res) => {
    try {
        const { nama, username, password } = req.body;

        const existingUser = await Admin.findOne({ username });
        if (existingUser) {
            return res.status(400).send('Username already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmin = new Admin({ nama, username, password: hashedPassword });

        await newAdmin.save();
        return res.redirect('/dashboard/login');
    } catch (error) {
        console.error(error);
        return res.status(500).send('registration failed');
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(400).send('Invalid username');
        }

        const validPassword = await bcrypt.compare(password, admin.password);
        if (!validPassword) {
            return res.status(400).send('Invalid password');
        }

        req.session.admin = {
            _id: admin._id,
            username: admin.username
        };
        return res.redirect('/dashboard/managewisata');
    } catch (error) {
        console.error(error);
        return res.status(500).send('login failed');
    }
});

/* -- Manage Wisata -- */
router.get('/managewisata', requireAdmin, async (req, res) => {
    try {
        const wisata = await Wisata.find();
        return res.render('manageWisata', { wisata });
    } catch (error) {
        console.error(error);
        return res.status(500).send(error.message);
    }
});

router.get('/managewisata/delete/:id', requireAdmin, async (req, res) => {
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send('Invalid ID');
        }

        const wisata = await Wisata.findById(id);
        if (!wisata) return res.status(404).send('Wisata not found');

        if (wisata.public_id) {
            try {
                await cloudinary.uploader.destroy(wisata.public_id);
            } catch (err) {
                console.warn('Cloudinary delete failed (continuing):', err);
            }
        }

        await Wisata.findByIdAndDelete(id);

        return res.redirect('/dashboard/managewisata');
    } catch (error) {
        console.error(error);
        return res.status(500).send(error.message);
    }
});

router.post('/managewisata/add', requireAdmin, uploadImage.single('foto'), async (req, res) => {
    try {
        const { nama, deskripsi, alamat, telepon } = req.body;
        const adminId = req.session.admin && req.session.admin._id;

        if (!adminId) return res.status(401).send('Unauthorized');

        const imageUrl = req.file ? req.file.path : null;
        const imagePublicId = req.file ? req.file.filename : null;

        const newWisata = new Wisata({
            admin_id: adminId,
            nama,
            foto: imageUrl,
            public_id: imagePublicId,
            deskripsi,
            alamat,
            telepon
        });

        await newWisata.save();
        return res.redirect('/dashboard/managewisata');
    } catch (error) {
        console.error(error);
        return res.status(500).send(error.message);
    }
});

router.post('/managewisata/edit/:id', requireAdmin, uploadImage.single('foto'), async (req, res) => {
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send('Invalid ID');
        }

        const existingWisata = await Wisata.findById(id);
        if (!existingWisata) {
            return res.status(404).send('Wisata not found');
        }

        const { nama, deskripsi, alamat, telepon } = req.body;

        let updatedData = {
            nama,
            deskripsi,
            alamat,
            telepon
        };

        if (req.file) {
            if (existingWisata.public_id) {
                try {
                    await cloudinary.uploader.destroy(existingWisata.public_id);
                } catch (err) {
                    console.warn('Cloudinary delete failed (continuing):', err);
                }
            }

            updatedData.foto = req.file.path;
            updatedData.public_id = req.file.filename;
        }

        await Wisata.findByIdAndUpdate(id, updatedData);

        return res.redirect('/dashboard/managewisata');
    } catch (error) {
        console.error(error);
        return res.status(500).send(error.message);
    }
});

/* -- Manage Cafe -- */
router.get('/managecafe', requireAdmin, async (req, res) => {
    try {
        const cafe = await Cafe.find();
        return res.render('manageCafe', { cafe });
    } catch (error) {
        console.error(error);
        return res.status(500).send(error.message);
    }
});

router.get('/managecafe/delete/:id', requireAdmin, async (req, res) => {
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send('Invalid ID');
        }

        const cafe = await Cafe.findById(id);
        if (!cafe) return res.status(404).send('Cafe not found');

        if (cafe.public_id) {
            try {
                await cloudinary.uploader.destroy(cafe.public_id);
            } catch (err) {
                console.warn('Cloudinary delete failed (continuing):', err);
            }
        }

        await Cafe.findByIdAndDelete(id);

        return res.redirect('/dashboard/managecafe');
    } catch (error) {
        console.error(error);
        return res.status(500).send(error.message);
    }
});

router.post('/managecafe/add', requireAdmin, uploadImage.single('foto'), async (req, res) => {
    try {
        const { nama, deskripsi, alamat } = req.body;
        const adminId = req.session.admin && req.session.admin._id;

        if (!adminId) return res.status(401).send('Unauthorized');

        const imageUrl = req.file ? req.file.path : null;
        const imagePublicId = req.file ? req.file.filename : null;

        const newCafe = new Cafe({
            admin_id: adminId,
            nama,
            foto: imageUrl,
            public_id: imagePublicId,
            deskripsi,
            alamat
        });

        await newCafe.save();
        return res.redirect('/dashboard/managecafe');
    } catch (error) {
        console.error(error);
        return res.status(500).send(error.message);
    }
});

router.post('/managecafe/edit/:id', requireAdmin, uploadImage.single('foto'), async (req, res) => {
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send('Invalid ID');
        }

        const existingCafe = await Cafe.findById(id);
        if (!existingCafe) {
            return res.status(404).send('Cafe not found');
        }

        const { nama, deskripsi, alamat } = req.body;

        let updatedData = {
            nama,
            deskripsi,
            alamat
        };

        if (req.file) {
            if (existingCafe.public_id) {
                try {
                    await cloudinary.uploader.destroy(existingCafe.public_id);
                } catch (err) {
                    console.warn('Cloudinary delete failed (continuing):', err);
                }
            }

            updatedData.foto = req.file.path;
            updatedData.public_id = req.file.filename;
        }

        await Cafe.findByIdAndUpdate(id, updatedData);

        return res.redirect('/dashboard/managecafe');
    } catch (error) {
        console.error(error);
        return res.status(500).send(error.message);
    }
});

module.exports = router;
