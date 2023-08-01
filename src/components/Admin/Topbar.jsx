import React, { useEffect, useState } from "react";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function Topbar() {
  const [topbarData, setTopbarData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9000/topbar/")
      .then((res) => res.json())
      .then((products) => {
        setTopbarData(products);
      });
  }, []);
  /* md:px-6 sm:my-5 sm:px-4 py-2 px-6 md:mx-2 */
  return (
    <>
      {topbarData.map((data, index) => (
        <div className="relative rounded-lg col-span-1 bg-white-100 dark:bg-black-200 p-6 dark:text-white-100 text-black-900">
          <div className="flex items-center sm:justify-between text-xs 2xl:text-base lg:text-sm">
            <p className="xl:mr-4 whitespace-nowrap">{data.title}</p>
            <span
              className={` " mx-1 text-green-300 flex items-center font-bold sm:right-0 right-8 pr-3 absolute " ${
                data.change.includes("-") ? "text-red-300" : "text-green-300"
              }`}
            >
              <FontAwesomeIcon
                icon={data.change.includes("-") ? faCaretDown : faCaretUp}
                className="xl:mx-1"
              />
              {data.change}%
            </span>
          </div>
          <h1 className="font-bold xl:text-4xl text-2xl my-3 text-blue-600 text-center">
            {data.total.toLocaleString()}$
          </h1>
          <p className="text-sm text-gray-500">{data.date} </p>
        </div>
      ))}
    </>
  );
}