import {useDispatch, useSelector} from 'react-redux';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {logout} from '../../redux/actions';
import {GoMoveToStart} from 'react-icons/go';

const NavBar = () => {
  const connectedDB = useSelector((state) => state.asambleas.DBConectada);
  const login = useSelector((state) => state.asambleas.login);

  const location = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogOut = (e) => {
    e.preventDefault();
    logout(dispatch, navigate, login._id, connectedDB);
  };

  return (
    <div className="flex">
      <div className="flex bg-black opacity-70 rounded-lg p-2 w-full justify-center">
        <div className=" bg-white rounded-lg shadow w-full dark:border dark:bg-gray-800 dark:border-gray-700">
          <div className="p-2 border-2 border-black rounded-lg justify-center flex">
            <div
              className={`${
                login.role === 'View'
                  ? 'flex flex-1 justify-end p-2'
                  : 'flex flex-1 justify-center p-2'
              }`}
            >
              <h1 className="text-white uppercase font-bold text-lg">{`Conjunto ${connectedDB}`}</h1>
            </div>
            {login.role === 'View' && (
              <div className="flex flex-1 justify-end p-2 space-x-2 ">
                {location.pathname !== '/view' && (
                  <Link to="/view">
                    <GoMoveToStart style={{color: 'white'}} size={34} />
                  </Link>
                )}
                <button
                  onClick={handleLogOut}
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-red-500 hover:bg-red-300 text-white hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="4"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
