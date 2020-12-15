

const macValidation = (req, res, next) => {
    if(!req.body.macaddress){
        return res.status(400).json({ error: 'MacAdress é obrigatório'});
    }else{
        next();
    }
}


module.exports = macValidation;