import React from 'react';
import {Row, Col, Well, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addToCart} from '../../actions/cartActions';

class BookItem extends React.Component {

  handleCart() {
    const book = [...this.props.cart, {
      _id:this.props._id,
      title:this.props.title,
      description:this.props.description,
      price:this.props.price
    }]
    this.props.addToCart(book);
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
    addToCart: addToCart
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(BookItem);