import React from 'react';
import ShopCarousel from 'components/ShopCarousel';
import 'pages/PetDetail/index.css';
import 'components/Deck/Deck.css';
import petBackground from 'constants/PetBackground';
import ShopCard from '../../components/ShopCard';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
class PetShop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buy: false
    };
  }

  render() {
    return (
      <div className='container-custom'>
        <div className='box-button-create'>
          <div className='row margin-0'>
            <div className='infor-pet col-8'>
              <img
                alt='...'
                src={require('assets/img/ecopet_logo.png')}
                width='200px'
                height='75px'
                className='logo'
              />
            </div>
            <div className='balance'>
              <p className='account-balance'> Balance {this.props.balance}</p>
            </div>
            <div className='avatar'>
              <img
                alt='...'
                src={'https://robohash.org/' + this.props.account + '.png?set=set4'}
                width='40px'
                height='40px'
                className='account-avatar'
              />
            </div>
          </div>
          {petBackground.length !== 0 ? (
            <div>
              <div className='slide-custom'>
                <ShopCarousel />
              </div>
              <div className='bottom-mobile'>
                <div className='circle-btn-home'>
                  <Link to={`/`}>
                    <span className='pushme'>
                      <span className='inner' onClick={this.toggleNewPet}>
                        <img alt='pet' src={require('assets/img/home-page.png')} />{' '}
                      </span>
                    </span>
                  </Link>
                </div>
                <div className='box'>
                  <div className='icons'>
                    <div className='move-left' />
                    <div className='move-right' />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className='card-create-pet'>
              <ShopCard />
            </div>
          )}
        </div>
      </div>
    );
  }
}
const mapStatetoProps = (state) => {
  return {
    pets: state.tomo.pets,
    account: state.tomo.account,
    balance: state.tomo.balance
  };
};
export default compose(connect(mapStatetoProps))(PetShop);
