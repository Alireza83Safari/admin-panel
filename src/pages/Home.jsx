import React from "react";
import PopularBrand from "../components/PopularBrand";
import Banner from "../components/Banner";
import Offer from "../components/Offer";
import Suggestion from "../components/Suggestion";
import Promotion from "../components/Promotion";

export default function Home() {
  return (
    <div className="md:my-8 lg:container mx-auto lg:px-0 px-5">
      <Banner />
      <Suggestion />
      <Promotion />
      <Offer />
      <PopularBrand />
    </div>
  );
}
