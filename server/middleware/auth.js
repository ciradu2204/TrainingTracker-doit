import jwt from 'jsonwebtoken'

const auth = async(req, res, next) => {

    try {
        //getting the token after the user sign/sign up 
        const token = req.headers.authorization.split(" ")[1]
        const isCustomAuth = token.length < 500 

        let decodedData; 

        if(token && isCustomAuth){
            //get the user id from  the token
            decodedData = jwt.verify(token, 'test')

            req.userId = decodedData?.id; 
        }else{

            //incase it is a google token 
            decodedData = jwt.decode(token)

            //get the id from googleToken
            req.userId = decodedData?.sub
        }
        next()
    } catch (error) {
        console.log(error)
    }

}

export default auth