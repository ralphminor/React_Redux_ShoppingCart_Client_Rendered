import React from 'react';
import {Row, Col, Well, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addToCart, updateCart} from '../../actions/cartActions';

class BookItem extends React.Component {

  handleCart() {
    const book = [...this.props.cart, {
      _id:this.props._id,
      title:this.props.title,
      description:this.props.description,
      price:this.props.price,
      quantity:1
    }]
    // CHECK IF CART IS EMPTY
    if (this.props.cart.length > 0) {
      // CART IS NOT EMPTY, CHECK IF BOOK IS ALREADY IN CART
      let _id = this.props._id;

      let cartIndex = this.props.cart.findIndex(function(cart){
        return cart._id === _id;
      })
      // IF RETURNS -1 THERE ARE NO ITEMS WITH THE SAME ID IN CART
      if (cartIndex === -1) {
        this.props.addToCart(book);
      }
      else {
        // SAME ITEM IS IN THE CART, SO INCREMENT THE ITEM QUANTITY
        this.props.updateCart(_id, 1, this.props.cart);
      }
    }
    else {
      // CART IS EMPTY, ADD BOOK TO CART
      this.props.addToCart(book);
    }
  }
  render() {
    return(
      <Well>
        <Row>
          <Col xs={12}>
            <h6>{this.props.title}</h6>
            <p>{this.props.description}</p>
            <h6>usd. {this.props.price}</h6>
            <Button bsStyle='primary' onClick={this.handleCart.bind(this)}>Buy Now</Button>
          </Col>
        </Row>
      </Well>
    )
  }
}
function mapStateToProps(state) {
  return {
    cart:state.cart.cart
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addToCart: addToCart,
    updateCart: updateCart
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(BookItem);