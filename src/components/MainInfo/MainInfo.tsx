import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchInfo } from "../../store/Slices/infoSlice";
import BlackBG from "../../images/BlackBG.avif";
import axios from "axios";

export const MainInfo = () => {
  const logInToken = useAppSelector((state) => state.logIn.token);
  const artists = useAppSelector((state) => state.info.data);
  const [searchKey, setSearchKey] = useState("");
  const dispatch = useAppDispatch();

  const [tracks, setTracks] = useState([]);

  const searchArtists = async (e: any) => {
    e.preventDefault();
    dispatch(
      fetchInfo({
        token: logInToken ? logInToken : "",
        type: "artist",
        searchKey: searchKey,
      })
    );
  };

  const getTopTracks = async () => {
    let artistID = artists.items[0].id;

    let artistTracks = await axios.get(
      `https://api.spotify.com/v1/artists/${artistID}/top-tracks`,
      {
        headers: {
          Authorization: `Bearer ${logInToken}`,
        },
        params: {
          limit: 10,
          market: "US",
        },
      }
      // "https://api.spotify.com/v1/playlists/1Wpkqq78l9bmM4UNUbotJ6?si=9261ec48bbfc44de",
      // {
      //   headers: {
      //     Authorization: `Bearer ${logInToken}`,
      //   },
      // }
    );

    setTracks(artistTracks.data.tracks);
  };

  useEffect(() => {
    if (artists) {
      getTopTracks();
    }
  }, [artists]);

  console.log(artists);
  console.log(tracks);

  const renderArtists = () => {
    if (artists) {
      return artists.items.map((artist: any) => (
        <div
          key={artist.id}
          className="bg-def-block my-4 rounded-2xl py-8 px-5 flex max-h-[10rem] "
        >
          <div className="min-w-[5rem] max-w-[5rem] mr-5 ">
            <img
              src={artist.images.length ? artist.images[0].url : BlackBG}
              alt="ArtistImage"
              className="rounded-full h-[5rem] min-w-[100%] cursor-pointer"
            />
          </div>
          <div className="text-xl cursor-pointer">
            <p>{artist.name}</p>
            <p>Followers: {artist.followers.total}</p>
          </div>
        </div>
      ));
    }
  };

  const renderTracks = () => {
    if (tracks) {
      return tracks.map((track: any) => (
        <div
          key={track.id}
          className="bg-def-block my-4 rounded-2xl py-8 px-5 flex max-h-[10rem] "
        >
          <div className="min-w-[5rem] mr-5 ">
            <img
              src={track.album.images[0].url}
              alt="ArtistImage"
              className="rounded-full h-[5rem] min-w-[100%] cursor-pointer"
            />
          </div>
          <div className="text-xl cursor-pointer">
            <p>{track.name}</p>
          </div>
        </div>
      ));
    }
  };

  return (
    <div className="p-8 lg:w-4/5 rounded-2xl">
      <div>
        <form onSubmit={searchArtists} className="flex">
          <input
            type="text"
            className="w-56 mr-2 bg-def-block border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-def-block dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="What do you want to listen to?"
            onChange={(e) => setSearchKey(e.target.value)}
          />
          <button
            className="bg-def-block focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:focus:ring-yellow-900"
            type={"submit"}
          >
            Search
          </button>
        </form>
      </div>
      <div className="overflow-auto mt-4 max-h-[42rem]">{renderArtists()}</div>
      <div className="overflow-auto mt-4 max-h-[42rem]">{renderTracks()}</div>
      {/* <iframe className="rounded-xl w-full h-[32rem]" src="https://open.spotify.com/embed/playlist/1Wpkqq78l9bmM4UNUbotJ6?utm_source=generator&theme=0" frameBorder="0" allowFullScreen={true} allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe> */}
      {/* https://open.spotify.com/playlist/1Wpkqq78l9bmM4UNUbotJ6?si=9261ec48bbfc44de */}
    </div>
  );
};
