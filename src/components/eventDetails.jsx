import { useParams } from "react-router-dom";
import useFetch from "../useFetch";
import { Link } from "react-router-dom";

export default function EventDetails() {
  const eventId = useParams();
  const { data, loading } = useFetch("https://meetup-backend-azvc.vercel.app/events");
  const details = data?.find((d) => d._id == eventId.id);

  const { data: speaker } = useFetch("https://meetup-backend-azvc.vercel.app/speakers");
  
  const filterSpeaker = speaker?.filter(speaker => speaker.title == details?.title)
  console.log(filterSpeaker);

  const formatDate = (isoString) => {
    const date = new Date(isoString);

    const options = {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    };

    return date.toLocaleString("en-US", options);
  };


  return (
    <div className="bg-light">
      <div className="container">
        <nav className="navbar pb-3">
          <Link to="/" className="navbar-brand text-danger">meetup</Link>
        </nav>
        <hr />
        <main>
          <section>
            {loading && <h2>Loading...</h2>}
          </section>
          <section className="row">
            <div className="col-12 col-lg-8">
              <h1>{details?.title}</h1>
              <p className="m-0">Hosted By:</p>
              <h5>{details?.host}</h5>
              <img src={details?.thumbnailUrl} className="my-3 rounded img-fluid" />
              <h3>Details:</h3>
              <p>{details?.description}</p>
              <h3>Additional Information:</h3>
              <p className="mb-1">
                <strong>Dress Code:</strong> {details?.dressCode}
              </p>
              <p>
                <strong>Age Restriction:</strong> {details?.ageRestriction}
              </p>
              <h3>Event Tags:</h3>
              <p className="btn btn-primary none">
                {details?.tag.join(" || ")}
              </p>
            </div>
            <div className="col-lg-4 col-12">
              <div className="bg-white rounded-3 container p-3">
                <div className="row py-2">
                  <div className="col-1 my-3">&#x1F552;</div>
                  <div className="col">
                    <p className="mb-0">{formatDate(details?.startDate)} to </p>
                    <p>{formatDate(details?.endDate)}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-1">&spades;</div>
                  <div className="col">
                    <p className="mb-0">{details?.venue}</p>
                  </div>
                </div>
                <div className="row py-3">
                  <div className="col-1">&#8377;</div>
                  <div className="col">
                    <p className="mb-0">{details?.fees}</p>
                  </div>
                </div>
              </div>
              <h2 className="mt-4">Speakers: ({filterSpeaker?.length})</h2>
              <div className="row">
                {filterSpeaker && filterSpeaker.map(s => (
                    <div className="col-5 card ms-4 text-center mt-2">
                        <img src={s.speakerUrl} className="rounded-circle w-50 mt-2 align-self-center"/>
                        <h5>{s.speakerName}</h5>
                        <p className="mb-0">{s.speakerPosition}</p>
                    </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}


