import { User, Campground} from './db/model.js'
import bcrypt from 'bcryptjs';


const routeFunctions = {
    createUser: async (req, res) => {
        const {firstName, lastName, email, password} = req.body;
        const salt = bcrypt.genSaltSync(10);
        const registerUser = await User.create({
            firstName, 
            lastName, 
            email, 
            password: bcrypt.hashSync(password, salt)
        })


        res.json(registerUser)
    },
    loginUser: async (req, res) => {

        const {email, password} = req.body;
        const user = await User.findOne({where : { email: email }});
        
        const isMatch = bcrypt.compareSync(password, user.password)

        
        if(isMatch){
            req.session.user = user
            res.json(user)
        } else {
            res.json('Incorrect Password')
        }


    },
    createCampground: async (req, res) => {
        const {campName, campAddress, campCity, campState, campZip, campPhone, campWebsite, campAmenities, campLogo, campImages, userId} = req.body;
        const createCamp = await Campground.create({
            campName, 
            campAddress,
            campCity, 
            campState,
            campZip,
            campPhone,
            campWebsite,
            campAmenities,
            campLogo,
            campImages,
            userId
        })
        res.json(createCamp)
    }

}

export default routeFunctions;