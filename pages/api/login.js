export default async(req,res)=>{

    const {email,password}=req.body;


    res.status(200).json({...user});
}