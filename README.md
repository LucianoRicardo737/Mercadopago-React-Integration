# Mercadopago-React-Integration
Integrate MercadopagoCheckOutPro on React JS


In this example i'm integrate payments checkoutpro from mercadopago. Is necessary press the button for generate the link. 
The functionality is the next:
Function "mp" is equal to "MercadoPago" function with the public key and locale region. The function "MercadoPago" is imported from the sdk in your html.index
" <script src="https://sdk.mercadopago.com/js/v2"></script> "
(Paste this script in your "head" tag, dont in the "body")
To "mp.checkout" is necessary pass the preference id, that return from your bacckend. This way "MercadoPago" return the button of payment with the preferences nested.
In this example im used the same routes from the example of mercadopago.
When pres the button "Generate pay" send to backend the list of products and return the "preferenceId". 
"useEffect" understand the change on the state (preferencesId) sending  through "mp.checkout"  the preferences from puchases and the render button. What returns  the button of payment from "mercadopago" thath open in a modal.
To receive the data, im create a new route that received all registers from mercado pago and charge on my db.
