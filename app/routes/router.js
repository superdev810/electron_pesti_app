'use strict';

const router    = require('express').Router();
var CustomerController = require('../controllers/customer.js'),
    IndexController = require('../controllers/index.js'),
    ExpansionController = require('../controllers/expansion.js');
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                  Routers
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.route('/')
    .get(IndexController.index);

router.route('/left-menu')
    .get(IndexController.left_menu);
router.route('/home')
    .get(IndexController.home);


router.route('/customer')
    .get(CustomerController.index);

router.route('/customer/api/savecustomer')
    .post(CustomerController.save_newcustomer);
router.route('/customer/api/getcustomer')
    .get(CustomerController.get_customerinfo);
router.route('/customer/api/search')
    .get(CustomerController.get_customerlist);
router.route('/customer/api/getreservation')
    .get(CustomerController.get_reservation_date);
router.route('/customer/api/fileupload')
    .post(CustomerController.file_upload);

router.route('/expand')
    .get(ExpansionController.index);
router.route('/expand/api/getexpandision')
    .get(ExpansionController.get_expandsetting);
router.route('/expand/api/setexpandision')
    .get(ExpansionController.set_expandsetting);
module.exports.router = router;
