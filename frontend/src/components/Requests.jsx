import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        BASE_URL + `/request/review/${status}/${_id}`,
        {},
        {
          withCredentials: true,
        }
      );

      dispatch(removeRequest(_id));
    } catch (err) {
      console.error(err);
    }
  };

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });

      dispatch(addRequest(res?.data?.data));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!requests || requests.length === 0) {
      fetchRequests();
    }
  }, []);

  if (!requests) return null;

  if (loading) {
    return <p className="text-center mt-10">Loading requests...</p>;
  }

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
                  className="rounded-xl w-36 h-36 object-cover"
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
                  <button
                    aria-label={`Reject request from ${firstName} ${lastName}`}
                    className="btn btn-secondary btn-sm"
                    onClick={() => reviewRequest("rejected", request._id)}
                  >
                    Reject
                  </button>
                  <button
                    aria-label={`Accept request from ${firstName} ${lastName}`}
                    className="btn btn-success btn-sm"
                    onClick={() => reviewRequest("accepted", request._id)}
                  >
                    Accept
                  </button>
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
