/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51HUEaEDzPPA3PE20bJpbyUA1FVdIMndvFJinRXJrMS5jF47D23PmlGV4PBmLTmRqY9oFNxUYSlJF4lIK8yTGji1D00O6Xa5JmZ'
);

export const bookTour = async (tourId) => {
  try {
    // Get checkout session from API
    const session = await axios(
      `http://127.0.0.1:8000/api/v1/bookings/checkout-session/${tourId}`
    );

    // Create checkout form and charge credit card
    await stripe.redirectToCheck({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
