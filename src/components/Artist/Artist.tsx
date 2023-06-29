import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from "moment";

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

  useEffect(() => {
    getTopTracks();
  }, []);

  const renderTracks = () => {
    if (tracks) {
      return tracks.map((track: any, index: any) => {
        let duration = moment.duration(track.duration_ms);
        return (
          <div
            key={track.id}
            className="bg-def-block my-2 rounded-2xl py-4 px-2 flex max-h-[10rem] items-center	"
          >
            <p>{index + 1}</p>
            <div className="mx-5 overflow-hidden rounded-[50%] w-10 h-10">
              <img
                src={track.album.images[0].url}
                alt="TopTrackImage"
                className="object-cover w-full h-full"
              />
            </div>
            <div className=" mr-5 text-xl">
              <p>{track.name}</p>
            </div>
            <p>
              {duration.minutes()}:{duration.seconds()}
            </p>
          </div>
        );
      });
    }
  };

  return (
    <div className="p-8 lg:w-4/5 rounded-2xl">
      <div className="overflow-auto mt-4 max-h-[42rem]">{renderTracks()}</div>
    </div>
  );
};
