import React, {useState} from "react";
import "./style.css";
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import { Tooltip } from "@mui/material";
import { convertNumbers } from "../../../functions/convertNumbers";
import { Link } from "react-router-dom";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

import { MyWatchlist } from "../../../functions/MyWatchlist";
import {IconButton} from "@mui/material";
import { RemoveFromWatchlist } from "../../../functions/RemoveFromWatchlist";
import { AddToWatchlist } from "../../../functions/AddToWatchList";

function List({coin}){
    const [inlist, setInList]= useState(MyWatchlist(coin.id));
    return(
        <Link to={`/coin/${coin.id}`}>
        <tr className="list-row">
            <Tooltip title="Coin Logo" placement="bottom-start">
            <td className="td-image">
               
               <img src={coin.image} className="coin-logo"/>
            </td>
            </Tooltip>
            <Tooltip title="Coin Info"  placement="bottom-start">
            <td>
               <div className="name-col">
               <p className="coin-symbol">{coin.symbol}</p>
               <p className="coin-name"> {coin.name}</p>
           </div>
           </td>
           </Tooltip>
           
           {coin.price_change_percentage_24h>0? (
            <Tooltip title="Price change in 24Hrs"  placement="bottom-start">
           <td className="chip-flex">
               <div className="price-chip">
                   {coin.price_change_percentage_24h.toFixed(2)}%
               </div>
               <div className="icon-chip td-icon">
                   <TrendingUpRoundedIcon/>
               </div>
           </td>
           </Tooltip>
           ) :(
            <Tooltip title="Price change in 24Hrs"  placement="bottom-start">
               <td className="chip-flex">
               <div className="price-chip chip-red">
                   {coin.price_change_percentage_24h.toFixed(2)}%
               </div>
               <div className="icon-chip chip-red td-icon">
                   <TrendingDownRoundedIcon/>
               </div>
               </td>
               </Tooltip>
           )}
           <Tooltip title="Current Price"  >
           <td>
           <h3 className="coin-price td-center-align" 
                style={{color:
                   coin.price_change_percentage_24h<0?
                   "var(--red}"
                   :
                   "var(--green)"
                   }}>
                   ${coin.current_price.toLocaleString()}
               </h3>
           </td>
           </Tooltip>
           <Tooltip title="Total Volume" >
            <td>
            <p className="total_volume td-right-align td-total-volume">

                ${coin.total_volume.toLocaleString()}
            </p>
            </td>
            </Tooltip>  
            <Tooltip title="Market Cap"  > 
              <td className="desktop-td-mkt">
              <p className="market_cap td-right-align">
                   ${coin.market_cap.toLocaleString()}
               </p>
              </td>
              </Tooltip>
            <Tooltip title="Market Cap"  > 
              <td className="mobile-td-mkt">
              <p className="market_cap td-right-align">
                   ${convertNumbers(coin.market_cap)}
               </p>
              </td>
              </Tooltip>
              <Tooltip title="WatchList"  > 
              <td className="marked-container-list">
              {coin.price_change_percentage_24h>0? (
                <div >
                    <IconButton onClick={(e) => {
                    e.preventDefault();
                    if (inlist) {
                      RemoveFromWatchlist(coin.id);
                        setInList(false);
                    } else {
                      AddToWatchlist(coin.id);
                      setInList(true);
                    }
                    console.log("this->",inlist);
                }
                }
                >
                    {inlist? 
                    <StarRoundedIcon className=" marked chip-green"/>
                     : 
                    <StarBorderRoundedIcon className=" marked chip-green" 
                    />}
                </IconButton>
                </div>)
                :
                (
                     <div >
                     <IconButton onClick={(e) => {
                    e.preventDefault();
                    if (inlist) {
                      RemoveFromWatchlist(coin.id);
                        setInList(false);
                    } else {
                      AddToWatchlist(coin.id);
                      setInList(true);
                    }
                    console.log("this->",inlist);
                }
                }
                >
                    {inlist? <StarRoundedIcon className="marked chip-red"/> : <StarBorderRoundedIcon className="marked chip-red"/>}
                </IconButton>
                 </div>
                )}
              </td>
              </Tooltip>
              
           
        </tr>
        </Link>
    )
}

export default List;