const GetControllerDB = async (dbConnection) => {
	try {
		const DBsAdmin = dbConnection.model('DBsAdmin');
		const DBs = await DBsAdmin.find();
		return DBs;
	} catch (error) {
		return error;
	}
};

export default GetControllerDB;
