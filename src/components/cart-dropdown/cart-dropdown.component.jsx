import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../store/cart/cart.selector';

import {CartDropdownContainer, CartItems, EmptyMsg} from './cart-dropdown.styles.jsx';

const CartDropdown = () => {

    const cartItems = useSelector(selectCartItems);
    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        navigate('/checkout');
    }

    return (
        <CartDropdownContainer>
            <CartItems>
                {cartItems.length?(
                    cartItems.map(item => {
                        return <CartItem key={item.id} cartItem={item} word={'hi'}/>    
                    })) : (
                        <EmptyMsg>Your cart is empty</EmptyMsg>
                )}

            </CartItems>
            <Button onClick={goToCheckoutHandler} >Go to Checkout</Button>
        </CartDropdownContainer>
    )
}

export default CartDropdown;