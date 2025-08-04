import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });

      dispatch(addRequest(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0)
    return (
      <h1 className="mt-1 text-center text-2xl/9 font-bold tracking-tight text-gray-300">
        No Requests Found!!!
      </h1>
    );

  return (
    <div className="my-10">
      <h2 className="mb-8 text-center text-2xl/9 font-bold tracking-tight text-gray-300">
        Connection Requests
      </h2>

      <div className="flex flex-row flex-wrap gap-6 justify-center">
        {requests.map((request) => {
          const {
            _id,
            firstName,
            lastName,
            photoUrl,
            age,
            gender,
            about,
            skills,
          } = request.fromUserId;

          return (
            <div key={_id} className="card w-80 bg-base-300 shadow-sm">
              <figure className="px-6 pt-6">
                <img
                  src={photoUrl || "/default-avatar.png"}
                  alt={`${firstName} ${lastName}`}
                  className="rounded-xl w-32 h-38 object-fill"
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
                  <button className="btn btn-secondary btn-sm">Reject</button>
                  <button className="btn btn-success btn-sm">Accept</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
