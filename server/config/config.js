const config = {
    production:{
         SECRET: process.env.SECRET,
         DATABASE: process.env.MONGODB_URI
    },
    default:{
        SECRET: '18472348923498HSJKFKSFQLKFJ8394QSKFJH389QFH',
        DATABASE: 'mongodb://localhost:27017/connb'
    }
}

exports.get = function get(env){
    return config[env] || config.default
}