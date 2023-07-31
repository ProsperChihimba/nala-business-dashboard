import './index.css'; // Make sure to import the CSS file with the styles
import logo from '../../../../assets/logo.png'
import chip from '../../../../assets/chip.png'

const CreditCard = () => {
  return (
        <div className="container">
          <header>
            <span className="logo">
              <img src={logo} alt="" />
              <h5>Master Card</h5>
            </span>
            <img src={chip} alt="" className="chip" />
          </header>
    
          <div className="card-details">
            <div className="name-number">
              <h6>Card Number</h6>
              <h5 className="number">8050 5040 2030 3020</h5>
              <h5 className="name">Prem Kumar Shahi</h5>
            </div>
            <div className="valid-date">
              <h6>Valid Thru</h6>
              <h5>05/28</h5>
            </div>
          </div>
        </div>
  );
};

export default CreditCard;
