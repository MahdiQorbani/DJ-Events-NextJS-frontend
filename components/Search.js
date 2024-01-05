import { useState } from "react";
import { useRouter } from "next/router";

const Search = () => {
  const [term, setTerm] = useState("");

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/events/search?term=${term}`);
    setTerm("");
  };

  return (
    <div className="w-32 h-8">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search Events"
          className="p-1.5 border border-blue-500 rounded-full text-center"
        />
      </form>
    </div>
  );
};

export default Search;
