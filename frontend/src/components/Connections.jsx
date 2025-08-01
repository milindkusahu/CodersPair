import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0)
    return (
      <h1 className="mt-1 text-center text-2xl/9 font-bold tracking-tight text-gray-300">
        No Connections Found!!!
      </h1>
    );

  return (
    <div className="my-10">
      <h2 className="mb-8 text-center text-2xl/9 font-bold tracking-tight text-gray-300">
        Connections
      </h2>

      <div className="flex flex-row flex-wrap gap-6 justify-center">
        {connections.map((connection) => {
          const {
            _id,
            firstName,
            lastName,
            photoUrl,
            age,
            gender,
            about,
            skills,
          } = connection;

          return (
            <div key={_id} className="card w-80 bg-base-300 shadow-sm">
              <figure className="px-6 pt-6">
                <img
                  src={photoUrl || "/default-avatar.png"}
                  alt={`${firstName} ${lastName}`}
                  className="rounded-xl w-32 h-32 object-cover"
                />
              </figure>

              <div className="card-body items-center text-center">
                <h2 className="card-title text-xl font-bold">
                  {firstName} {lastName}
                </h2>

                <div className="flex gap-4 text-sm opacity-80 mb-3">
                  <span>{age} years old</span>
                  <span className="capitalize">{gender}</span>
                </div>

                {about && (
                  <p className="text-sm opacity-90 mb-4 line-clamp-3">
                    {about}
                  </p>
                )}

                {skills && skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 justify-center mb-4">
                    {skills.slice(0, 3).map((skill, index) => (
                      <div key={index} className="badge badge-outline badge-sm">
                        {skill}
                      </div>
                    ))}
                    {skills.length > 3 && (
                      <div className="badge badge-outline badge-sm">
                        +{skills.length - 3} more
                      </div>
                    )}
                  </div>
                )}

                <div className="card-actions">
                  <button className="btn btn-primary btn-sm">
                    View Profile
                  </button>
                  <button className="btn btn-ghost btn-sm">Message</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
