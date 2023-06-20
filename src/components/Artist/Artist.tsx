import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import axios from "axios";
import { useParams } from "react-router-dom";

export const Artist = () => {
  const logInToken = useAppSelector((state) => state.logIn.token);
  const { name } = useParams<{ name: string }>();
  const dispatch = useAppDispatch();

  const [tracks, setTracks] = useState([]);

  const getTopTracks = async () => {
    let artistID = name;

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

  console.log(tracks);

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
      <div className="overflow-auto mt-4 max-h-[42rem]">{renderTracks()}</div>
    </div>
  );
};
