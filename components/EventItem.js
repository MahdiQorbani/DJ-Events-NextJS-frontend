import Link from "next/link";
import Image from "next/image";

const EventItem = ({ evt }) => {
  return (
    <div className="event">
      <div className="flex-1 m-2.5">
        <Image
          src={evt.image ? evt.image : "/images/event-default.png"}
          width={170}
          height={100}
        />
      </div>

      <div className="flex-[2_2_0%] mb-5 md:mb-0">
        <span>
          {evt.date} at {evt.time}
        </span>
        <h4>{evt.name}</h4>
      </div>

      <div>
        <Link href={`/events/${evt.slug}`} className="btn">
          Details
        </Link>
      </div>
    </div>
  );
};

export default EventItem;
