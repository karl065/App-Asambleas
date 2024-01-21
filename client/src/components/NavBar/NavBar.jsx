import {useSelector} from 'react-redux';

const NavBar = () => {
  const connectedDB = useSelector((state) => state.asambleas.DBConectada);
  return (
    <div className="flex">
      <div className="flex bg-black opacity-70 rounded-lg p-2 w-full justify-center">
        <div className=" bg-white rounded-lg shadow w-full dark:border dark:bg-gray-800 dark:border-gray-700">
          <div className="p-2 border-2 border-black rounded-lg justify-center flex">
            <h1 className="text-white uppercase font-bold text-lg">{`Conjunto ${connectedDB}`}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
