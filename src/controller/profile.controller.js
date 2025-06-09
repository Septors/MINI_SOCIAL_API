import * as profileService from "../service/profile.service.js";


export const createProfile =  async (req,res) =>{
    const userId = req.id
    const data = req.body;

    const profile = await 
    profileService.create(userId,data);

    
    res.status(201).json({message: "User profile Created",profile});
};

export const getMyProfile = async(req,res) =>{
    const userId = req.id;

    const user = await profileService.getUserProfile(userId);

    res.status(200).json(user.profile);
};


export const getUserProfile = async(req,res) => {
    const userId = req.params.userId;

    const user = await profileService.getUserProfile(userId);

    res.status(200).json(user.profile);
};

export const changeProfile = async(req,res) =>{
   
    const userId = req.id;
    const data = req.body;

    const updatedProfile = await profileService.updateProfile(userId,data);

    res.status(200).json({message: "Profile has been updated",updatedProfile});
};

