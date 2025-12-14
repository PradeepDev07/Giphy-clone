import {  FaInstagram , FaYoutube } from "react-icons/fa";
import { FaMeta } from "react-icons/fa6";

const FollowOn = () => {

  return (
    <div className="my-3">
    <p>Follow on : </p>

 <a href="https://www.meta.com" target="_blank" rel="noopener noreferrer">
    <FaMeta size={24} className="inline-block mr-2 text-gray-600" />
 </a>
    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
        <FaInstagram size={24} className="inline-block mr-2 text-gray-600" />
    </a>

    <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
        <FaYoutube size={24} className="inline-block mr-2 text-gray-600" />
    </a>

    </div>
   
  )
}

export default FollowOn