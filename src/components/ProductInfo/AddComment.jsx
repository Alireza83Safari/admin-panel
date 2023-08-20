import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { ToastContainer, toast } from "react-toastify";
import instance from "../../api/axios-interceptors";

export default function AddComment({ fetchComments }) {
  const [strengths, setStrengths] = useState([]);
  const [strengthValue, setStrengthValue] = useState("");
  const [commentValue, setCommentValue] = useState("");
  const [rate, setRate] = useState(null);
  const [weakPoints, setWeakPoints] = useState([]);
  const [weakPointsValue, setWeakPointsValue] = useState("");
  const [isCommentEmpty, setIsCommentEmpty] = useState(true); // Initialize as true

  const { productID } = useParams();

  const addNewStrength = (e) => {
    e.preventDefault();
    setStrengths([...strengths, strengthValue]);
    setStrengthValue("");
  };

  const addNewWeakPoints = (e) => {
    e.preventDefault();
    setWeakPoints([...weakPoints, weakPointsValue]);
    setWeakPointsValue("");
  };

  const deleteWeakPoint = (index) => {
    const updatedWeakPoints = weakPoints.filter((_, i) => i !== index);
    setWeakPoints(updatedWeakPoints);
  };

  const deleteStrength = (index) => {
    const updatedStrengths = strengths.filter((_, i) => i !== index);
    setStrengths(updatedStrengths);
  };

  const addCommentHandler = async (e) => {
    e.preventDefault();

    const commentObj = {
      productId: productID,
      rate: Number(rate),
      strengthPoints: strengths,
      text: commentValue,
      weakPoints: weakPoints,
    };

    try {
      await instance.post("/api/v1/user/comment", commentObj);
      fetchComments();
      toast.success("Comment added", {
        position: "bottom-right",
      });
      setRate(null);
      setCommentValue("");
      setStrengths([]);
      setWeakPoints([]);
      setIsCommentEmpty(true); // Reset to initial state
    } catch (error) {
      console.error(error);
      toast.error("Failed to add comment", {
        position: "bottom-right",
      });
    }
  };

  useEffect(() => {
    setIsCommentEmpty(
      !commentValue || !rate || strengths.length === 0 || weakPoints.length === 0
    );
  }, [commentValue, rate, strengths, weakPoints]);

  return (
    <form>
      <textarea
        name="comment"
        value={commentValue}
        id="comment"
        cols="30"
        rows="3"
        className="border rounded-md w-full py-2 px-3 focus:outline-none focus:border-blue-500 dark:bg-black-200"
        placeholder="Write your comment..."
        onChange={(e) => setCommentValue(e.target.value)}
      ></textarea>

      <fieldset className="mb-2">
        <legend className="text-sm text-gray-600">Rate this product:</legend>
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((rating) => (
            <label key={rating} className="mr-2">
              <input
                type="radio"
                name="rating"
                value={rating}
                className="focus:ring-blue-500 mx-1"
                onChange={(e) => setRate(e.target.value)}
              />
              {rating}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="flex">
        <div className="w-1/2">
          <div className="mt-4">
            <label className="block text-sm text-gray-600">Strengths:</label>
            <div className="flex items-center bg-white p-2 rounded-lg border bg-white-100 dark:bg-black-200 mr-2">
              <button className="text-2xl text-primary mr-2">
                <FontAwesomeIcon
                  icon={faPlus}
                  onClick={addNewStrength}
                  className="text-green-300"
                />
              </button>

              <input
                type="text"
                value={strengthValue}
                placeholder="Strengths"
                className="py-1 outline-none w-full dark:bg-black-200"
                onChange={(e) => setStrengthValue(e.target.value)}
              />
            </div>
          </div>

          <ul className="p-1">
            {strengths.map((strength, index) => (
              <li className="flex justify-between px-2" key={index}>
                <div>
                  <FontAwesomeIcon
                    icon={faPlus}
                    className="text-green-300 mr-2"
                  />
                  {strength}
                </div>
                <button onClick={() => deleteStrength(index)}>
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="mr-2 text-red-700"
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-1/2 mt-4">
          <div>
            <label className="block text-sm text-gray-600">WeakPoints:</label>
            <div className="flex items-center bg-white p-2 rounded-lg border bg-white-100 dark:bg-black-200 ml-2">
              <button className="text-2xl text-primary mr-2">
                <FontAwesomeIcon
                  icon={faMinus}
                  onClick={addNewWeakPoints}
                  className="text-red-700"
                />
              </button>

              <input
                type="text"
                placeholder="WeakPoints"
                className="py-1 outline-none w-full dark:bg-black-200"
                value={weakPointsValue}
                onChange={(e) => setWeakPointsValue(e.target.value)}
              />
            </div>
          </div>

          <ul className="p-1">
            {weakPoints.map((weakpoint, index) => (
              <li className="flex justify-between px-2" key={index}>
                <div>
                  <FontAwesomeIcon
                    icon={faMinus}
                    className="text-red-700 mr-2"
                  />
                  {weakpoint}
                </div>
                <button
                  onClick={() => deleteWeakPoint(index)}
                  className="mr-2 text-red-700"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <button
        className={` bg-blue-500 text-white font-semibold py-2 px-4 mt-4 rounded-md focus:outline-none ${
          isCommentEmpty ? "bg-gray-200 cursor-not-allowed" : "hover:bg-blue-600"
        }`}
        onClick={addCommentHandler}
        disabled={isCommentEmpty}
      >
        Add Comment
      </button>
    </form>
  );
}