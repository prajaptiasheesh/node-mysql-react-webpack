const formatResponse = (controller)=>(req, res, next)=>{

    try {
        let query = req.query;
        let body = req.body;
        let params = req.params;
        controller(body, params, query, req)
        .then(result=>{
            return res.status(200).json(result)
        }).catch(err=>{
            console.log('error=>>>',err.message);
            res.status(500).json({ error: err.message })
        })
    } catch (error) {
        console.log('error=>>>',error.message);
        res.status(500).json({ error: error })
    }

}

module.exports = formatResponse;