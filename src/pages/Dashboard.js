import React, { useEffect, useState } from "react";
import Header from "../components/Common/Header";
import Tabs from "../components/Dashboard/Tabs";
import { FirstPage } from "@mui/icons-material";
import axios from "axios";
import Search from "../components/Dashboard/Search";
import Pagination from "../components/Dashboard/Pagination";
import PaginationComponent from "../components/Dashboard/Pagination";
import Loader from "../components/Common/Loader";
import BackToTop from "../components/Common/BackToTop";
import { get100Coins } from "../functions/get100Coins";
import Footer from "../components/Common/Footer";

function DashboardPage(){

    const [coins,setCoins]=useState([]);
    const [paginatedCoins,setPaginatedtCoins]=useState([]);
    const [search, setSearch]= useState("");
    const [isLoading, setIsLoading]=useState(true);
    const [scroll, setScroll]=useState(true);
    const [page, setPage] = useState(1);
    
    const handlePageChange = (event, value) => {
        setPage(value);
        var previousIndex=(value-1)*10;
        setPaginatedtCoins(coins.slice(previousIndex,previousIndex+10));
    };

    

    const onSearchChange=(e)=>{
        setSearch(e.target.value);
      
    }

    var filteredCoins = coins.filter((item)=>
     item.name.toLowerCase().includes(
        search.toLowerCase())||
    item.symbol.toLowerCase().includes(
            search.toLowerCase()
     
     )
    );
        
        

    useEffect(()=>{
        getData();


    },[]);

    const getData = async()=>{
        const myCoins= await get100Coins();
       if(myCoins){
        setCoins(myCoins);
        setPaginatedtCoins(myCoins.slice(0,10));
        setIsLoading(false);
       }
    }

    return(
        <>
           <Header/>
           <BackToTop/>
           {isLoading ? (
            <Loader/>
           ):(
            <div>
            <Search search={search} onSearchChange={onSearchChange}/>
            <Tabs coins={search? filteredCoins : paginatedCoins}
                setSearch={setSearch} 
                    
                
            />
            {!search && 
            (<PaginationComponent 
                page={page} 
                handlePageChange={handlePageChange}/>
            )}
            
         </div>
         
           )}
           <Footer filteredCoins={filteredCoins}  />
           
         </> 
         
    );
}

export default DashboardPage;