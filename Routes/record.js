let express = require('express'),
    router = express.Router(),
    util = require('../Utilities/util'),
    recordService = require('../Services/record');


/**Api to create record */
router.post('/create-record', (req, res) => {
    recordService.createRecord(req.body, (data) => {
        res.send(data);
    });
});

/**Api to update record */
router.put('/update-record', (req, res) => {
    recordService.updateRecord(req.body, (data) => {
        res.send(data);
    });
});

/**Api to delete the record */
router.delete('/delete-record', (req, res) => {
    recordService.deleteRecord(req.query, (data) => {
        res.send(data);
    });
});

/**Api to get the list of record */
router.get('/get-record', (req, res) => {
    recordService.getRecord(req.query, (data) => {
        res.send(data);
    });
});
/**API to get the record by id... */
router.get('/get-record-by-id', (req, res) => {
    recordService.getRecordById(req.query, (data) => {
        res.send(data);
    });
});

/**CNN API to get the record by period... */
router.get('/get-record-by-period', (req, res) => {
    recordService.getRecordByPeriod(req.query, (data) => {
        res.send(data);
    });
});
module.exports = router;
