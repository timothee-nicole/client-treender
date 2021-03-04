import React from "react";
// import { Card } from "semantic-ui-react";

const HomePage = () => {
  return (
    <div>
      <div className="home-image">
        <h1 style={{ color: "white", fontSize: "6em" }}>TREENDER</h1>
      </div>

      {/* <div className="home-about">
        <Card
          style={{ height: "85%", width: "85%" }}
          href="/products"
          header="Check out our trees!"
          description="Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat."
        />
        <Card
          style={{ height: "85%", width: "85%" }}
          href="/signup"
          header="Register Now!"
          description="vieux ca me manque de coder avec toi, chaud on se refait une petite session ?"
        />
        <Card
          style={{ height: "85%", width: "85%" }}
          href="/profile"
          header="Check your current orders and profile!"
          description="Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat."
        />
      </div> */}
      {/* <!-- This example requires Tailwind CSS v2.0+ --> */}
<div class="py-12 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="lg:text-center">
      <h2 class="text-base text-green-700 font-semibold tracking-wide uppercase">TREENDER</h2>
      <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        A better way to celebrate Christmas
      </p>
      <p class="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
        This Christmas, rent a Christmas tree and save enjoy its company for the holidays!
      </p>
    </div>

    <div class="mt-10">
      <dl class="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
        <div class="flex">
          <div class="flex-shrink-0">
            <div class="flex items-center justify-center h-12 w-12 rounded-md bg-green-700 text-white">
              {/* <!-- Heroicon name: outline/globe-alt --> */}
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <dt class="text-lg leading-6 font-medium text-gray-900">
              Register now and book!
            </dt>
            <dd class="mt-2 text-base text-gray-500">
              In a matter of minutes, you'll be able to choose from our large variety of trees!
            </dd>
          </div>
        </div>

        <div class="flex">
          <div class="flex-shrink-0">
            <div class="flex items-center justify-center h-12 w-12 rounded-md bg-green-700 text-white">
              {/* <!-- Heroicon name: outline/scale --> */}
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <dt class="text-lg leading-6 font-medium text-gray-900">
              No guilty conscience!
            </dt>
            <dd class="mt-2 text-base text-gray-500">
              Instead of killing a tree, let it spend the holiday season with your family.
            </dd>
          </div>
        </div>

        <div class="flex">
          <div class="flex-shrink-0">
            <div class="flex items-center justify-center h-12 w-12 rounded-md bg-green-700 text-white">
              {/* <!-- Heroicon name: outline/lightning-bolt --> */}
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <dt class="text-lg leading-6 font-medium text-gray-900">
              Fast and hassle-free!
            </dt>
            <dd class="mt-2 text-base text-gray-500">
              We pride ourselves in sending your rented a tree as quickly as possible and pick it up again just as quickly.
            </dd>
          </div>
        </div>

        <div class="flex">
          <div class="flex-shrink-0">
            <div class="flex items-center justify-center h-12 w-12 rounded-md bg-green-700 text-white">
              {/* <!-- Heroicon name: outline/annotation --> */}
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <dt class="text-lg leading-6 font-medium text-gray-900">
              Keep up to date!
            </dt>
            <dd class="mt-2 text-base text-gray-500">
             Set your arrival and departure date for your tree on our calendar.
            </dd>
          </div>
        </div>
      </dl>
    </div>
  </div>
</div>
    </div>
  );
};

export default HomePage;
