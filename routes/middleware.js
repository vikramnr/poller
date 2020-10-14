const axios = require('axios')

const generateTokenForTwitch = async (req, res, next) => {
    
	if(req.app.locals.cred) next()
	try {
        
		let cred = await axios.post('https://id.twitch.tv/oauth2/token', null, {
			params: {
				client_id: process.env.TWITCH_CLIENT,
				client_secret: process.env.TWITCH_SECRET,
				grant_type: 'client_credentials',
			},
		})
		req.app.locals.cred = cred.data
		next()
	} catch (e) {
		console.log(e)
		next()
	}
}

module.exports = { generateTokenForTwitch }
