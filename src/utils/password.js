import bcrypt from "bcrypt";

export const hashingPassword = async(password) =>{
    try{
        const salt = await bcrypt.genSalt(10);

        return await bcrypt.hash(password,salt);
    }catch(err){
        throw new Error(err);
    };
};

export const comparePassword = async(password,currentPassword) =>{
    try{
        return await bcrypt.compare(password,currentPassword);
    }catch(err){
        throw new Error(err);
    };
};