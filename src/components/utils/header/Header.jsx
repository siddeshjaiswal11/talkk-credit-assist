import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({applicationName}) => {
  const navigate = useNavigate();
  return (
   <>
     <div className="bg-white p-2 flex items-center gap-1 cursor-pointer">
      <span className="smm smm-right-arrow mr-2" onClick={() => navigate(-1)}></span>
      <div className="text-lg font-semibold">
        <span className="text-gray-500">Applications /</span>
        <span className='font-semibold ml-1'>{applicationName}</span>
        {/* <span className="font-semibold ml-1">TechHive Solutions</span> */}
      </div>
      </div>
      <hr className="w-full border-gray-200 my-3" />
   </>
  );
};

export default Header;