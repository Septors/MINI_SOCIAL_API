export const setRefreshTokenCookie = (res,refreshToken) =>{
    return res.cookie("refreshToken",refreshToken,{
        httpOnly:true,
        secure:true,
        sameSite:"Strict",
        maxAge:7*24*60*60*1000
    });
}