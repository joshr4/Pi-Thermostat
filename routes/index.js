

const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
  res.render( 'index' , {showHome: true} );
});

router.get('/rules', (req, res) => res.render( 'index' , {showHome: false, showRules: true}));


module.exports = router;
