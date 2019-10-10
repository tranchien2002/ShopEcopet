import React from 'react';
import CarouselCard from 'components/CarouselCard';
import DefaultCard from 'components/Card/DefaultCard';
import NewPetModal from 'components/Modal';
import 'components/Deck/Deck.css';
import { compose } from 'redux';
import { connect } from 'react-redux';
import AccountModal from 'components/AccountModal';
import { Link } from 'react-router-dom';

class PetDeck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenNewPet: false,
      isOpenAccount: false
    };
    this.toggleAccount = this.toggleAccount.bind(this);
    this.toggleNewPet = this.toggleNewPet.bind(this);
  }

  toggleNewPet() {
    this.setState({
      isOpenNewPet: !this.state.isOpenNewPet
    });
  }

  toggleAccount() {
    this.setState({
      isOpenAccount: !this.state.isOpenAccount
    });
  }

  render() {
    return (
      <div className='container-custom'>
        <AccountModal
          isOpen={this.state.isOpenAccount}
          toggle={this.toggleAccount}
          account={this.props.account}
        />
        <NewPetModal isOpen={this.state.isOpenNewPet} toggle={this.toggleNewPet} />
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
                onClick={this.toggleAccount}
              />
            </div>
          </div>
          {this.props.pets.length !== 0 ? (
            <div>
              <div className='slide-custom'>
                <CarouselCard pets={this.props.pets} />
              </div>
              <div className='bottom-mobile'>
                <div className='circle-btn-create'>
                  <span className='pushme'>
                    <span className='inner' onClick={this.toggleNewPet}>
                      <img alt='pet' src={require('assets/img/784101.png')} />{' '}
                    </span>
                  </span>
                </div>
                <div className='box'>
                  <div className='icons row'>
                    <Link to={'/shop'} className='move-left'>
                      <div>
                        <img alt='shop' width='42' src={require('assets/img/shopicon.png')} />
                      </div>
                    </Link>
                    <Link to={'/store'} className='move-right'>
                      <div>
                        <img alt='store' width='42' src={require('assets/img/store.png')} />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className='card-create-pet'>
              <DefaultCard onClick={this.toggleNewPet} />
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
export default compose(connect(mapStatetoProps))(PetDeck);
