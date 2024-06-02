const express = require(`express`);
const router = express.Router();
const login = require(`../controllers/login`);
const register = require(`../controllers/register`);
const addPlayList = require(`../controllers/addPlayList`);
const publicOrprivate = require(`../controllers/publicOrprivate`);
const provider = require('../controllers/provider');


router.post(`/login`,login);
router.post(`/register`,register);
router.post(`/addplaylist`,addPlayList);
router.post(`/visible`,publicOrprivate);
router.get(`/provider`,provider);

module.exports = router;