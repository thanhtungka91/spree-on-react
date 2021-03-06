import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

import Layout from "../layout";
import BaseCheckoutLayout from "./base-checkout-layout";
import OrderPanelView from '../order/panel-view';

class CheckoutSuccessPage extends Component {

  /* Render this step only if order is present and in a valid checkout state. */
  componentWillMount() {
    if (this.props.order.state === 'complete') {
      let dupeOrder = Object.assign(this.props.order);
      this.props.saveOrderAsPlaced(dupeOrder);
    }
    else {
      if (!this.props.placedOrder.id) {
        this.props.handleCheckoutStepNotEditable(this.props.order);
      }
    }
  };

  componentDidMount () {
    if (this.props.order.state === 'complete') {
      this.props.clearOrder();
    }
  };

  render() {
    return (
      <Layout>
        <BaseCheckoutLayout currentStep="complete"
                            displayLoader={ this.props.displayLoader }
                            checkoutSteps={ this.props.placedOrder.checkout_steps || [] }
                            placedOrder={ this.props.placedOrder } >
          <div className="checkout-confirmation-block">
            <strong className="text text-success confirmation-success-message">
              <FormattedMessage
                id="com.checkoutSuccessPage.successMessage"
                defaultMessage="Your Order has been placed successfully!"
              />
            </strong>
            <OrderPanelView order={ this.props.placedOrder } />
          </div>
        </BaseCheckoutLayout>
      </Layout>
    );
  };
};

export default CheckoutSuccessPage;
