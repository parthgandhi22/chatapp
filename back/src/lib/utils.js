import jwt from "jsonwebtoken"

export const generateToken=(userId,res)=>{
    const token=jwt.sign({userId},process.env.JWT_SECRET,{        //generated jwt token  //token has userid in it
        expiresIn:"7d"
    });

    res.cookie("jwt",token,{
        maxAge:7*24*60*60*1000,              //sending the token to the cookie
        httpOnly:true,
        sameSite:"strict",
    });

    return token;
}