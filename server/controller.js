import { User, Campground, Campsite} from './db/model.js'
import bcrypt from 'bcryptjs';
import NodeGeocoder from 'node-geocoder'

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";



import dotenv from 'dotenv'

dotenv.config()

const bucketName = process.env.AWS_BUCKET_NAME
const bucketRegion = process.env.AWS_BUCKET_REGION
const accessKey = process.env.ACCESS_KEY
const secretAccessKey = process.env.SECRET_ACCESS_KEY

const s3 = new S3Client({
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey
    },
    region: bucketRegion
})



// const { geocode } = NodeGeocoder({
//     provider: 'google',
//     apiKey: process.env.GOOGLE_API_KEY
// })


const routeFunctions = {
    createUser: async (req, res) => {
        const {firstName, lastName, email, password, isAdmin} = req.body;
        const salt = bcrypt.genSaltSync(10);
        const registerUser = await User.create({
            firstName, 
            lastName, 
            email, 
            password: bcrypt.hashSync(password, salt), 
            isAdmin
        })


        res.json('Registration Successful!')
    },

    updateUser: async (req, res) => {
        const { firstName, lastName, city, state, zipcode, password, userId } = req.body;

        const salt = bcrypt.genSaltSync(10);

        let profileImageUrl = ''

        const user = await User.findByPk(userId)

        if(req.files){
            const profimage = {
                Bucket: bucketName,
                Key: req.files.profileImage.name, 
                Body: req.files.profileImage.data,
                ContentType: req.files.profileImage.mimetype
            }

            const comm = new PutObjectCommand(profimage)

            await s3.send(comm)
            profileImageUrl = `https://campware.s3.us-west-2.amazonaws.com/${req.files.profileImage.name}`
    
            console.log('profileImageUrl', profileImageUrl)  
        }

        user.firstName = firstName
        user.lastName = lastName
        user.city = city
        user.state = state
        user.zipcode = zipcode
        user.password = password ? bcrypt.hashSync(password, salt) : user.password
        user.profileImage = req.files ? profileImageUrl : user.profileImage

        await user.save()

        res
            .status(200)
            .json(user)
    


    },

    loginUser: async (req, res) => {

        const {email, password} = req.body;
        const user = await User.findOne({where : { email: email }});
        if(user){
            const isMatch = bcrypt.compareSync(password, user.password)
            if(isMatch){
                req.session.user = user
                res.json(user)
            } else {
                res
                    .status(401)
                    .json('Incorrect Password')
            }
        } else {
            res
            .status(401)
            .json('Sorry we couldnt find that user.')
        }


    },

    logoutUser: async (req, res) => {
        req.session.destroy
        res.json('Session Ended...')
    },

    favoriteCampsite: async(req, res) => {
        const {siteID, userId} = req.body

        const user = await User.findByPk(userId)

        if(user.campsiteFavorites.includes(siteID)){
            let index = user.campsiteFavorites.indexOf(siteID)
            let newArr = user.campsiteFavorites
            newArr.splice(index, 1)
            await user.update({ ...user, campsiteFavorites: newArr})
            res.json(user)
        } else {
            await user.update({ ...user, campsiteFavorites: [...user.campsiteFavorites, siteID]})
            res.json(user)
        }

    },
    createCampground:  async (req, res) => {
        const {campName, campAddress, campCity, campState, campZip, campPhone, campWebsite, campAmenities, userId} = req.body;


        let newAmentities = campAmenities.split(',');
        let campgroundImages = [];

        // const location = await geocode(`${campAddress}, ${campCity}, ${campState} ${campZip}`)
        // console.log('location', location)


        const params = {
            Bucket: bucketName,
            Key: req.files.campLogo.name, 
            Body: req.files.campLogo.data,
            ContentType: req.files.campLogo.mimetype
        }

        const params2 = {
            Bucket: bucketName,
            Key: req.files.campImages.name, 
            Body: req.files.campImages.data,
            ContentType: req.files.campImages.mimetype
        }

        const command = new PutObjectCommand(params)
        const command2 = new PutObjectCommand(params2)

        await s3.send(command)
        await s3.send(command2)

        const logoUrl = `https://campware.s3.us-west-2.amazonaws.com/${req.files.campLogo.name}`
        const campgroundImageUrl = `https://campware.s3.us-west-2.amazonaws.com/${req.files.campImages.name}`
        campgroundImages.push(campgroundImageUrl)

            await Campground.create({
                campName, 
                campAddress,
                campCity, 
                campState,
                campZip,
                campPhone,
                campWebsite,
                campAmenities: newAmentities,
                campLogo: logoUrl,
                campImages: campgroundImages,
                userId
            })

        const campgrounds = await Campground.findAll({where : { userId: req.session.user.userId}});
        res.json(campgrounds)
    },

    createCampsite: async (req, res) => {
        const {siteNumber, siteDescription, siteType, rvMaxLength, siteAmenities, campId} = req.body;

        let newSiteAmentities = siteAmenities.split(',');
        let campsiteImages = [];

        const siteparams = {
            Bucket: bucketName,
            Key: req.files.siteImages.name, 
            Body: req.files.siteImages.data,
            ContentType: req.files.siteImages.mimetype
        }

        const com = new PutObjectCommand(siteparams)

        await s3.send(com)

        const siteImageUrl = `https://campware.s3.us-west-2.amazonaws.com/${req.files.siteImages.name}`
        campsiteImages.push(siteImageUrl)

        const createSite = await Campsite.create({
            siteNumber, 
            siteDescription, 
            siteType, 
            rvMaxLength,
            siteImages: campsiteImages,
            siteAmenities: newSiteAmentities, 
            campId
        })

        const campsites = await Campsite.findAll({where: {campId: campId }})
        res.json(campsites)
    },

    updateCampsite: async (req, res) => {
        const { siteID, siteNumber, siteDescription , siteType, rvMaxLength, siteAmenities, sitePrice, siteImages, campId } = req.body;
        console.log('req.body', req.body)

        let siteImageUrl = ''
        let newAmenities= siteAmenities.split(',')
        let newSiteImages = []
        console.log('newAmenities', newAmenities)
        const site = await Campsite.findByPk(siteID)

        console.log('site', site)

        if(req.files){
            const siteimage = {
                Bucket: bucketName,
                Key: req.files.siteImages.name, 
                Body: req.files.siteImages.data,
                ContentType: req.files.siteImages.mimetype
            }

            const comm = new PutObjectCommand(siteimage)

            await s3.send(comm)
            siteImageUrl = `https://campware.s3.us-west-2.amazonaws.com/${req.files.siteImages.name}`
    
            newSiteImages.push(siteImageUrl)
            console.log('siteImageUrl', siteImageUrl)  
        }

        newSiteImages.push(siteImages)

        site.siteNumber = siteNumber
        site.siteDescription = siteDescription
        site.siteType = siteType
        site.rvMaxLength = rvMaxLength
        site.siteAmenities = newAmenities
        site.sitePrice = sitePrice
        site.siteImages = newSiteImages

        await site.save()

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