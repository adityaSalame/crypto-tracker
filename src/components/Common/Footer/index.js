import React, { useState } from "react";
import "./style.css";
function Footer({filteredCoins}){
    let isscroll=true;
    if(filteredCoins.length===0 || !filteredCoins) isscroll=false;
    
   let style=isscroll?"footer":"fixedfooter";
    return <div className={style}>Crypto Tracker 10/2023</div>;
}

export default Footer;