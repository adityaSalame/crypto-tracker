import React, {useEffect, useState} from "react";
import Header from "../components/Common/Header";
import SelectCoins from "../components/Compare/SelectCoins";
import SelectDays from "../components/Coin/SelectDays";
import { FirstPage } from "@mui/icons-material";
import { getcoinData } from "../functions/getCoinData";
import { getCoinPrices } from "../functions/getCoinPrices";
import { coinObject } from "../functions/coinObject";
import Loader from "../components/Common/Loader";
import List from "../components/Dashboard/List";
import CoinInfo from "../components/Coin/CoinInfo";
import { settingChartData } from "../functions/settingChartData";
import LineChart from "../components/Coin/LineChart";
import TogglePriceType from "../components/Coin/PriceType";

function ComparePage(){

    const [crypto1,setcrypto1]=useState("bitcoin");
    const [crypto2,setcrypto2]=useState("ethereum");
    const [isLoading, setIsLoading]= useState(true);
    const [crypto1data, setCrypto1data]= useState({});
    const [crypto2data, setCrypto2data]= useState({});
    const [priceType, setPriceType] = useState("prices");
    const [days, setDays]=useState(30);
   const [chartData, setChartData] = useState({});

   async function handleDaysChange(event){
    setIsLoading(true);
    setDays(event.target.value);
      
        const prices1= await getCoinPrices(crypto1, event.target.value, priceType);
        const prices2= await getCoinPrices(crypto2, event.target.value, priceType);
        settingChartData(setChartData,prices1, prices2);
        setIsLoading(false);      
   }

   const handlePriceTypeChange= async(event, newType) => {
    setIsLoading(true);
    setPriceType(newType);
    const prices1= await getCoinPrices(crypto1, days, newType);
    const prices2= await getCoinPrices(crypto2, days, newType);
    settingChartData( setChartData ,prices1, prices2);
    setIsLoading(false);
    
};

   useEffect(()=>{
    getData();

   },[])

   async function getData(){
    setIsLoading(true);
    const data1= await getcoinData(crypto1);
    
    if(data1){
        const data2= await getcoinData(crypto2);
        coinObject(setCrypto1data, data1);
        if(data2){
            coinObject(setCrypto2data, data2);
            const prices1 = await getCoinPrices(crypto1, days, priceType);
        const prices2 = await getCoinPrices(crypto2, days, priceType);
        settingChartData(setChartData,prices1, prices2);
        console.log("both price" , prices1, prices2);
            setIsLoading(false);
    }
    }
   }

   const handleCoinChange = async(event, isCoin2)=>{
    
    setIsLoading(true);
    if(isCoin2){
     setcrypto2(event.target.value);
      const data = await getcoinData(event.target.value); 
     coinObject(setCrypto2data, data);
     const prices1= await getCoinPrices(crypto1, days, priceType);
     const prices2= await getCoinPrices(crypto2, days, priceType);
       if(prices1.length>0 && prices2.length>0){
           console.log("both price" , prices1, prices2);
           setIsLoading(false);
       }   
    }
    else {
        setcrypto1(event.target.value);
        const data = await getcoinData(event.target.value);   
        coinObject(setCrypto1data, data);
     }

  
 }

    return(
        <div>
            <Header/>
            {isLoading ? (
                <Loader/>
            ) : (
                <>
                <div className="coins-days-flex">
            <SelectCoins 
            crypto1={crypto1} 
            crypto2={crypto2}
            handleCoinChange={handleCoinChange}
            />
            
            </div>
            <div className="grey-wrapper" style={{padding:"0rem 1rem"}}>

            <List coin={crypto1data}/>
            </div>
            <div className="grey-wrapper" style={{padding:"0rem 1rem"}}>

            <List coin={crypto2data}/>
            </div>
            <div className="grey-wrapper">
            <SelectDays 
            days={days} 
            handleDaysChange={handleDaysChange} 
            noPTag={true}/>
            <TogglePriceType 
                    priceType={priceType}
                    handlePriceTypeChange={handlePriceTypeChange}
                />  
            <LineChart chartData={chartData}
             priceType={priceType}
             multiAxis={true}
             />
            </div>
            <CoinInfo heading={crypto1data.name} desc={crypto1data.desc}/>
            <CoinInfo heading={crypto2data.name} desc={crypto2data.desc}/>
            
                </>
            )}
            
        </div>
    )
}

export default ComparePage;