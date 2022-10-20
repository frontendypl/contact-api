const auth = async (req, res, next)=>{

    try{
        const token = req.header('Authorization').replace('Bearer ','')
        let auth = false
        if (token === 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHAiOiJjb250YWN0LWFwaSJ9.8OTb6xjmAiwBjM6TC0WskbwBBlLqEMv03nQpFKTCK-M'){
            auth = true
        }

        if(!auth){
            throw new Error()
        }

        next()
    }catch (e) {
        res.status(401).send({
            errors: {
                "auth": {
                    message: "Please authenticate."
                }
            }
        })
    }

}

module.exports = auth;