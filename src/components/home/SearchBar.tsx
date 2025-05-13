
import { Search } from "lucide-react";
import { ChangeEvent } from "react";
import { useAppContext } from "@/context/AppContext";

const SearchBar = () => {
  const { searchTerm, setSearchTerm } = useAppContext();

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="relative">
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        className="block w-full pr-10 py-3 bg-white border border-gray-200 rounded-lg focus:ring-medical-500 focus:border-medical-500 text-gray-900"
        placeholder="ابحث عن طبيب أو تخصص..."
      />
    </div>
  );
};

export default SearchBar;
