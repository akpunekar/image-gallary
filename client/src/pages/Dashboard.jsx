import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import PhotoForm from "../components/PhotoForm";
import PhotoItem from "../components/PhotoItem";
import Spinner from "../components/Spinner";
import { getPhotos, reset } from "../features/photos/photoSlice";
import { toast } from "react-toastify";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  /* Destructuring the state of the photos reducer. */
  const { photos, isLoading, isError, message } = useSelector(
    (state) => state.photos
  );
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (!user) {
      navigate("/login");
    }

    /* Dispatching the getPhotos action to the reducer. */
    dispatch(getPhotos());

    /* A clean up function. It is called when the component is unmounted. */
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  /* Checking if the isLoading state is true. If it is true, it will return the Spinner component. */
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>Welcome {user?.user?.username || user?.username}</h1>
        <p>Photos Gallary</p>
      </section>
      <PhotoForm />
      <section className="content">
        {photos.length > 0 ? (
          <div className="goals">
            {photos.map((photo) => (
              <PhotoItem key={photo._id} photo={photo} />
            ))}
          </div>
        ) : (
          <h3>You have not uploaded any photos</h3>
        )}
      </section>
    </>
  );
}

export default Dashboard;
