import dotenv from "dotenv";
dotenv.config();
import Stripe from "stripe";
const stripeKey = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_51QTLI8JqA2Rd5c42nxrAPQT4D5hpQ5l5RZFFqb5ocVEVSFIVkLd79xO0APOYo3mXpyI57aw5kDnY1H3vd5KKqjQ300BmMPx9KZ");

export default stripeKey;


