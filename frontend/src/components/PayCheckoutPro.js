// Import useState and useEffect from react.
import { useState, useEffect } from "react";
// Axios for the consults.
import Axios from "axios";
// And import the route for the consult.
import { payOnCheckOutPro_route } from "../sources/routes_sources";

const PayCheckoutPro = ({ MercadoPago }) => {
  // From APP component take MercadoPago function.

  // State for the preferences
  const [preferenceId, setPreferenceId] = useState();

  // Your public key getting from mercadopago.
  let PUBLIC_KEY_MERCADOPAGO = "PUBLIC_KEY_MERCADOPAGO";

  // List of products. Can be one or many.
  let shopCar = [
    {
      title: "test producto 1",
      unit_price: 1,
      quantity: 1,
    },
    {
      title: "test producto 2",
      unit_price: 9,
      quantity: 1,
    },
    {
      title: "test producto 3",
      unit_price: 5,
      quantity: 1,
    },
  ];

  // This function send the products to the backend and return through mercadopago module installed, one id. And is inserted on preferenceId with  useState.
  const requestPreferenceId = async () => {
    const request = await Axios.post(payOnCheckOutPro_route, shopCar);
    setPreferenceId(request.data.id);
  };

  // useEffect detect the change on the state and it runs.
  useEffect(() => {
    try {
      // If mercadopago function existing, create a new constant named "mp". Loaded with your public key and the locale region.
      if (!MercadoPago) return null;
      const mp = new MercadoPago(PUBLIC_KEY_MERCADOPAGO, {
        locale: "es-AR",
      });
      // If preferenceId value not is null, is execute "mp" function sending the preferenceid through mercadopago sdk and return the pay button.
      if (!preferenceId) return null
        mp.checkout({
          preference: {
            id: preferenceId,
          },
          render: {
            container: ".cho-container",
            label: "Pagar",
          },
        });
    } catch (error) {
      console.log(error);
    }
  }, [preferenceId]);

  return (
    <div>
      {/*This div is necessary, here the button is rendered after being generated. */}
      <div className="cho-container"></div>

      {/* This button is optional. You can load the values of the beginning. But you must be attentive to the changes of the cart.  */}
      <button onClick={() => requestPreferenceId()}>Generate pay button</button>
    </div>
  );
};

export default PayCheckoutPro;
