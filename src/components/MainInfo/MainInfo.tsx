import { useState } from "react";

export const MainInfo = () => {
  const [searchKey, setSearchKey] = useState("");

  const searchArtists = async (e: any) => {
    // e.preventDefault();
    // const { data } = await axios.get("https://api.spotify.com/v1/search", {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    //   params: {
    //     q: searchKey,
    //     type: "artist",
    //   },
    // });
    // setArtists(data.artists.items);
  };

  return (
    <div className="p-8 lg:w-4/5 rounded-2xl ">
      <form onSubmit={searchArtists}className="flex">
        <input
          type="text"
          className="w-56 mr-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="What do you want to listen to?"
          onChange={(e) => setSearchKey(e.target.value)}
        />
        <button className="bg-def-block focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:focus:ring-yellow-900" type={"submit"}>
          Search
        </button>
      </form>
    </div>
  );
};
