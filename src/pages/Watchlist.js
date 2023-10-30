import React, { useEffect, useState } from "react";
import Button from "../components/Common/Button";
import { Link } from "react-router-dom";
import Header from "../components/Common/Header";
import Loader from "../components/Common/Loader";
import Tabs from "../components/Dashboard/Tabs";
import { get100Coins } from "../functions/get100Coins";

function Watchlist() {
  const coins = JSON.parse(localStorage.getItem("watchlist"));
  const [myWatchlist, setMyWatchlist] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    const allCoins = await get100Coins();
    if (coins) {
      setMyWatchlist(allCoins.filter((item) => coins.includes(item.id)));
    }
    setLoading(false);
  };

  return (
    <div>
        <Header/>
      {loading || !coins ? (
        <Loader />
      ) : (
        <div style={{ minHeight: "90vh" }}>
          {myWatchlist?.length == 0 || !coins ? (
             <div >
             <div className="no-items">
             <h1 >
             No items in the Watchlist!
             </h1>
             </div>
             <div className="clear" >
             <Link to="/dashboard">
                        <Button 
                        text={"Dashboard"}
                        onClick={()=>{console.log("click")}}
                        />
                </Link>
             </div>
           </div>
            
          ) : (
            <div >
              
              <Tabs coins={myWatchlist} isWatchlistPage={true} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Watchlist;