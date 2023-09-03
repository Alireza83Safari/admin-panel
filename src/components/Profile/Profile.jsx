import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import {
  faCircleQuestion,
  faEdit,
  faRightFromBracket,
  faUserAstronaut,
  faUserGear,
} from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch";
import adminAxios from "../../api/adminInterceptors";
export default function Profile() {
  const { datas: userInfo } = useFetch("/is_authenticated", adminAxios);

  return (
    <div className="absolute top-16 dark:bg-black-900 dark:text-white-100 bg-white-100 text-sm px-6 py-4 rounded-xl z-10">
      <div className="mb-3 z-10">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrT3XAWJ1ibDAoQ7sLZuYTk062ZYlr2JDNzPtmr8savg&usqp=CAU&ec=48665698"
          alt="admin image"
          className="rounded-full w-12 h-12 border-2 border-white-100 mb-3"
        />
        <p className="py-1">{userInfo?.username}</p>
        <p className="text-xs text-gray-500">Premium Member</p>
      </div>
      <div className="flex items-center py-2">
        <FontAwesomeIcon icon={faEdit} />
        <p className="pl-2">Edit Profile</p>
      </div>
      <div className="flex items-center border-b pb-4 py-1">
        <FontAwesomeIcon icon={faUserAstronaut} />
        <p className="pl-2">View Profile</p>
      </div>

      <div className="flex py-2 pt-4">
        <FontAwesomeIcon icon={faCircleQuestion} />
        <p className="pl-2">Help Center</p>
      </div>

      <div className="flex py-2">
        <FontAwesomeIcon icon={faUserGear} />
        <p className="pl-1">Account Setting</p>
      </div>

      <div className="flex py-2">
        <FontAwesomeIcon icon={faRightFromBracket} />
        <p className="pl-2">Log Out</p>
      </div>
    </div>
  );
}