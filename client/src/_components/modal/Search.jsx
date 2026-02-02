import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AiOutlineSearch } from "react-icons/ai";
import { Input } from "@/components/ui/input";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Handle search logic here
      console.log("Searching for:", searchQuery);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer">
          <AiOutlineSearch className="text-2xl" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle className="text-xl font-semibold">
            Search Products
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSearch} className="px-6 pb-6">
          <div className="relative">
            <AiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
            <Input
              type="text"
              placeholder="Search for products, categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-6 text-base w-full border-gray-200 focus:border-violet-500 focus:ring-violet-500"
              autoFocus
            />
          </div>

          {/* Quick suggestions */}
          <div className="mt-4">
            <p className="text-sm text-gray-500 mb-2">Popular Searches</p>
            <div className="flex flex-wrap gap-2">
              {["Electronics", "Clothing", "Books", "Sports", "Home"].map(
                (tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setSearchQuery(tag)}
                    className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-violet-100 hover:text-violet-600 rounded-full transition-colors"
                  >
                    {tag}
                  </button>
                ),
              )}
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Search;
