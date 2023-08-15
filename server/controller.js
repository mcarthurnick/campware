import { User, Campground, Campsite} from './db/model.js'
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


        res.json('Registration Successful!')
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

    logoutUser: async (req, res) => {
        req.session.destroy
        res.json('Session Ended...')
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
        const campgrounds = await Campground.findAll({where : { userId: req.session.user.userId}});
        res.json(campgrounds)
    },

    createCampsite: async  (req, res) => {
        console.log('REQ.BODY', req.body);
        const {siteNumber, siteDescription, siteType, rvMaxLength, siteImages, siteAmenities, campId} = req.body;

        const createSite = await Campsite.create({
            siteNumber, 
            siteDescription, 
            siteType, 
            rvMaxLength,
            siteImages,
            siteAmenities, 
            campId
        })

        const campsites = await Campsite.findAll({where: {campId: campId }})
        res.json(campsites)
    },

    deleteCampground: async (req, res) => {
        const campId   = req.params['campId']

        await Campground.destroy({
            where: {
                campId: campId
            }
        })
        const campgrounds = await Campground.findAll({where : { userId: req.session.user.userId}});
        res.json(campgrounds)
    },

    getAdminCampgrounds: async (req, res) => {
        const campgrounds = await Campground.findAll({
            where : { userId: req.session.user.userId}, 
            include: { model: Campsite }
        });

        res.json(campgrounds)
    }, 

    getAllCampFeed: async (req, res) => {
        const campGroundSites = await Campground.findAll({ 
            attributes: { exclude: ['user']}, 
            include: { model: Campsite }
        })
        const campsites = await Campsite.findAll()

        const feed = {
            campgrounds: campGroundSites, 
            campsites: campsites
        }

        res.json(feed)
    }

}

export default routeFunctions;