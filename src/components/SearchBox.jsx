import { useState, useEffect, useRef } from "react";
import axios from "axios";

const SearchBox = ({ onSearch }) => {
    const [city, setCity] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    const wrapperRef = useRef(null); // ref for outside click

    const apiKey = "38f6b59b09717509d37b79ea07a70f07";

    
    useEffect(() => {
        if (city.length < 2) {
            setSuggestions([]);
            setShowDropdown(false);
            return;
        }

        const fetchSuggestions = async () => {
            try {
                const res = await axios.get(
                    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`
                );
                setSuggestions(res.data);
                setShowDropdown(true);
            } catch (error) {
                console.error("Error fetching city suggestions");
            }
        };

        fetchSuggestions();
    }, [city]);

    // Detect click outside dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target)
            ) {
                setShowDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSelect = (place) => {
        const fullName = `${place.name}${
            place.state ? ", " + place.state : ""
        }, ${place.country}`;

        setCity(fullName);
        setSuggestions([]);
        setShowDropdown(false);
        onSearch(place.name);
    };

    const handleSearch = () => {
        if (city.trim() === "") return;
        onSearch(city);
        setShowDropdown(false);
    };

    return (
        <div ref={wrapperRef} className="relative w-80">
            <div className="flex gap-2">
                <input
                    type="text"
                    placeholder="Enter city name..."
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="border-b-2 p-2 border-gray-300 w-full outline-none bg-[#eee] rounded-xl text-blue-600 "
                    onFocus={() => {
                        if (suggestions.length > 0) setShowDropdown(true);
                    }}
                />
                <button
                    onClick={handleSearch}
                    className="bg-blue-500 text-white px-4 rounded-lg hover:bg-blue-600 cursor-pointer"
                >
                    Search
                </button>
            </div>

            {showDropdown && suggestions.length > 0 && (
                <ul className="absolute z-10 bg-white border w-full mt-1 rounded-md shadow-lg">
                    {suggestions.map((place, index) => (
                        <li
                            key={index}
                            onClick={() => handleSelect(place)}
                            className="px-3 py-2 cursor-pointer hover:bg-blue-100"
                        >
                            {place.name}
                            {place.state && `, ${place.state}`} (
                            {place.country})
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBox;



//  import { useState } from "react";
// const SearchBox = ({ onSearch }) => {
//     const [city, setCity] = useState("");
//     const handleSearch = () => {
//         if (city.trim() === "")
//             return;
//         onSearch(city);
//     };
//     return (
//         <div className="flex gap-2 py-2">
//             <input type="text" placeholder="Enter city name..."
//                 value={city} onChange={(e) => setCity(e.target.value)}
//                 className="border-b-2 p-2 border-gray-300 w-60 outline-none bg-[#eee] rounded-xl" />
//             <button onClick={handleSearch}
//                 className="bg-blue-500 text-white px-5 py-1 rounded-lg hover:bg-blue-600" > Search </button>
//         </div>);
// };
// export default SearchBox;