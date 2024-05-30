const express = require('express')
const router = express.Router()
const multer = require('multer');

const { verifyToken, checkRole } = require('../Middlewares/authMiddleware');

const servicesController = require('../Controller/ServicesController')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
  
  const upload = multer({ storage: storage });


router.post('/addservice', verifyToken, checkRole(['admin']), upload.single('photo'), servicesController.addServices)
router.get('/viewservice', servicesController.viewServices)
router.get('/viewservicedetails/:service_id', servicesController.viewServiceDetails)
router.put('/changeavailability/:service_id', servicesController.updateAvailability)


module.exports = router