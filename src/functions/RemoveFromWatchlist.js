import { toast } from "react-toastify";

export const RemoveFromWatchlist = (id) => {
  if (window.confirm("Are you sure you want to remove this coin?")) {
    let items = localStorage.getItem("watchlist");
    let arr = JSON.parse(items);
    localStorage.setItem(
      "watchlist",
      JSON.stringify(arr.filter((item) => item != id))
    );
    toast.success(
      `${
        id.slice(0, 1).toUpperCase() + id.slice(1)
      } removed successfully!`
    );
  } else {
    toast.error("Couldn't remove the coin from the watchlist!");
  }
};