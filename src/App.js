import React, { useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import Ingrediens from "./Ingredients";
import Basket from "./Basket";
import Banner from "./Banner";
import Checkout from "./Checkout";
import "./App.css";

function App() {
  const [state, setState] = useState({
    ingredientArr: [
      { kind: "Breads", types: [{ White: 3 }, { Brown: 4 }, { Shifon: 2 }], picture: "./img/breads.png" },
      { kind: "Vegetables", types: [{ Tomato: 2 }, { Lettuce: 4 }, { Cucumber: 3 }], picture: "./img/vegetables.png" },
      { kind: "Spreads", types: [{ Mayo: 5 }, { Ketchup: 3 }, { Aioli: 2 }], picture: "./img/spreads.png" },
      { kind: "Meats", types: [{ Ham: 4 }, { Chicken: 3 }, { Tofu: 2 }], picture: "./img/meats.png" }
    ],
    basket: [],
    msg: "",
    bannerIsShown: false,
    checkoutIsShown: false
  });

  const addToBasket = (kind, type) => {
    const updatedIngredientArr = [...state.ingredientArr];
    const kindIndex = updatedIngredientArr.findIndex(item => item.kind === kind);
    const typeIndex = updatedIngredientArr[kindIndex].types.findIndex(item => item.hasOwnProperty(type));
    if (updatedIngredientArr[kindIndex].types[typeIndex][type] > 0){
      updatedIngredientArr[kindIndex].types[typeIndex][type]--;
      const itemType = type[0];
      const newItem = {[itemType] : 1, kind};
      const updatedBasket = [...state.basket];
      const basketIndex = updatedBasket.findIndex(item => item.hasOwnProperty(type))
      if (basketIndex !== -1) {
        updatedBasket[basketIndex][itemType]++;
       } else {
         updatedBasket.push(newItem);
       }
      setState((state) => ({ ...state, bannerIsShown: false, ingredientArr: updatedIngredientArr, basket: updatedBasket }));
    } else {
      setState((state) => ({ ...state, msg: `no ${type[0]} ${kind} left in stock!`, bannerIsShown: true }));
    }
  };

  const removeFromBasket = (ingridient) => {
    const ingridientType = Object.keys(ingridient)[0];
    const updatedBasket = [...state.basket];
    const basketIndex = updatedBasket.findIndex(item => item.hasOwnProperty(ingridientType))
    updatedBasket[basketIndex][ingridientType]--;
    if (updatedBasket[basketIndex][ingridientType] === 0) {
      updatedBasket.splice(basketIndex,1);
    }
    const updatedIngredientArr = [...state.ingredientArr];
    const kindIndex = updatedIngredientArr.findIndex(item => item.kind === ingridient.kind);
    const typeIndex = updatedIngredientArr[kindIndex].types.findIndex(item => item.hasOwnProperty(ingridientType));
    updatedIngredientArr[kindIndex].types[typeIndex][ingridientType]++;
    setState((state) => ({ ...state, bannerIsShown: false, basket: updatedBasket, ingredientArr: updatedIngredientArr }));
  }

  const checkout = () => {
    setState((state) => ({ ...state, msg : <Checkout  items={state.basket} /> }));
    setState((state) => ({ ...state, bannerIsShown: true }));
  }

  const bannerHide = () => setState((state) => ({ ...state, bannerIsShown : false }));
  const bannerShow = () => setState((state) => ({ ...state, bannerIsShown : true }));

  return (
    <div className="App flex col">
      <div className="title">Order Up !</div>
      {/* <div className="container"> */}
      <Row>
        <Col sm={6} md={8}><Ingrediens ingredients={state.ingredientArr} onAddToBasket={addToBasket} /></Col>
        <Col sm={6} md={4}><Basket items={state.basket} onRemoveFromBasket={removeFromBasket} /></Col>
        </Row>
      {/* </div> */}
      <Banner isBannerShown={state.bannerIsShown} onShowBanner={bannerShow} onHideBanner={bannerHide} txt={state.msg} />
      <Button onClick={() => checkout()}>Place Order</Button>
      
    </div>
  );
}

export default App;
