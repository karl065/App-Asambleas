import authenticatedUser from '../../auth/authenticatedUser.js';

const handlerAuthenticated = async (req, res) => {
	try {
		const userToken = req.user;
		const user = await authenticatedUser(userToken);
		return res.status(200).json(user);
	} catch (error) {
		return res.status(404).json({ error: error.message });
	}
};

export default handlerAuthenticated;
