import React, { Suspense, lazy } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import Header from "../Header/Header";
import Footer from "../Footer";
import useFetch from "../../hooks/useFetch";
import Spinner from "../../components/Spinner/Spinner";

const CheckoutProducts = lazy(() => import("./CheckoutProducts"));
const CheckoutDetails = lazy(() => import("./CheckoutDetails"));

export default function Orders() {
  const { datas: orders, fetchData } = useFetch("/api/v1/user/order");

  return (
    <>
      <Header />

      <section className="bg-white-100  dark:bg-black-200 text-black-900 mt-4 mb-8 z-10 dark:text-white-100">
        <div className="flex justify-center mb-5">
          <Breadcrumb
            links={[
              { id: 1, title: "Home", to: "products" },
              { id: 2, title: "Check out", to: "orders" },
            ]}
          />
        </div>

        <div className="flex justify-center">
          <div className="relative max-h-[34rem] overflow-x-auto">
            <Suspense fallback={<Spinner />}>
              <CheckoutProducts orders={orders?.items} fetchData={fetchData} />
            </Suspense>
          </div>
          <Suspense fallback={<Spinner />}>
            <CheckoutDetails orders={orders?.items} />
          </Suspense>
        </div>
      </section>

      <Footer />
    </>
  );
}