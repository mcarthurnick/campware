import { DataTypes, Model, Sequelize} from 'sequelize'
import connectToDB from './database.js'
import util from 'util'

export const db = await connectToDB('postgresql:///campware')

export class User extends Model {
    [util.inspect.custom]() {
        return this.toJSON()
    }
}

User.init(
    {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true, 
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING(30),
            allowNull: false, 
            unique: true
        },
        password: {
            type: DataTypes.STRING(300),
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING(30),
            allowNull: false
        }, 
        lastName: {
            type: DataTypes.STRING(30),
            allowNull: false
        }, 
        profileImage: {
            type: DataTypes.STRING(300)
        },
        city: {
            type: DataTypes.STRING(25)
        }, 
        state: {
            type: DataTypes.STRING(25)
        }, 
        zipcode: {
            type: DataTypes.INTEGER(5)
        },
        phone: {
            type: DataTypes.STRING(10)
        }, 
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        campsiteFavorites: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            defaultValue: []
        },
        campgroundFavorites: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            defaultValue: []
        }

    },
    {
        modelName: 'user',
        sequelize: db,
    }

)

export class Campground extends Model {
    [util.inspect.custom]() {
        return this.toJSON()
    }
}

Campground.init (
    {
        campId: {
            type: DataTypes.INTEGER,
            primaryKey: true, 
            autoIncrement: true
        },
        campName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        campLong: {
            type: DataTypes.STRING
        },
        campLat: {
            type: DataTypes.STRING
        },
        campAddress: {
            type: DataTypes.STRING,
            allowNull: false
        },
        campCity: {
            type: DataTypes.STRING,
            allowNull: false
        }, 
        campState: {
            type: DataTypes.STRING,
            allowNull: false
        },
        campZip: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        campPhone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        campLogo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        campWebsite: {
            type: DataTypes.STRING,
        },
        campImages: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            defaultValue: []
        },
        campAmenities: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            defaultValue: []
        }
    },
    {
        modelName: 'campgrounds',
        sequelize: db,
    }
)

export class Campsite extends Model {
    [util.inspect.custom]() {
        return this.toJSON()
    }
}

Campsite.init (
    {
        siteID: {
            type: DataTypes.INTEGER,
            primaryKey: true, 
            autoIncrement: true
        },
        siteNumber: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        siteDescription: {
            type: DataTypes.STRING,
            allowNull: false
        },
        siteType: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rvMaxLength: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        siteImages: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            defaultValue: [],
            allowNull: false
        },
        siteAmenities: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            defaultValue: [],
            allowNull: false
        }, 
        sitePrice : {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        modelName: 'campsites',
        sequelize: db,
    }
)

Campground.hasMany(Campsite, { foreignKey: 'campId' })
Campsite.belongsTo(Campground, { foreignKey: 'campId' })

User.hasMany(Campground, {foreignKey: 'userId'})
Campground.belongsTo(User, {foreignKey: 'userId'})


