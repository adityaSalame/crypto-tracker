import React ,{useState}from "react";
import "./style.css";
import {Box,createTheme, ThemeProvider} from '@mui/material';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { create } from "@mui/material/styles/createTransitions";
import Grid from "../Grid";
import List from "../List";
import Button from "../../Common/Button";

export default function Tabs({coins, setSearch, isWatchlistPage}) {
  const [value, setValue] = useState("grid");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const style={
    color:"var(--white)",
    width:"50vw",
    fontSize:"1.2rem",
    fontFamily:"Inter",
    textTransform:"capitalize",
  };

  const theme=createTheme({
    palette:{
        primary:{
            main: "#3a80e9",
        },
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <TabContext value={value}>
        <div >
          <TabList onChange={handleChange} variant="fullWidth">
            <Tab label="Grid" value="grid" sx={style}/>
            <Tab label="List" value="list" sx={style}/>
            
          </TabList>
        </div>
        <TabPanel value="grid">
        {coins.length == 0 ? (
                <div >
                  <div className="no-items">
                  <h1 >
                    No Items Match Your Search!
                  </h1>
                  </div>
                  <div className="clear" >
                    <Button
                      text={"Clear Search"}
                      onClick={(e) => {
                        setSearch("");
                      }}
                    />
                  </div>
                </div>
              ) :(
            <div className="grid-flex">
              {coins.map((coin,i)=>{
                    return(
                     <Grid coin={coin} key={i} isWatchlistPage={isWatchlistPage}
                     />
                    );
              } )}

            </div>)}
        </TabPanel>
        <TabPanel value="list">
        {coins.length == 0 ? (
                <div >
                  <div className="no-items">
                  <h1 >
                    No Items Match Your Search!
                  </h1>
                  </div>
                  <div className="clear" >
                    <Button
                      text={"Clear Search"}
                      onClick={(e) => {
                        setSearch("");
                      }}
                    />
                  </div>
                </div>
              ) :(
        <table className="list-table">
        {coins.map((coin,i)=>{
                    return(
                     <List coin={coin} key={i} isWatchlistPage={isWatchlistPage}/>
                    );
              } )}
        </table>)
        }
        </TabPanel>
        
      </TabContext>
    </ThemeProvider>
  );
}


