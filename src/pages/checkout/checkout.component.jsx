import React from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectCartItems,
  selectCartTotal,
} from '../../redux/cart/cart.selectors';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component';
import {
  CheckoutPageContainer,
  CheckoutHeader,
  CheckoutBlock,
  CheckoutTotal,
} from './checkout-styles';

const CheckoutPage = ({ cartItems, total }) => (
  <CheckoutPageContainer>
    <CheckoutHeader>
      <CheckoutBlock>
        <span>Product</span>
      </CheckoutBlock>
      <CheckoutBlock>
        <span>Description</span>
      </CheckoutBlock>
      <CheckoutBlock>
        <span>Quantity</span>
      </CheckoutBlock>
      <CheckoutBlock>
        <span>Price</span>
      </CheckoutBlock>
      <CheckoutBlock>
        <span>Remove</span>
      </CheckoutBlock>
    </CheckoutHeader>
    {cartItems.map((cartItem) => (
      <CheckoutItem cartItem={cartItem} key={cartItem.id} />
    ))}
    <CheckoutTotal>
      <span>TOTAL: ${total}</span>
    </CheckoutTotal>
    <StripeCheckoutButton price={total} />
  </CheckoutPageContainer>
);

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
});

export default connect(mapStateToProps)(CheckoutPage);
