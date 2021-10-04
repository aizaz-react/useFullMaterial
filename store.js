import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { cards } from "../../../service/auth";
import { FeatureSeller } from "../../../service/auth";
import { SpecialOfferCard } from "../../../service/auth";
import { Search } from "../../../service/auth";
import { imageMediaApi } from "../../../config.json";
import Card from "../../../components/cards/cards";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Grid from "@material-ui/core/Grid";
import "./store.scss";

function Store() {
  const history = useHistory();
  const [state, setState] = useState([]);
  const [showCard, setShowCard] = useState(true);
  const [showSpecialCard, setShowSpecialCard] = useState(true);
  const [showFeatureSeller, setShowFeatureSeller] = useState(true);
  const [featureSeller, setFeatureSeller] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [specialCard, setSpecialCard] = useState([]);
  const [allData, setAllData] = useState([]);

  const cards1 = async () => {
    try {
      let { data } = await cards();
      setState(data);
      console.log(data);
      if (data.length === 0) {
        setShowCard(true);
      } else {
        setShowCard(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const SpacialOfferCards = async () => {
    try {
      let { data } = await SpecialOfferCard();
      setSpecialCard(data);
      if (data.length === 0) {
        setShowSpecialCard(true);
      } else {
        setShowSpecialCard(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const FeatureSellerList = async () => {
    try {
      let { data } = await FeatureSeller();
      setFeatureSeller(data);
      if (data.length === 0) {
        setShowFeatureSeller(true);
      } else {
        setShowFeatureSeller(false);
      }

      console.log(featureSeller);
    } catch (err) {
      console.error(err);
    }
  };

  const searchSeller = async () => {
    try {
      let { data } = await Search();
      setAllData(data.name);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    cards1();
    FeatureSellerList();
    SpacialOfferCards();
    searchSeller();
  }, []);

  return (
    <div className="store">
      <Grid spacing={2} className="feature-seller">
        <h2 className="p-seller">Featured Seller</h2>
        <Grid spacing={4} className="store-header">
          {showFeatureSeller ? (
            <Grid items xs={12} md={8} className="scrollbar">
              <h1 style={{ fontSize: "1rem" }}>No feature seller available</h1>
            </Grid>
          ) : (
            <Grid items xs={12} md={8} className="scrollbar">
              {featureSeller.map((item, index) => {
                return (
                  <Avatar
                    key={index}
                    src={imageMediaApi + item.profile_pic}
                    className="feature-avatar"
                    onClick={() => {
                      localStorage.setItem("feature-id", item.id);
                      history.push("/sellerProfile");
                    }}
                  ></Avatar>
                );
              })}
            </Grid>
          )}
          <Grid
            item
            xs={12}
            md={3}
            // className="store-search"
          >
            <Paper
              component="form"
              style={{
                display: "flex",
                width: "100%",
                flexDirection: "column",
              }}
            >
              <div>
                <InputBase
                  className="input"
                  placeholder="Search"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <IconButton aria-label="menu" style={{ padding: "1% 0%" }}>
                  <SearchIcon />
                </IconButton>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "#ffffff",
                }}
              >
                {allData
                  .filter((value) => {
                    if (searchTerm === "") {
                      return null;
                    } else if (
                      value.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    ) {
                      return value;
                    }
                  })
                  .map((value, index) => {
                    console.log(value);
                    return (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          margin: "1% 1%",
                          backgroundColor: "#F2F2F2",
                          height: "50px",
                          alignItems: "center",
                          padding: "0% 2%",
                          borderRadius: "2px 2px 2px 2px",
                        }}
                      >
                        <Avatar
                          src={imageMediaApi + value.profile_pic}
                          className="avatar"
                        />
                        <h2 style={{ alignSelf: "center", margin: "0% 5%" }}>
                          {value.name}
                        </h2>
                      </div>
                    );
                  })}
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      <div className="store-all-cards">
        {showCard ? (
          <div className="store-cards">
            <h2>Cards for Sale</h2>
            <div
              style={{
                width: "100%",
                height: "50vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h1>No Card Found</h1>
            </div>
          </div>
        ) : (
          <div className="store-cards">
            <h2 style={{ color: "#5bc16b" }}>Cards for Sale</h2>
            <div
              className="all-sale-cards"
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                height: "50vh",
              }}
            >
              {state.map((item, index) => {
                return (
                  <div
                    style={{
                      margin: "1%",
                    }}
                    onClick={() => {
                      localStorage.setItem("card-id", item.id);
                      history.push(`/cardOpen/${item.user_id}`);
                    }}
                  >
                    <Card
                      name={item.realative_name}
                      number={item.card_no}
                      expiry={item.card_expiry}
                      amount={item.card_sell_price}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {showSpecialCard ? (
          <div className="special-card">
            <h2 className="text">Special Offer Card</h2>
            <div className="special-card-empty">
              <h1
                style={{
                  display: "flex",
                  alignSelf: "center",
                  fontSize: "20px",
                }}
              >
                No Special Offer Card
              </h1>
            </div>
          </div>
        ) : (
          <div className="special-card">
            <h2 className="text">Special Offer Card</h2>
            <div
              className="special-card-full"
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {specialCard.map((item, index) => {
                return (
                  <div
                    style={{ margin: "1%" }}
                    onClick={() => {
                      localStorage.setItem("card-id", item.id);
                      history.push("/cardOpen");
                    }}
                  >
                    <Card
                      name={item.realative_name}
                      number={item.card_no}
                      expiry={item.card_expiry}
                      amount={item.card_sell_price}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Store;
